import { create } from "zustand";

const useDominoStore = create((set) => ({
  dominos: [],
  selectedDomino: null,
  selectedDominoKey: null,
  selectedColor: null,

  setDominos: (updatedDominos) => set(() => ({ dominos: updatedDominos })),
  setSelectedDomino: (selectedDomino) => set(() => ({ selectedDomino })),
  setSelectedDominoKey: (selectedDominoKey) => set(() => ({ selectedDominoKey })),
  setClearDominos: () => set({ dominos: [] }),
  setSelectedColor: (color) => set({ selectedColor: color }),
}));

export default useDominoStore;
