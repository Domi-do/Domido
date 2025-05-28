const ObjectCard = ({ name, paths, selectedObject, setSelectedObject }) => {
  const isSelected = selectedObject === paths.model;

  return (
    <div
      key={name}
      className="group flex flex-col items-center gap-1 text-white text-xs cursor-pointer"
      onClick={() => setSelectedObject(paths.model)}
    >
      <div
        className={`${isSelected && "border-2 border-[#22ff00]"} w-26 h-26 bg-black/50 rounded overflow-hidden flex items-center justify-center`}
      >
        <img
          src={paths.thumbnail}
          alt={name}
          className="w-full h-full object-contain transform transition-transform duration-200 group-hover:scale-130"
        />
      </div>
      <span className="text-center font-normal">{name.replaceAll("_", " ")}</span>
    </div>
  );
};

export default ObjectCard;
