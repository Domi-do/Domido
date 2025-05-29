import { create } from "zustand";

const useSettingStore = create((set) => ({
  groundType: "wood_dark",

  setGroundType: (type) => set(() => ({ groundType: type })),
}));

export default useSettingStore;
