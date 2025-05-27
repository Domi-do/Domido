const ObjectCard = ({ name, paths }) => {
  return (
    <div
      key={name}
      className="group flex flex-col items-center gap-1 text-white text-xs cursor-pointer"
    >
      <div className="group-hover:border-2 group-hover:border-[#22ff00] w-26 h-26 bg-white rounded overflow-hidden flex items-center justify-center transition-all duration-200">
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
