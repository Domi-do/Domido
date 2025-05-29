const GuideToast = () => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#1a1a1a] text-gray-100 px-6 py-5 rounded-full shadow-md gap-3 opacity-80">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
          X
        </div>
        <span className="text-base font-light">Remove</span>
      </div>
      <div className="h-5 w-px bg-gray-500 opacity-40" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
          H
        </div>
        <span className="text-base font-light">Hide</span>
      </div>
    </div>
  );
};

export default GuideToast;
