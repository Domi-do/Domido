import { HTTP_ERROR_MESSAGE } from "@/constants/HTTPErrorMessage";
import fetcher from "@/services/fetcher";

export const handleLogout = async () => {
  const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

  type StatusError = {
    status: keyof typeof HTTP_ERROR_MESSAGE; // 400 | 401 | 403 | …
    message?: string;
  };

  const isStatusError = (e: unknown): e is StatusError =>
    typeof e === "object" && e !== null && "status" in e && typeof (e as any).status === "number";

  try {
    await fetcher("/auth/logout", { method: "POST", body: { accessToken: kakaoAccessToken } });
  } catch (err: unknown) {
    if (isStatusError(err)) {
      throw (
        HTTP_ERROR_MESSAGE[err.status] ?? {
          HEADING: "",
          BODY: err.message ?? "알 수 없는 오류",
          BUTTON: "확인",
        }
      );
    }

    throw err;
  }

  const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&logout_redirect_uri=${import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI}`;

  window.location.href = logoutURL;
};
