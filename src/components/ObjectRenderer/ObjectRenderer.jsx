import { useGLTF } from "@react-three/drei";
import React from "react";

const ObjectRenderer = ({ url, position }) => {
  const model = useGLTF(url);

  return (
    <primitive
      object={model.scene}
      position={position}
      scale={1}
    />
  );
};

export default ObjectRenderer;
