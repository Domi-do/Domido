import { create } from "zustand";

const useDominoStore = create((set) => ({
  dominos: [],
  selectedDomino: null,
  selectedDominoKey: null,
  rotationY: 0,

  setDominos: (updatedDominos) => set(() => ({ dominos: updatedDominos })),
  setSelectedDomino: (selectedDomino) => set(() => ({ selectedDomino })),
  setSelectedDominoKey: (selectedDominoKey) => set(() => ({ selectedDominoKey })),
  clearDominos: () => set({ dominos: [] }),
  setRotationY: (rotationYUpdater) => set(() => ({ rotationY: rotationYUpdater })),
}));

export default useDominoStore;
