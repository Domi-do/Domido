import { Text } from "@react-three/drei";
import { useMemo } from "react";

import ObjectRenderer from "@/components/DominoCanvas/ObjectRenderer/ObjectRenderer";
import { useSocket } from "@/store/SocketContext";

const OtherUserDominos = () => {
  const { otherCursors } = useSocket();

  const otherDominoMeshes = useMemo(() => {
    return Object.entries(otherCursors).map(
      ([userId, { userNickname, position, objectInfo, selectedColor, rotationY }]) => {
        const [x, y, z] = position;
        return (
          <group key={userId}>
            <group
              position={[x, y, z]}
              rotation={[0, rotationY, 0]}
            >
              <ObjectRenderer
                dominoInfo={objectInfo}
                color={selectedColor || "white"}
              />
            </group>
            <Text
              position={[x, y + 1.2, z]} // 월드 좌표 기준으로 텍스트 위치 지정
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.02}
              outlineColor="black"
            >
              {userNickname}
            </Text>
          </group>
        );
      },
    );
  }, [otherCursors]);

  return <>{otherDominoMeshes}</>;
};

export default OtherUserDominos;
