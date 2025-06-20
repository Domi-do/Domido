import { Achievement } from "@/types/achievements";
import { create } from "zustand";

export interface AchievementStoreType {
  achievements: Record<string, { achieved: boolean; date: string }>;
  setAchievement: (name: string) => void;
  loadAchievements: (achievementList: Achievement[]) => void;
}

const useAchievementStore = create<AchievementStoreType>((set) => ({
  achievements: {},

  setAchievement: (name) =>
    set((state) => ({
      achievements: {
        ...state.achievements,
        [name]: { achieved: true, date: new Date().toISOString() },
      },
    })),
  loadAchievements: (achievementList) =>
    set(() => {
      const newAchievements: Record<string, { achieved: boolean; date: string }> = {};
      achievementList.forEach((achieved) => {
        newAchievements[achieved.name] = { achieved: true, date: achieved.date };
      });
      return { achievements: newAchievements };
    }),
}));

export default useAchievementStore;
