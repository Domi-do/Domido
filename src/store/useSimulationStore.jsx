import { create } from "zustand";

import MODE from "@/constants/mode";

const useSimulationStore = create((set) => ({
  simulationMode: MODE.EDIT,
  countdownNumber: 3,
  setSimulationMode: (mode) => set(() => ({ simulationMode: mode })),
  setCountdownNumber: (num) => set(() => ({ countdownNumber: num })),
}));

export default useSimulationStore;
