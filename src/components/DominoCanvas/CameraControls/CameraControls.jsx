import { OrbitControls } from "@react-three/drei";

import useSettingStore from "@/store/useSettingStore";

const CameraControls = () => {
  const rotationSensitivity = useSettingStore((state) => state.rotationSensitivity);

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
