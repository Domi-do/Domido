import { useEffect } from "react";

import useDominoStore from "@/store/useDominoStore";
import { useTutorialStore } from "@/store/useTutorialStore";

const ObjectCard = ({ objectName, objectInfo, groupName }) => {
  const { selectedDomino, setSelectedDomino } = useDominoStore();
  const isSelected = selectedDomino?.objectName === objectName;
  const { tracker, setTracker } = useTutorialStore.getState();

  useEffect(() => {
    const alreadyCleared = tracker.isDominoSelected;

    if (!alreadyCleared && selectedDomino?.objectName === "defaultObject") {
      setTracker("isDominoSelected", true);
    }
  }, [selectedDomino]);

  return (
    <div
      key={objectName}
      data-testid={`object-button-${objectName}`}
      className="group flex flex-col items-center gap-1 text-white text-xs cursor-pointer"
      onClick={() => setSelectedDomino({ ...objectInfo, objectName, groupName })}
    >
      <div
        className={`${isSelected && "border-2 border-[#22ff00]"} w-26 h-26 bg-black/50 rounded overflow-hidden flex items-center justify-center`}
      >
        <img
          src={objectInfo.thumbnail}
          alt={objectName}
          draggable={false}
          className="w-full h-full object-contain transform transition-transform duration-200 group-hover:scale-120 select-none"
        />
      </div>
      <span className="text-center font-normal">{objectInfo.title}</span>
    </div>
  );
};

export default ObjectCard;
