import { useGLTF } from "@react-three/drei";
import { memo, useMemo } from "react";
import * as THREE from "three";

const DefaultObject = ({ position, onPointerOver, onPointerOut, onClick, opacity, color }) => {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 1, 0.5), []);
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ transparent: true, opacity, color });
    return mat;
  }, [opacity, color]);

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      geometry={geometry}
      material={material}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    />
  );
};

const PrimitiveObject = ({ path, position, onPointerOver, onPointerOut, onClick }) => {
  const { scene } = useGLTF(path);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  if (!scene) return null;

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

export default memo(ObjectRenderer);
