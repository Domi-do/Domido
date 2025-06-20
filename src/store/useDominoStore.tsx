import { create } from "zustand";
import { DominoType } from "@/types/domino";
import { SelectedDominoType } from "@/types/selectedDomino";

interface DominoStoreType {
  dominos: DominoType[];
  selectedDomino: SelectedDominoType | null;
  selectedDominoKey: string | null;
  rotationY: number;
  selectedColor: string | null;

  setDominos: (updatedDominos: DominoType[]) => void;
  setSelectedDomino: (selected: SelectedDominoType | null) => void;
  setSelectedDominoKey: (key: string | null) => void;
  setClearDominos: () => void;
  setRotationY: (rotationY: number) => void;
  setSelectedColor: (color: string | null) => void;
}

const useDominoStore = create<DominoStoreType>((set) => ({
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
