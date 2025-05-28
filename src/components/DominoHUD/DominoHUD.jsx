import { useState, useEffect } from "react";

import pushButton from "/images/push_button.png";
import fingerCursor from "/images/finger_cursor.png";

import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";

const DominoHUD = ({
  rotationSensitivity,
  onChangeSensitivity,
  selectedObject,
  setSelectedObject,
}) => {
  const [isClickedPushButton, setIsClickedPushButton] = useState(false);

  useEffect(() => {
    if (!isClickedPushButton) return;

    togglePushCursor(true);
    window.addEventListener("keydown", closePushMode);

    return () => {
      togglePushCursor(false);
    };
  }, [isClickedPushButton]);

  const togglePushCursor = (isChange) => {
    document.body.style.cursor = isChange ? `url(${fingerCursor}), auto` : "auto";
  };

  const closePushMode = (e) => {
    const isKeyUpToClosePushMode = e.keyCode === 27 || e.which === 27;

    if (isKeyUpToClosePushMode) {
      setIsClickedPushButton(false);
    }
  };

  return (
    <>
      <div className="fixed z-50">
        <input
          id="sensitivity"
          type="range"
          min={1}
          max={50}
          step={0.01}
          value={rotationSensitivity}
          onChange={onChangeSensitivity}
          className="w-full"
        />
        <button
          className="cursor-pointer w-[80px] h-[80px]"
          onClick={() => setIsClickedPushButton(true)}
        >
          <img
            src={pushButton}
            alt="손가락 버튼"
            draggable="false"
          />
        </button>
      </div>
      <SidePanel
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
      />
    </>
  );
};

export default DominoHUD;
