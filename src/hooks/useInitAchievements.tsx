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
      const res = await fetcher(`/achievements/${userId}`);
      loadAchievements(res);
    };

    fetchAchievements();
  }, [userId]);
};

export default useInitAchievements;
