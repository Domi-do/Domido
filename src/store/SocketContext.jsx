import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "./ToastContext";

import socket from "@/services/socket";
import useDominoStore from "@/store/useDominoStore";
import useUserStore from "@/store/useUserStore";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { projectId } = useParams();
  const { setDominos } = useDominoStore();
  const [otherCursors, setOtherCursors] = useState({});
  const { showToast } = useToast();
  const { userInfo } = useUserStore.getState();

  const myUserID = userInfo?.userID;
  const navigate = useNavigate();

  const removeCursor = (userID) => {
    setOtherCursors((prev) => {
      const updatedOtherCursors = { ...prev };
      delete updatedOtherCursors[userID];
      return updatedOtherCursors;
    });
  };

  useEffect(() => {
    if (!projectId) return;

    socket.emit("join project room", { projectId });

    socket.on("room full", ({ message }) => {
      showToast({ message });
      navigate("/projects");
    });

    socket.on("user joined", ({ message }) => {
      showToast({ message, placement: "bottomRight" });
    });

    socket.on(
      "cursor position update",
      ({ userID, userNickname, objectInfo, position, selectedColor, rotationY }) => {
        if (userID === myUserID) return;
        setOtherCursors((prev) => ({
          ...prev,
          [userID]: { userNickname, objectInfo, position, selectedColor, rotationY },
        }));
      },
    );

    socket.on("domino update", ({ dominos, sendUser }) => {
      if (myUserID === sendUser) return;
      setDominos(dominos);
    });

    socket.on("user left", ({ message, userID }) => {
      showToast({ message, placement: "bottomRight" });
      removeCursor(userID);
    });

    socket.on("other cursor clear", ({ userID }) => {
      removeCursor(userID);
    });

    socket.on("domino cleared", ({ projectId }) => {
      if (projectId === projectId) {
        setDominos([]);
      }
    });

    return () => {
      socket.off("user joined");
      socket.off("cursor position update");
      socket.off("domino update");
      socket.off("user left");
      socket.off("other cursor clear");
      socket.off("room full");
      socket.off("domino cleared");
    };
  }, [projectId, setDominos]);

  return (
    <SocketContext.Provider value={{ otherCursors, projectId, socket, myUserID }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
