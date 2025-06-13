const StepCard = ({ onNext, canProceed, message, step, total, colPosition, onTutorialEnd }) => {
  const isLastStep = step === total - 1;
  const progressPercent = total > 1 ? Math.round((step / (total - 1)) * 100) : 100;
  const positionClasses = `
  ${colPosition === "top" ? "top-[10px]" : "bottom-[10px]"}
`;

  return (
    <div
      className={`fixed ${positionClasses} left-[10px] z-[200] bg-white/95 backdrop-blur-md shadow-lg rounded-2xl w-[300px] px-5 py-5 text-gray-800`}
    >
      <div className="text-center mb-4 min-h-[56px] flex items-center justify-center">
        <p className="text-base font-medium leading-snug tracking-normal">{message}</p>
      </div>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#fc9d16] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 w-[30px] text-right">{progressPercent}%</span>
      </div>
      <button
        disabled={!canProceed}
        onClick={isLastStep ? onTutorialEnd : onNext}
        className={`w-full py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
    ${
      canProceed ?
        "bg-[#fc9d16] text-white cursor-pointer"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
      >
        {isLastStep ? "다 배웠어요!" : "다음"}
      </button>
    </div>
  );
};

export default StepCard;
