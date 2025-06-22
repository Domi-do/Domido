import useTutorialTracker from "@/hooks/useTutorialTracker";
import useDominoStore from "@/store/useDominoStore";
import { ObjectMetaDataType } from "@/types/objectMetaData";

interface ObjectCardProps {
  objectName: string;
  objectInfo: ObjectMetaDataType;
  groupName: "STATIC_OBJECTS" | "DYNAMIC_OBJECTS";
}

const ObjectCard = ({ objectName, objectInfo, groupName }: ObjectCardProps) => {
  const { selectedDomino, setSelectedDomino } = useDominoStore();
  const selectedObjectName = selectedDomino?.objectName;

  const isSelected = selectedObjectName === objectName;
  const isDefaultDominoSelected = selectedObjectName === "defaultObject";

  useTutorialTracker(isDefaultDominoSelected);

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
