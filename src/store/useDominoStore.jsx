import { create } from "zustand";

const useDominoStore = create((set) => ({
  dominos: [],
  selectedDomino: null,
  selectedDominoKey: null,

  setDominos: (updatedDominos) => set(() => ({ dominos: updatedDominos })),
  setSelectedDomino: (selectedDomino) => set(() => ({ selectedDomino })),
  setSelectedDominoKey: (selectedDominoKey) => set(() => ({ selectedDominoKey })),
}));

export default useDominoStore;
