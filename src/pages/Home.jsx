import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import { SocketProvider } from "@/store/SocketContext";

import { RiKakaoTalkFill } from "react-icons/ri";

import logo from "/images/logo.png";

const isMobile = /Mobi/i.test(window.navigator.userAgent);

const Home = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const hasProjectPath = location.pathname === "/projects";
  const [isProjectListModal, setProjectListModal] = useState(hasProjectPath && !projectId);

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 p-6 z-50">
        <div className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow-lg max-w-sm text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-2">
            🚫 모바일은 지원하지 않습니다. 죄송합니"도미도"
          </h1>
          <p className="text-gray-600">서비스는 데스크톱 브라우저에서 이용해 주세요.</p>
        </div>
      </div>
    );
  }
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
