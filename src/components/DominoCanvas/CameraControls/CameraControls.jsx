import { OrbitControls } from "@react-three/drei";

const CameraControls = ({ rotationSensitivity }) => {
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
