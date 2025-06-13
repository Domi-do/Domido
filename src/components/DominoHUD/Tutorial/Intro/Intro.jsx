const Intro = ({ onStart, onTutorialEnd }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex flex-col items-center justify-center text-center px-4">
      <h3 className="text-4xl font-extrabold text-white drop-shadow-sm mb-4 tracking-wide">
        Tutorial <span className="text-4xl">🕹️</span>
      </h3>
      <p className="text-base text-white/90 mb-10 leading-relaxed font-medium">
        게임을 시작하기 전에,
        <br />
        간단한 조작법을 배워볼까요?
      </p>

      <button
        onClick={onStart}
        className="bg-[#fc9d16] hover:bg-[#e58e12] text-white px-8 py-3 rounded-full text-base font-semibold shadow-md transition-all duration-200 ease-in-out cursor-pointer mb-4"
      >
        시작할래요!
      </button>

      <button
        onClick={onTutorialEnd}
        className="text-sm text-white/60 hover:text-white underline transition duration-150 cursor-pointer"
      >
        건너뛸게요
      </button>
    </div>
  );
};

export default Intro;
