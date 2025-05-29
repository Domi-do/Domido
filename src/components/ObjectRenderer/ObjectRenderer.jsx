import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const DefaultObject = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.2, 1, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const PrimitiveObject = ({ paths, position }) => {
  const { scene } = useGLTF(paths);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={1}
    />
  );
};

const ObjectRenderer = ({ objectInfo, position }) => {
  const { objectName, paths } = objectInfo;
  const isDefaultObject = objectName === "defaultObject";

  return isDefaultObject ?
      <DefaultObject position={position} />
    : <PrimitiveObject
        paths={paths.model}
        position={position}
      />;
};

export default ObjectRenderer;
