import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import useSettingStore from "@/store/useSettingStore";
import { CameraAngleType } from "@/types/cameraAngle";

type CameraAngle = CameraAngleType;

interface CameraControlsProps {
  cameraAngle: CameraAngle;
}

const CameraControls = ({ cameraAngle }: CameraControlsProps) => {
  const rotationSensitivity = useSettingStore((state) => state.rotationSensitivity);
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const moveSpeed = 0.15;

  const moveState = useRef<Record<string, boolean>>({
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (moveState.current.hasOwnProperty(e.code)) {
        moveState.current[e.code] = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (moveState.current.hasOwnProperty(e.code)) {
        moveState.current[e.code] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    camera.position.set(...(cameraAngle as [number, number, number]));
    camera.lookAt(0, 0, 0);
  }, [cameraAngle]);

  useFrame(() => {
    const direction = new THREE.Vector3();

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    if (moveState.current["KeyW"]) direction.add(forward);
    if (moveState.current["KeyS"]) direction.sub(forward);
    if (moveState.current["KeyA"]) direction.sub(right);
    if (moveState.current["KeyD"]) direction.add(right);

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(moveSpeed);
      camera.position.add(direction);
      controlsRef.current?.target.add(direction);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      mouseButtons={{ MIDDLE: 0, RIGHT: 2 }}
      rotateSpeed={Number(rotationSensitivity)}
      enableDamping={true}
      dampingFactor={1.25}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
    />
  );
};

export default CameraControls;
