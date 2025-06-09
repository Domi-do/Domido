import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRefreshAccessToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("dominoAccessToken", data.token);
      } catch (err) {
        console.error("access token 갱신 실패", err.message);
        navigate("/");
      }
    };

    refreshAccessToken();
  }, [navigate]);
};

export default useRefreshAccessToken;
