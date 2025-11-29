"use client";

import { Station } from "@/lib/types";
import { StationCard } from "./StationCard";

interface StationListProps {
  stations: Station[];
  onDelete?: (id: string) => void;
  emptyMessage?: string;
}

export function StationList({
  stations,
  onDelete,
  emptyMessage = "No stations found",
}: StationListProps) {
  if (stations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-zinc-600"
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
        </div>
        <p className="text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stations.map((station) => (
        <StationCard key={station.id} station={station} onDelete={onDelete} />
      ))}
    </div>
  );
}
