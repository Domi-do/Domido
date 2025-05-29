import { create } from "zustand";

const useSimulationStore = create((set) => ({
  simulationMode: "EDIT",
  countdownNumber: 3,
  setSimulationMode: (mode) => set(() => ({ simulationMode: mode })),
  setCountdownNumber: (num) => set(() => ({ countdownNumber: num })),
}));

export default useSimulationStore;
