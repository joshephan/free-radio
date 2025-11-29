"use client";

import { useState } from "react";
import { useCustomStations } from "@/hooks/useCustomStations";

interface AddStationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStationModal({ isOpen, onClose }: AddStationModalProps) {
  const { addStation } = useCustomStations();
  const [name, setName] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Station name is required");
      return;
    }

    if (!streamUrl.trim()) {
      setError("Stream URL is required");
      return;
    }

    try {
      new URL(streamUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    addStation({
      name: name.trim(),
      streamUrl: streamUrl.trim(),
      genre: genre.trim() || undefined,
      logoUrl: logoUrl.trim() || undefined,
    });

    setName("");
    setStreamUrl("");
    setGenre("");
    setLogoUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-zinc-900 rounded-xl w-full max-w-md p-6 shadow-xl border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Custom Station</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Station Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Radio Station"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="streamUrl"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Stream URL *
            </label>
            <input
              type="text"
              id="streamUrl"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="https://stream.example.com/radio.mp3"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Genre (optional)
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Rock, Jazz, Electronic..."
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Logo URL (optional)
            </label>
            <input
              type="text"
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
