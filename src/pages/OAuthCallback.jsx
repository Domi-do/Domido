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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code }),
        });
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.message;
          console.warn("로그인 실패:", errorMessage);
          alert(errorMessage);
          navigate("/");

          return;
        }

        localStorage.setItem("dominoAccessToken", data.token);
        localStorage.setItem("dominoRefreshToken", data.refreshToken);

        navigate("/projects");
      } catch (err) {
        console.error("로그인 실패", err);
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
};

export default OAuthCallback;
