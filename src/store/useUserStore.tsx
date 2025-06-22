import { UserInfoType } from "@/types/userInfo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userInfo: UserInfoType | null;
  setUserInfo: (info: UserInfoType | null) => void;
  setIsTutorialUser: (value: boolean) => void;
  setUserID: (id: string) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,

      setUserInfo: (info) => set({ userInfo: info }),

      setIsTutorialUser: (value) =>
        set((state) => {
          if (!state.userInfo) return state;
          return { userInfo: { ...state.userInfo, isTutorialUser: value } };
        }),

      setUserID: (id) =>
        set((state) => {
          if (!state.userInfo) return state;
          return { userInfo: { ...state.userInfo, userID: id } };
        }),
    }),
    { name: "dominoUserStorage", partialize: (state) => ({ userInfo: state.userInfo }) },
  ),
);

export default useUserStore;
