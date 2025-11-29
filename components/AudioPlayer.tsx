"use client";

import { useAudio } from "@/contexts/AudioContext";
import Image from "next/image";

export function AudioPlayer() {
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    pause,
    resume,
    stop,
    setVolume,
  } = useAudio();

  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Station Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
              {currentStation.logoUrl ? (
                <Image
                  src={currentStation.logoUrl}
                  alt={currentStation.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate">
                {currentStation.name}
              </p>
              {error ? (
                <p className="text-sm text-red-400 truncate">{error}</p>
              ) : currentStation.genre ? (
                <p className="text-sm text-zinc-400 truncate">
                  {currentStation.genre}
                </p>
              ) : null}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={() => (isPlaying ? pause() : resume())}
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Stop */}
            <button
              onClick={stop}
              className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center hover:text-white hover:bg-zinc-700 transition-colors"
              title="Stop"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          </div>

          {/* Volume */}
          <div className="hidden sm:flex items-center gap-2 w-32">
            <button
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {volume === 0 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 0.5 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
