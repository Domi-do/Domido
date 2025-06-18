import fetcher from "@/services/fetcher";
import useAchievementStore from "@/store/useAchievementStore";
import { HTTPError } from "@/utils/HTTPError";

export const CheckFirstDominoAchievement = async ({ dominoCount, userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (dominoCount >= 1 && !achievements["first_domino"]) {
    setAchievement("first_domino");
    showToast({ message: "🎉 도전과제 달성: 첫 도미노!", placement: "center" });

    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "first_domino" },
      });
    } catch (err) {
      throw new HTTPError(err.status, err.message);
    }
  }
};

export const CheckHundredDominoAchievement = async ({ dominoCount, userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();
  if (dominoCount >= 10 && !achievements["hundred_domino"]) {
    setAchievement("hundred_domino");
    showToast({ message: "🎉 도전과제 달성! 100번째 도미노까지 놓았어요!", placement: "center" });
    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "hundred_domino" },
      });
    } catch (err) {
      throw new HTTPError(err.status, err.message);
    }
  }
};

export const CheckChangeDominoColorAchievement = async ({ userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (!achievements["color_used"]) {
    setAchievement("color_used");
    showToast({ message: "🎉 도전과제 달성! 도미노 색깔을 바꿔봤어요!", placement: "center" });

    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "color_used" },
      });
    } catch (err) {
      throw new HTTPError(err.status, err.message);
    }
  }
};

export const CheckFirstDominoFallAchievement = async ({ userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (achievements["all_domino_fallen"]) {
    setAchievement("all_domino_fallen");
    showToast({ message: "🎉 도전과제 달성! 모든 도미노를 쓰러뜨렸습니다!", placement: "center" });

    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "all_domino_fallen" },
      });
    } catch (err) {
      throw new HTTPError(err.status, err.message);
    }
  }
};
