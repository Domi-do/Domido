import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useToast } from "./ToastContext";

import socket from "@/services/socket";
import useDominoStore from "@/store/useDominoStore";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { projectId } = useParams();
  const { setDominos } = useDominoStore();
  const [otherCursors, setOtherCursors] = useState({});
  const { showToast } = useToast();

  useEffect(() => {
    if (!projectId) return;

    socket.emit("join project room", { projectId });

    socket.on("user joined", ({ message }) => {
      showToast({ message });
    });

    socket.on(
      "cursor position update",
      ({ userID, userNickname, objectInfo, position, selectedColor }) => {
        setOtherCursors((prev) => ({
          ...prev,
          [userID]: { userNickname, objectInfo, position, selectedColor },
        }));
      },
    );

    socket.on("domino update", ({ dominos }) => {
      setDominos(dominos);
    });

    socket.on("user left", ({ message }) => {
      showToast({ message });
    });

    return () => {
      socket.off("user joined");
      socket.off("cursor position update");
      socket.off("domino update");
      socket.off("user left");
    };
  }, [projectId, setDominos]);

  return (
    <SocketContext.Provider value={{ otherCursors, projectId, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
