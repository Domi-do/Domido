import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import useSettingStore from "@/store/useSettingStore";

const CameraControls = ({ cameraAngle }) => {
  const rotationSensitivity = useSettingStore((state) => state.rotationSensitivity);

  const { camera, gl } = useThree();
  const controlsRef = useRef(null);
  const moveSpeed = 0.15;

  const moveState = useRef({ KeyW: false, KeyA: false, KeyS: false, KeyD: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "KeyA":
        case "KeyS":
        case "KeyD":
          moveState[e.code] = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "KeyA":
        case "KeyS":
        case "KeyD":
          moveState[e.code] = false;
          break;
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
    camera.position.set(...cameraAngle);
    camera.lookAt(0, 0, 0);
  }, [cameraAngle]);

  useFrame(() => {
    const direction = new THREE.Vector3();

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    if (moveState["KeyW"]) direction.add(forward);
    if (moveState["KeyS"]) direction.sub(forward);
    if (moveState["KeyA"]) direction.sub(right);
    if (moveState["KeyD"]) direction.add(right);

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(moveSpeed);
      camera.position.add(direction);
      if (controlsRef.current) {
        controlsRef.current.target.add(direction);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      mouseButtons={{ LEFT: null, MIDDLE: 0, RIGHT: 2 }}
      rotateSpeed={rotationSensitivity}
      enableDamping={true}
      dampingFactor={1.25}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
    />
  );
};

export default CameraControls;
