const ObjectCard = ({ objectName, paths, groupName, selectedObject, setSelectedObject }) => {
  const isSelected = selectedObject?.objectName === objectName;
  return (
    <div
      key={objectName}
      className="group flex flex-col items-center gap-1 text-white text-xs cursor-pointer"
      onClick={() => setSelectedObject({ objectName, paths, groupName })}
    >
      <div
        className={`${isSelected && "border-2 border-[#22ff00]"} w-26 h-26 bg-black/50 rounded overflow-hidden flex items-center justify-center`}
      >
        <img
          src={paths.thumbnail}
          alt={objectName}
          className="w-full h-full object-contain transform transition-transform duration-200 group-hover:scale-130"
        />
      </div>
      <span className="text-center font-normal">{objectName}</span>
    </div>
  );
};

export default ObjectCard;
