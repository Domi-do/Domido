import { create } from "zustand";

const useUIStateStore = create((set) => ({
  isCanvasReady: false,
  setCanvasReady: () => set({ isCanvasReady: true }),
}));

export default useUIStateStore;
