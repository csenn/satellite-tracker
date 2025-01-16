import { create } from "zustand";
import { Vector3 } from "three";

interface SatelliteState {
  cameraPosition: Vector3 | null;
  setCameraPosition: (pos: Vector3) => void;
}

export const useSatelliteStore = create<SatelliteState>((set) => ({
  cameraPosition: null,
  setCameraPosition: (pos: Vector3) => set(() => ({ cameraPosition: pos })),
}));
