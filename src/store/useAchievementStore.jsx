import { create } from "zustand";

const useAchievementStore = create((set) => ({
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
      const newAchievements = {};
      achievementList.forEach((a) => {
        newAchievements[a.name] = { achieved: true, date: a.date };
      });
      return { achievements: newAchievements };
    }),
}));

export default useAchievementStore;
