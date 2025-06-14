import { useMemo } from "react";

import useGlbLoader from "@/hooks/useGlbLoader";

const DefaultObject = ({ position, onPointerOver, onPointerOut, onClick, opacity, color }) => {
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
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

const PrimitiveObject = ({ path, position, onPointerOver, onPointerOut, onClick }) => {
  const { get } = useGlbLoader([path]);
  const glb = get(path);

  const scene = useMemo(() => {
    return glb ? glb.scene.clone(true) : null;
  }, [glb]);

  if (!scene) return null;

  return (
    <primitive
      castShadow
      receiveShadow
      object={scene}
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
  color,
}) => {
  const { objectName, model } = dominoInfo;
  const isDefaultObject = objectName === "defaultObject";

  return isDefaultObject ?
      <DefaultObject
        position={position}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
        opacity={opacity}
        color={color}
      />
    : <PrimitiveObject
        path={model}
        position={position}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      />;
};

export default ObjectRenderer;
