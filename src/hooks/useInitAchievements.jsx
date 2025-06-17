import { useEffect } from "react";

import useAchievementStore from "@/store/useAchievementStore";

const useInitAchievements = () => {
  const loadAchievements = useAchievementStore((state) => state.loadAchievements);
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    if (!userId) return;

    const fetchAchievements = async () => {
      try {
        const res = await fetch(`http://localhost:3000/achievements/${userId}`);
        const data = await res.json();
        loadAchievements(data);
      } catch (err) {
        console.error("업적 불러오기 실패", err);
      }
    };

    fetchAchievements();
  }, [userId]);
};

export default useInitAchievements;
