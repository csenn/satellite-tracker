import { create } from "zustand";
import { Vector3 } from "three";

interface SatelliteState {
  position: Vector3 | null;
  setPosition: (pos: Vector3) => void;
}

export const useSatelliteStore = create<SatelliteState>((set) => ({
  position: null,
  setPosition: (pos: Vector3) => set(() => ({ position: pos })),
}));
