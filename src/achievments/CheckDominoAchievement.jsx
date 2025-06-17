import useAchievementStore from "@/store/useAchievementStore";

export const CheckFirstDominoAchievement = async ({ dominoCount, userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (dominoCount >= 1 && !achievements["first_domino"]) {
    setAchievement("first_domino");
    showToast({ message: "🎉 도전과제 달성: 첫 도미노!", placement: "center" });

    try {
      await fetch("http://localhost:3000/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name: "first_domino" }),
      });
    } catch (err) {
      console.error("업적 저장 실패:", err);
    }
  }
};

export const CheckHundredDominoAchievement = async ({ dominoCount, userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (dominoCount >= 10 && !achievements["hundred_domino"]) {
    setAchievement("hundred_domino");
    showToast({ message: "🎉 도전과제 달성! 100번째 도미노까지 놓았어요!", placement: "center" });

    try {
      await fetch("http://localhost:3000/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name: "hundred_domino" }),
      });
    } catch (err) {
      console.error("업적 저장 실패:", err);
    }
  }
};

export const CheckChangeDominoColorAchievement = async ({ userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (!achievements["color_used"]) {
    setAchievement("color_used");
    showToast({ message: "🎉 도전과제 달성! 도미노 색깔을 바꿔봤어요!", placement: "center" });

    try {
      await fetch("http://localhost:3000/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name: "color_used" }),
      });
    } catch (err) {
      console.error("업적 저장 실패:", err);
    }
  }
};

export const CheckFirstDominoFallAchievement = async ({ userId, showToast }) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (achievements["all_domino_fallen"]) {
    setAchievement("all_domino_fallen");
    showToast({ message: "🎉 도전과제 달성! 모든 도미노를 쓰러뜨렸습니다!", placement: "center" });

    try {
      await fetch("http://localhost:3000/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name: "all_domino_fallen" }),
      });
    } catch (err) {
      console.error("업적 저장 실패:", err);
    }
  }
};
