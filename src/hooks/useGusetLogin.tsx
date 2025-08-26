import { HTTPError } from "@/utils/HTTPError";
import useUserStore from "@/store/useUserStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGuestLogin = async () => {
  const { setUserInfo } = useUserStore.getState();

  try {
    const response = await fetch(`${BASE_URL}/auth/guest-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = (data as any)?.message ?? "게스트 로그인 실패";
      console.warn("비회원 접근 실패:", message);
      throw new HTTPError(response.status, message);
    }

    setUserInfo({
      userID: data.userID,
      userNickname: data.userNickname,
      isTutorialUser: data.isTutorialUser,
      isMember: data.isMember,
    });

    return true;
  } catch (error: unknown) {
    if (error instanceof HTTPError) throw error;
    throw new HTTPError(500, "알 수 없는 오류");
  }
};

export default useGuestLogin;
