import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      fetch("http://localhost:3000/oauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("서버 응답 실패");
          return res.json();
        })
        .then((data) => {
          console.log("로그인 성공", data);
          navigate("/game");
        })
        .catch((err) => {
          console.error("로그인 실패", err);
        });
    } else {
      console.error("인가 코드 없음!");
      navigate("/");
    }
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
};

export default OAuthCallback;
