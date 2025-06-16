import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "@/store/useUserStore";

const LogoutCallback = () => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    localStorage.removeItem("dominoAccessToken");
    localStorage.removeItem("dominoRefreshToken");
    localStorage.removeItem("kakaoAccessToken");

    setUserInfo(null);

    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-[48px] h-[48px] border-[4px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LogoutCallback;
