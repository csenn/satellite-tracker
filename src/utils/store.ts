import { create } from "zustand";
import { Vector3 } from "three";
import { ICollision } from "./loadData";

interface SatelliteState {
  cameraPosition: Vector3 | null;
  setCameraPosition: (pos: Vector3) => void;
  collisionTime: Date | null;
  setCollisionTime: (time: Date) => void;
  selectedCollision: ICollision | null;
  setSelectedCollision: (collision: ICollision | null) => void;
}

export const useSatelliteStore = create<SatelliteState>((set) => ({
  cameraPosition: null,
  setCameraPosition: (pos: Vector3) => set(() => ({ cameraPosition: pos })),
  collisionTime: null,
  setCollisionTime: (time: Date) => set(() => ({ collisionTime: time })),
  selectedCollision: null,
  setSelectedCollision: (collision: ICollision | null) =>
    set(() => ({ selectedCollision: collision })),
}));
