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

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default OAuthCallback;
