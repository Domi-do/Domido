import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HTTPError } from "@/utils/HTTPError";

const useRefreshAccessToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem("dominoRefreshToken");

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("dominoAccessToken", data.token);
      } catch (err) {
        localStorage.removeItem("dominoAccessToken");
        localStorage.removeItem("dominoRefreshToken");
        navigate("/");
        throw new HTTPError(err.status, err.message);
      }
    };

    refreshAccessToken();
  }, [navigate]);
};

export default useRefreshAccessToken;
