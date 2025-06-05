import { Link } from "react-router-dom";

import KakaoLogin from "@/components/KakaoLogin";

import logo from "/images/logo.png";
import startButton from "/images/start_button.png";

const Home = () => {
  return (
    <section className="relative w-full h-screen bg-[url('/images/intro_bg.jpg')] bg-no-repeat bg-center bg-cover">
      <h1 className="absolute top-[10%] left-1/2 transform -translate-x-1/2 max-w-[700px] w-full">
        <img
          src={logo}
          alt="DOMINO"
          draggable="false"
        />
      </h1>
      <Link
        to="/game"
        className="block absolute left-1/2 bottom-[20%] transform -translate-x-1/2 w-[60%] max-w-[300px] cursor-pointer"
      >
        <img
          src={startButton}
          alt="시작버튼"
          draggable="false"
        />
      </Link>

      <KakaoLogin />
    </section>
  );
};

export default Home;
