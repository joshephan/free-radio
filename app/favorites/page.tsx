"use client";

import Link from "next/link";
import { presetStations } from "@/lib/stations";
import { useCustomStations } from "@/hooks/useCustomStations";
import { useFavorites } from "@/hooks/useFavorites";
import { StationList } from "@/components/StationList";

export default function FavoritesPage() {
  const { customStations } = useCustomStations();
  const { favorites } = useFavorites();

  const allStations = [...presetStations, ...customStations];
  const favoriteStations = allStations.filter((station) =>
    favorites.includes(station.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Favorites</h1>
        <p className="text-zinc-400 mt-1">
          {favoriteStations.length} favorite station
          {favoriteStations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favoriteStations.length > 0 ? (
        <StationList stations={favoriteStations} />
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-zinc-600"
              fill="none"
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
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No favorites yet
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Start adding stations to your favorites by clicking the heart icon
            on any station.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Browse Stations
          </Link>
        </div>
      )}
    </div>
  );
}
