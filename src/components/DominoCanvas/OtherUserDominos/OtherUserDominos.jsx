import { Text } from "@react-three/drei";
import { useMemo } from "react";

import ObjectRenderer from "@/components/DominoCanvas/ObjectRenderer/ObjectRenderer";
import { useSocket } from "@/store/SocketContext";

const USER_NAME_FONT_SIZE = 0.3;
const FONT_OUT_LINE = 0.02;
const USERNAME_TEXT_OFFSET = 1.2;

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
              position={[x, y + USERNAME_TEXT_OFFSET, z]}
              fontSize={USER_NAME_FONT_SIZE}
              color="white"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={FONT_OUT_LINE}
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
