import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("dominoAccessToken");
    localStorage.removeItem("dominoRefreshToken");
    localStorage.removeItem("kakaoAccessToken");

    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-[48px] h-[48px] border-[4px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LogoutCallback;
