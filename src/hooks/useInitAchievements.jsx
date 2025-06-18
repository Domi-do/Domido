import { useEffect } from "react";

import fetcher from "@/services/fetcher";
import useAchievementStore from "@/store/useAchievementStore";
import useUserStore from "@/store/useUserStore";

const useInitAchievements = () => {
  const loadAchievements = useAchievementStore((state) => state.loadAchievements);
  const userId = useUserStore((state) => state.userInfo?.userID);

  useEffect(() => {
    if (!userId) return;

    const fetchAchievements = async () => {
      try {
        const res = await fetcher(`/achievements/${userId}`);
        loadAchievements(res);
      } catch (err) {
        console.error("업적 불러오기 실패", err);
      }
    };

    fetchAchievements();
  }, [userId]);
};

export default useInitAchievements;
