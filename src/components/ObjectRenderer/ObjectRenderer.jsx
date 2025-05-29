import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const DefaultObject = ({ position, onPointerOver, onPointerOut, onClick, opacity }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      <boxGeometry args={[0.2, 1, 0.5]} />
      <meshStandardMaterial
        color="orange"
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

const PrimitiveObject = ({ paths, position, onPointerOver, onPointerOut, onClick }) => {
  const { scene } = useGLTF(paths);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      castShadow
      receiveShadow
      object={clonedScene}
      position={position}
      scale={1}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    />
  );
};

const ObjectRenderer = ({
  dominoInfo,
  position,
  onPointerOver,
  onPointerOut,
  onClick,
  opacity,
}) => {
  const { objectName, paths } = dominoInfo;
  const isDefaultObject = objectName === "defaultObject";

  return isDefaultObject ?
      <DefaultObject
        position={position}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
        opacity={opacity}
      />
    : <PrimitiveObject
        paths={paths.model}
        position={position}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      />;
};

export default ObjectRenderer;
