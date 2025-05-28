import guide from "/public/images/guide_ui.png";

const GuideToast = () => {
  return (
    <div>
      <img
        src={guide}
        alt="GUIDE"
        className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[300px]"
      />
    </div>
  );
};

export default GuideToast;
