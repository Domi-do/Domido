import { create } from "zustand";

const useSettingStore = create((set) => ({
  groundType: "wood_dark",
  rotationSensitivity: 1,

  setGroundType: (groundType) => set(() => ({ groundType })),
  setRotationSensitivity: (sensitivity) => set(() => ({ rotationSensitivity: sensitivity })),
}));

export default useSettingStore;
