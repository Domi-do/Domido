import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import useSettingStore from "@/store/useSettingStore";

const CameraControls = ({ cameraAngle }) => {
  const rotationSensitivity = useSettingStore((state) => state.rotationSensitivity);

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraAngle);
    camera.lookAt(0, 0, 0);
  }, [cameraAngle]);

  return (
    <OrbitControls
      enableZoom={true}
      mouseButtons={{ LEFT: null, MIDDLE: 0, RIGHT: 2 }}
      rotateSpeed={rotationSensitivity}
      enableDamping={true}
      dampingFactor={1.25}
    />
  );
};

export default CameraControls;
