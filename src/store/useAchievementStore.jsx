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
      achievementList.forEach((achieved) => {
        newAchievements[achieved.name] = { achieved: true, date: achieved.date };
      });
      return { achievements: newAchievements };
    }),
}));

export default useAchievementStore;
