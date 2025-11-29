"use client";

import { useState } from "react";
import { presetStations } from "@/lib/stations";
import { useCustomStations } from "@/hooks/useCustomStations";
import { StationList } from "@/components/StationList";
import { AddStationModal } from "@/components/AddStationModal";

export default function Home() {
  const { customStations, removeStation } = useCustomStations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allStations = [...presetStations, ...customStations];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Radio Stations</h1>
          <p className="text-zinc-400 mt-1">
            {allStations.length} stations available
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Station
        </button>
      </div>

      {customStations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Custom Stations
          </h2>
          <StationList stations={customStations} onDelete={removeStation} />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Preset Stations
        </h2>
        <StationList stations={presetStations} />
      </div>

      <AddStationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
