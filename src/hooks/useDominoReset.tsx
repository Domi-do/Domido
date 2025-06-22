import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { OBJECT_GROUP_NAMES } from "@/constants/objectMetaData";
import { useDominoOverwrite } from "@/hooks/Queries/useDominoOverwrite";
import { useSocket } from "@/store/SocketContext";

export const useDominoReset = () => {
  const { mutate: overwriteDominos } = useDominoOverwrite();
  const { socket, projectId } = useSocket();
  const queryClient = useQueryClient();

  const emitDominoReset = () => {
    if (!projectId) return;
    const dominos = queryClient.getQueryData(["dominos", projectId]);

    const filteredDominos = dominos.filter(
      (domino) => domino.objectInfo?.groupName === OBJECT_GROUP_NAMES.STATIC,
    );

    overwriteDominos(
      { dominos: filteredDominos },
      {
        onSuccess: () => {
          socket.emit("reset domino", { projectId, senderId: socket.id });
        },
      },
    );
  };

  useEffect(() => {
    socket.on("sync domino request", ({ requesterId }) => {
      if (requesterId === socket.id) return;
      emitDominoReset();
    });

    socket.on("reset domino", ({ senderId }) => {
      if (senderId === socket.id) return;
      queryClient.refetchQueries(["dominos", projectId]);
    });

    return () => {
      socket.off("sync domino request");
      socket.off("reset domino");
    };
  }, [socket, projectId]);

  return { emitDominoReset };
};

export default useDominoReset;
