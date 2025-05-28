import React, { useState } from "react";

const useDominoPlacement = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [placedDominos, setPlacedDominos] = useState([]);

  return { selectedObject, placedDominos, setSelectedObject, setPlacedDominos };
};

export default useDominoPlacement;
