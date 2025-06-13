import { Html } from "@react-three/drei";
import { useQueryClient } from "@tanstack/react-query";

import loadingImg from "/images/loading.jpg";

const Loading = () => {
  const queryClient = useQueryClient();
  const cachedLoadingImg = queryClient.getQueryData(["img", loadingImg]) || null;

  return (
    <Html fullscreen>
      <div className="relative w-full h-full bg-black">
        <img
          src={cachedLoadingImg}
          alt="로딩 중"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </Html>
  );
};

export default Loading;
