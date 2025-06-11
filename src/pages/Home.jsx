import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import { SocketProvider } from "@/store/SocketContext";

import { RiKakaoTalkFill } from "react-icons/ri";

import logo from "/images/logo.png";

const Home = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const hasProjectPath = location.pathname === "/projects";
  const [isProjectListModal, setProjectListModal] = useState(hasProjectPath && !projectId);
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  return (
    <>
      <SocketProvider>
        {isProjectListModal && <ProjectListModal closeModal={() => setProjectListModal(false)} />}
        <section className="relative w-full h-screen bg-[url('/images/intro_bg.jpg')] bg-no-repeat bg-center bg-cover">
          <h1 className="absolute top-[10%] left-1/2 transform -translate-x-1/2 max-w-[700px] w-full">
            <img
              src={logo}
              alt="DOMINO"
              draggable="false"
            />
          </h1>
          <div className="flex items-center justify-center h-screen">
            <div className="mt-[60vh]">
              <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-4 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#E5D500] px-8 py-5 rounded-xl font-semibold text-lg shadow-md transition duration-200"
              >
                <RiKakaoTalkFill className="text-2xl" /> 카카오 로그인
              </button>
            </div>
          </div>
        </section>
      </SocketProvider>
    </>
  );
};
export default Home;
