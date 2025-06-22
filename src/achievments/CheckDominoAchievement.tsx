import fetcher from "@/services/fetcher";
import useAchievementStore from "@/store/useAchievementStore";
import { HTTPError } from "@/utils/HTTPError";
import { ToastOptions } from "@/store/ToastContext";
interface DominoAchievementProps {
  dominoCount?: number;
  userId: string | undefined;
  showToast: (options: ToastOptions) => void;
}

type StatusLikeError = { status: number; message?: string };

const isStatusLike = (e: unknown): e is StatusLikeError =>
  typeof e === "object" && e !== null && "status" in e && typeof (e as any).status === "number";

export const CheckFirstDominoAchievement = async ({
  dominoCount,
  userId,
  showToast,
}: DominoAchievementProps) => {
  const { achievements, setAchievement } = useAchievementStore.getState();

  if (dominoCount && dominoCount >= 1 && !achievements["first_domino"]) {
    setAchievement("first_domino");
    showToast({ message: "🎉 도전과제 달성: 첫 도미노!", placement: "center" });

    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "first_domino" },
      });
    } catch (err: unknown) {
      if (isStatusLike(err)) {
        throw new HTTPError(err.status, err.message ?? "알 수 없는 오류");
      }
    }
  }
};

export const CheckHundredDominoAchievement = async ({
  dominoCount,
  userId,
  showToast,
}: DominoAchievementProps) => {
  const { achievements, setAchievement } = useAchievementStore.getState();
  if (dominoCount && dominoCount >= 10 && !achievements["hundred_domino"]) {
    setAchievement("hundred_domino");
    showToast({ message: "🎉 도전과제 달성! 100번째 도미노까지 놓았어요!", placement: "center" });
    try {
      await fetcher("/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId, name: "hundred_domino" },
      });
    } catch (err: unknown) {
      if (isStatusLike(err)) {
        throw new HTTPError(err.status, err.message ?? "알 수 없는 오류");
      }
    }
  }
};

export const CheckChangeDominoColorAchievement = async ({
  userId,
  showToast,
}: DominoAchievementProps) => {
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
    } catch (err: unknown) {
      if (isStatusLike(err)) {
        throw new HTTPError(err.status, err.message ?? "알 수 없는 오류");
      }
    }
  }
};

export const CheckFirstDominoFallAchievement = async ({
  userId,
  showToast,
}: DominoAchievementProps) => {
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
    } catch (err: unknown) {
      if (isStatusLike(err)) {
        throw new HTTPError(err.status, err.message ?? "알 수 없는 오류");
      }
    }
  }
};
