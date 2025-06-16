import { create } from "zustand";

import { TUTORIAL_STEPS, TRACKER_KEYS } from "@/constants/tutorialStep";

export const useTutorialStore = create((set) => ({
  currentStep: 0,

  tracker: {
    [TRACKER_KEYS.SIDE_PANEL_OPEN]: false,
    [TRACKER_KEYS.DOMINO_SELECTED]: false,
    [TRACKER_KEYS.ROTATED_LEFT]: false,
    [TRACKER_KEYS.ROTATED_RIGHT]: false,
    [TRACKER_KEYS.PLACED_FOR_DELETE]: false,
    [TRACKER_KEYS.DELETED_DOMINO]: false,
    [TRACKER_KEYS.PLACED_FOR_KNOCK]: false,
    [TRACKER_KEYS.CANNON_TRIGGERED]: false,
  },

  setTracker: (key, value) => set((state) => ({ tracker: { ...state.tracker, [key]: value } })),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, TUTORIAL_STEPS.length) })),
}));
