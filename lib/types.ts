export interface Station {
  id: string;
  name: string;
  streamUrl: string;
  genre?: string;
  logoUrl?: string;
  isCustom: boolean;
}

export interface AudioState {
  currentStation: Station | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
}

export interface AudioContextType extends AudioState {
  play: (station: Station) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}
