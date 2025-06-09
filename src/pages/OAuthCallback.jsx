import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HTTPError } from "@/utils/HTTPError";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      if (!code) {
        console.error("인가 코드 없음");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.message;
          console.warn("로그인 실패:", errorMessage);
          navigate("/");
          throw new HTTPError(401, data.message);
        }

        localStorage.setItem("dominoAccessToken", data.token);
        localStorage.setItem("dominoRefreshToken", data.refreshToken);
        localStorage.setItem("kakaoAccessToken", data.kakaoAccessToken);

        navigate("/projects");
      } catch (err) {
        throw new HTTPError(err.response.status, err.message);
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-[48px] h-[48px] border-[4px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default OAuthCallback;
