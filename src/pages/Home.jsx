import KakaoLogin from "@/components/KakaoLogin";

import logo from "/images/logo.png";

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
      <KakaoLogin />
    </section>
  );
};

export default Home;
