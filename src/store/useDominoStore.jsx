import { create } from "zustand";

const useDominoStore = create((set) => ({
  dominos: [],
  selectedDomino: null,
  selectedDominoKey: null,
  rotationY: 0,
  selectedColor: null,

  setDominos: (updatedDominos) => set(() => ({ dominos: updatedDominos })),
  setSelectedDomino: (selectedDomino) => set(() => ({ selectedDomino })),
  setSelectedDominoKey: (selectedDominoKey) => set(() => ({ selectedDominoKey })),
  setClearDominos: () => set({ dominos: [] }),
  setRotationY: (rotationYUpdater) => set(() => ({ rotationY: rotationYUpdater })),
  setSelectedColor: (color) => set({ selectedColor: color }),
}));

export default useDominoStore;
