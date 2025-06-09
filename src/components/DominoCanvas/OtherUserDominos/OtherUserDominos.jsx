import { Text } from "@react-three/drei";
import { useMemo } from "react";

import ObjectRenderer from "@/components/DominoCanvas/ObjectRenderer/ObjectRenderer";
import { useSocket } from "@/store/SocketContext";

const OtherUserDominos = () => {
  const { otherCursors } = useSocket();

  const otherDominoMeshes = useMemo(() => {
    return Object.entries(otherCursors).map(
      ([userId, { userNickname, position, objectInfo, selectedColor }]) => {
        const [x, y, z] = position;
        return (
          <group
            key={userId}
            position={[x, y, z]}
          >
            <ObjectRenderer
              dominoInfo={objectInfo}
              color={selectedColor || "white"}
            />
            <Text
              position={[0, 1.2, 0]}
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
