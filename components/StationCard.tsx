"use client";

import { Station } from "@/lib/types";
import { useAudio } from "@/contexts/AudioContext";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

interface StationCardProps {
  station: Station;
  onDelete?: (id: string) => void;
}

export function StationCard({ station, onDelete }: StationCardProps) {
  const { currentStation, isPlaying, isLoading, play, pause } = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isCurrentStation = currentStation?.id === station.id;
  const isActive = isCurrentStation && isPlaying;
  const isBuffering = isCurrentStation && isLoading;

  const handlePlayClick = () => {
    if (isActive) {
      pause();
    } else {
      play(station);
    }
  };

  return (
    <div
      className={`relative group rounded-xl p-4 transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 ring-1 ring-purple-500/50"
          : "bg-zinc-800/50 hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-700 flex-shrink-0">
          {station.logoUrl ? (
            <Image
              src={station.logoUrl}
              alt={station.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          )}
          {isActive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-purple-400 animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                <span className="w-1 bg-purple-400 animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                <span className="w-1 bg-purple-400 animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                <span className="w-1 bg-purple-400 animate-pulse" style={{ height: "80%", animationDelay: "450ms" }} />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{station.name}</h3>
          {station.genre && (
            <p className="text-sm text-zinc-400 truncate">{station.genre}</p>
          )}
          {station.isCustom && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">
              Custom
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handlePlayClick}
          disabled={isBuffering}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
            isActive
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isBuffering ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
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
              Loading...
            </>
          ) : isActive ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </>
          )}
        </button>

        <button
          onClick={() => toggleFavorite(station.id)}
          className={`p-2 rounded-lg transition-colors ${
            isFavorite(station.id)
              ? "text-pink-500 hover:text-pink-400 bg-pink-500/10"
              : "text-zinc-400 hover:text-pink-500 hover:bg-zinc-700"
          }`}
          title={isFavorite(station.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite(station.id) ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {station.isCustom && onDelete && (
          <button
            onClick={() => onDelete(station.id)}
            className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-700 transition-colors"
            title="Delete station"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
