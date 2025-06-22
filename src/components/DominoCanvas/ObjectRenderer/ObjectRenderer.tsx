import { useGLTF } from "@react-three/drei";
import { memo, useMemo } from "react";
import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import type { DominoType } from "@/types/domino";

type GroupEvents = ThreeElements["group"];

type ObjectRendererProps = {
  dominoInfo: DominoType["objectInfo"];
  position?: [number, number, number];
  onPointerOver?: GroupEvents["onPointerOver"];
  onPointerOut?: GroupEvents["onPointerOut"];
  onClick?: GroupEvents["onClick"];
  opacity?: number;
  color: string | null;
};

type DefaultObjectProps = {
  position: [number, number, number] | undefined;
  onPointerOver?: GroupEvents["onPointerOver"];
  onPointerOut?: GroupEvents["onPointerOut"];
  onClick?: GroupEvents["onClick"];
  opacity?: number;
  color: string | null;
};

type PrimitiveObjectProps = {
  path: string;
  position: [number, number, number] | undefined;
  onPointerOver?: GroupEvents["onPointerOver"];
  onPointerOut?: GroupEvents["onPointerOut"];
  onClick?: GroupEvents["onClick"];
};

const DefaultObject = ({
  position,
  onPointerOver,
  onPointerOut,
  onClick,
  opacity = 1,
  color,
}: DefaultObjectProps) => {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 1, 0.5), []);
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({ transparent: true, opacity, color: color ?? "white" });
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

const PrimitiveObject = ({
  path,
  position,
  onPointerOver,
  onPointerOut,
  onClick,
}: PrimitiveObjectProps) => {
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
  opacity = 1,
  color = "white",
}: ObjectRendererProps) => {
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
