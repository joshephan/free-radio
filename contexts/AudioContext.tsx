"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Hls from "hls.js";
import { Station, AudioContextType } from "@/lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedVolume, setSavedVolume] = useLocalStorage("radio-volume", 0.7);
  const [volume, setVolumeState] = useState(0.7);

  useEffect(() => {
    setVolumeState(savedVolume);
  }, [savedVolume]);

  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = savedVolume;
      audioRef.current.preload = "none";

      const audio = audioRef.current;

      audio.addEventListener("playing", () => {
        setIsPlaying(true);
        setIsLoading(false);
        setError(null);
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      audio.addEventListener("waiting", () => {
        setIsLoading(true);
      });

      audio.addEventListener("canplay", () => {
        setIsLoading(false);
      });

      audio.addEventListener("error", (e) => {
        const audioElement = e.target as HTMLAudioElement;
        let errorMessage = "Failed to load stream. Please try another station.";

        if (audioElement.error) {
          switch (audioElement.error.code) {
            case MediaError.MEDIA_ERR_NETWORK:
              errorMessage = "Network error. Check your connection.";
              break;
            case MediaError.MEDIA_ERR_DECODE:
              errorMessage = "Unable to decode audio stream.";
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = "Stream format not supported.";
              break;
          }
        }

        setIsPlaying(false);
        setIsLoading(false);
        setError(errorMessage);
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [savedVolume]);

  const destroyHls = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  }, []);

  const isHlsStream = (url: string) => {
    return url.includes(".m3u8") || url.includes("m3u8");
  };

  const play = useCallback((station: Station) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // If clicking the same station that's already loaded, just play/resume
    if (currentStation?.id === station.id && (audio.src || hlsRef.current)) {
      setError(null);
      audio.play().catch((err) => {
        console.error("Play error:", err);
        setError("Playback failed. Click to retry.");
      });
      return;
    }

    // New station - set up and play
    setCurrentStation(station);
    setIsLoading(true);
    setError(null);

    // Stop current playback and destroy HLS instance
    audio.pause();
    destroyHls();

    const streamUrl = station.streamUrl;

    if (isHlsStream(streamUrl)) {
      // HLS stream - use HLS.js
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
        });
        hlsRef.current = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(audio);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play().catch((err) => {
            console.error("HLS Play error:", err);
            if (err.name !== "AbortError") {
              setError("Playback failed. Click to retry.");
            }
            setIsLoading(false);
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error("HLS Error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError("Network error loading stream.");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError("Media error. Trying to recover...");
                hls.recoverMediaError();
                break;
              default:
                setError("Failed to load stream.");
                destroyHls();
                break;
            }
            setIsLoading(false);
          }
        });
      } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        audio.src = streamUrl;
        audio.load();
        audio.play().catch((err) => {
          console.error("Native HLS Play error:", err);
          if (err.name !== "AbortError") {
            setError("Playback failed. Click to retry.");
          }
          setIsLoading(false);
        });
      } else {
        setError("HLS streams are not supported in this browser.");
        setIsLoading(false);
      }
    } else {
      // Regular stream - use proxy to avoid CORS issues
      const proxyUrl = `/api/stream?url=${encodeURIComponent(streamUrl)}`;
      audio.src = proxyUrl;
      audio.load();

      audio.play().catch((err) => {
        console.error("Play error:", err);
        if (err.name !== "AbortError") {
          setError("Playback failed. Click to retry.");
        }
        setIsLoading(false);
      });
    }
  }, [currentStation?.id, destroyHls]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && currentStation) {
      setError(null);
      audioRef.current.play().catch((err) => {
        console.error("Resume error:", err);
        setError("Playback failed. Click to retry.");
      });
    }
  }, [currentStation]);

  const stop = useCallback(() => {
    destroyHls();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setCurrentStation(null);
      setIsPlaying(false);
      setIsLoading(false);
      setError(null);
    }
  }, [destroyHls]);

  const setVolume = useCallback(
    (newVolume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      setVolumeState(clampedVolume);
      setSavedVolume(clampedVolume);
      if (audioRef.current) {
        audioRef.current.volume = clampedVolume;
      }
    },
    [setSavedVolume]
  );

  return (
    <AudioContext.Provider
      value={{
        currentStation,
        isPlaying,
        isLoading,
        volume,
        error,
        play,
        pause,
        resume,
        stop,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
