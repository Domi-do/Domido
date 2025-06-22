import { create } from "zustand";

interface SettingStoreType {
  themaType: "sea" | "forest" | "desert";
  rotationSensitivity: string;
  volumeLevel: number;
  objectVolume: number;

  setThemaType: (type: SettingStoreType["themaType"]) => void;
  setRotationSensitivity: (value: string) => void;
  setVolumeLevel: (value: number) => void;
  setObjectVolume: (value: number) => void;
}

const useSettingStore = create<SettingStoreType>()((set) => ({
  themaType: "sea",
  rotationSensitivity: "1",
  volumeLevel: 0.5,
  objectVolume: 3,

  setThemaType: (type) => set({ themaType: type }),
  setRotationSensitivity: (v) => set({ rotationSensitivity: v }),
  setVolumeLevel: (v) => set({ volumeLevel: v }),
  setObjectVolume: (v) => set({ objectVolume: v }),
}));

export default useSettingStore;
