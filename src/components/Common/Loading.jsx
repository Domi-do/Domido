import { Html } from "@react-three/drei";

import loading from "/images/loading.jpg";

const Loading = () => {
  return (
    <Html fullscreen>
      <div className="relative w-full h-full">
        <img
          src={loading}
          alt="로딩 중"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </Html>
  );
};

export default Loading;
