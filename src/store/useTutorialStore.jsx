import { create } from "zustand";

import { TUTORIAL_STEPS } from "@/constants/tutorialStep";

export const stepConditions = {
  1: (tracker) => tracker.isSidePanelOpen,
  2: (tracker) => tracker.isDominoSelected,
  3: (tracker) => tracker.hasRotatedDominoLeft,
  4: (tracker) => tracker.hasRotatedDominoRight,
  5: (tracker) => tracker.placedDominoCount >= 1,
  6: (tracker) => tracker.hasDeletedDomino,
  7: (tracker) => tracker.placedDominoCount >= 3,
  8: (tracker) => tracker.hasPlacedCannon,
};

export const useTutorialStore = create((set) => ({
  currentStep: 0,
  tracker: {
    isSidePanelOpen: false,
    isDominoSelected: false,
    hasRotatedDominoLeft: false,
    hasRotatedDominoRight: false,
    placedDominoCount: 0,
    hasDeletedDomino: false,
    hasPlacedCannon: true,
  },

  setTracker: (key, value) => set((state) => ({ tracker: { ...state.tracker, [key]: value } })),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, TUTORIAL_STEPS.length) })),
}));
