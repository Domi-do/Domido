import { create } from "zustand";

const useDominoStore = create((set) => ({
  dominos: [
    { position: [0, 0.5, 0], index: 0, opacity: 1 },
    { position: [1, 0.5, 0], index: 1, opacity: 1 },
  ],
  selectedDomino: null,
  selectedDominoKey: null,

  setDominos: (updatedDominos) => set(() => ({ dominos: updatedDominos })),
  setSelectedDomino: (selectedDomino) => set(() => ({ selectedDomino })),
  setSelectedDominoKey: (selectedDominoKey) => set(() => ({ selectedDominoKey })),
}));

export default useDominoStore;
