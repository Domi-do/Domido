import { create } from "zustand";

const useUIStateStore = create((set) => ({
  isCanvasReady: false,
  isHUDModalOpen: false,

  setCanvasReady: () => set({ isCanvasReady: true }),
  setHUDModalOpen: (state) => set({ isHUDModalOpen: state }),
}));

export default useUIStateStore;
