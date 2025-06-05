import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "credentials": "include" },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.message?.includes("KOE320")) {
            console.warn("만료된 인가 코드, 카카오 로그인 다시 시도");

            window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
              import.meta.env.VITE_KAKAO_REST_API_KEY
            }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

            return;
          }
          throw new Error("서버 응답 실패!!!");
        }

        navigate("/game");
      } catch (err) {
        console.error("로그인 실패", err);
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
};

export default OAuthCallback;
