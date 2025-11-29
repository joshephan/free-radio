"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "radio-favorites",
    []
  );

  const addFavorite = useCallback(
    (stationId: string) => {
      setFavorites((prev) => {
        if (prev.includes(stationId)) return prev;
        return [...prev, stationId];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (stationId: string) => {
      setFavorites((prev) => prev.filter((id) => id !== stationId));
    },
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (stationId: string) => {
      setFavorites((prev) => {
        if (prev.includes(stationId)) {
          return prev.filter((id) => id !== stationId);
        }
        return [...prev, stationId];
      });
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (stationId: string) => {
      return favorites.includes(stationId);
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
