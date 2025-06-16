import { useEffect } from "react";

import { OBJECT_GROUP_NAMES } from "@/constants/objectMetaData.js";
import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";

const useDominoReset = () => {
  const dominos = useDominoStore((state) => state.dominos);
  const { socket, projectId } = useSocket();
  const { mutate } = useDominoMutations();

  const resetAllDominoes = () => {
    const filteredDominos = dominos
      .filter((domino) => domino.objectInfo?.groupName === OBJECT_GROUP_NAMES.STATIC)
      .map((domino) => {
        const { _id, ...rest } = domino;
        return rest;
      });

    mutate({ dominos: filteredDominos });
  };

  const resetDominoSimulation = () => {
    if (!dominos.length) return;
    resetAllDominoes();

    socket.emit("reset domino", { projectId });
  };

  useEffect(() => {
    socket.on("reset domino", () => {
      resetAllDominoes();
    });

    socket.on("user joined", () => {
      resetAllDominoes();
    });

    return () => {
      socket.off("reset domino");
      socket.off("user joined");
    };
  }, []);

  return { resetDominoSimulation };
};

export default useDominoReset;
