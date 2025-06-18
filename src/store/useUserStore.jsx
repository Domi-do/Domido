import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      setIsTutorialUser: (value) =>
        set((state) => ({ userInfo: { ...state.userInfo, isTutorialUser: value } })),
      setUserID: (id) => set((state) => ({ userInfo: { ...state.userInfo, userID: id } })),
    }),
    { name: "dominoUserStorage", partialize: (state) => ({ userInfo: state.userInfo }) },
  ),
);

export default useUserStore;
