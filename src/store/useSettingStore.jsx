import { create } from "zustand";

const useSettingStore = create((set) => ({
  groundType: "wood_dark",
  rotationSensitivity: 1,
  volumeLevel: 0.5,

  setGroundType: (groundType) => set(() => ({ groundType })),
  setRotationSensitivity: (sensitivity) => set(() => ({ rotationSensitivity: sensitivity })),
  setVolumeLevel: (newVolume) => set(() => ({ volumeLevel: newVolume })),
}));

export default useSettingStore;
