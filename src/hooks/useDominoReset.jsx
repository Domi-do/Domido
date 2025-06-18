import { useEffect } from "react";

import { OBJECT_GROUP_NAMES } from "@/constants/objectMetaData.js";
import { useDominoOverwrite } from "@/hooks/Queries/useDominoOverwrite";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";

const useDominoReset = () => {
  const dominos = useDominoStore((state) => state.dominos);
  const { socket, projectId } = useSocket();
  const { mutate } = useDominoOverwrite();

  const emitDominoReset = () => {
    const filteredDominos = dominos
      .filter((domino) => domino.objectInfo?.groupName === OBJECT_GROUP_NAMES.STATIC)
      .map((domino) => {
        const { _id, ...rest } = domino;
        return rest;
      });

    socket.emit("reset domino", { projectId, dominos: filteredDominos });
  };

  useEffect(() => {
    socket.on("reset domino", ({ dominos }) => {
      mutate({ dominos });
    });

    socket.on("user joined", () => {
      emitDominoReset();
    });

    return () => {
      socket.off("reset domino");
      socket.off("user joined");
    };
  }, []);

  return { emitDominoReset };
};

export default useDominoReset;
