const SocialKakao = () => {
  const VITE_KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const VITE_KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="mt-[70vh]">
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#e5d500] px-5 py-3 rounded-xl font-semibold shadow-md transition duration-200"
          >
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="Kakao"
              className="w-[25px] h-[25px]"
            />
            카카오 로그인
          </button>
        </div>
      </div>
    </>
  );
};
export default SocialKakao;
