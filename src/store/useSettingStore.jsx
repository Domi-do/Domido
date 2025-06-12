import { create } from "zustand";

const useSettingStore = create((set) => ({
  themaType: "sea",
  rotationSensitivity: 1,
  volumeLevel: 0.5,
  objectVolume: 3,

  setThemaType: (themaType) => set(() => ({ themaType })),
  setRotationSensitivity: (sensitivity) => set(() => ({ rotationSensitivity: sensitivity })),
  setVolumeLevel: (newVolume) => set(() => ({ volumeLevel: newVolume })),
  setObjectVolume: (newVolume) => set(() => ({ objectVolume: newVolume })),
}));

export default useSettingStore;
