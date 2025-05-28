import { useState } from "react";

const useDominoPlacement = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [placedDominos, setPlacedDominos] = useState([]);

  const handlePlaceDomino = (e, objectInfo) => {
    const clickedPosition = e.point;
    setPlacedDominos((prev) => [
      ...prev,
      {
        id: Date.now(),
        position: [clickedPosition.x, clickedPosition.y, clickedPosition.z],
        objectInfo,
      },
    ]);
  };

  return { selectedObject, placedDominos, setSelectedObject, handlePlaceDomino };
};

export default useDominoPlacement;
