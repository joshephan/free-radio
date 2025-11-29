"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Station } from "@/lib/types";

export function useCustomStations() {
  const [customStations, setCustomStations] = useLocalStorage<Station[]>(
    "radio-custom-stations",
    []
  );

  const addStation = useCallback(
    (station: Omit<Station, "id" | "isCustom">) => {
      const newStation: Station = {
        ...station,
        id: `custom-${Date.now()}`,
        isCustom: true,
      };
      setCustomStations((prev) => [...prev, newStation]);
      return newStation;
    },
    [setCustomStations]
  );

  const removeStation = useCallback(
    (stationId: string) => {
      setCustomStations((prev) => prev.filter((s) => s.id !== stationId));
    },
    [setCustomStations]
  );

  const updateStation = useCallback(
    (stationId: string, updates: Partial<Omit<Station, "id" | "isCustom">>) => {
      setCustomStations((prev) =>
        prev.map((s) => (s.id === stationId ? { ...s, ...updates } : s))
      );
    },
    [setCustomStations]
  );

  return {
    customStations,
    addStation,
    removeStation,
    updateStation,
  };
}
