import { HTTP_ERROR_MESSAGE } from "@/constants/HTTPErrorMessage";
import fetcher from "@/services/fetcher";

export const handleLogout = async () => {
  const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

  try {
    await fetcher("/auth/logout", { method: "POST", body: { accessToken: kakaoAccessToken } });
  } catch (err) {
    throw new HTTP_ERROR_MESSAGE(err.status, err.message);
  }

  const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&logout_redirect_uri=${import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI}`;

  window.location.href = logoutURL;
};
