import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "@/store/ToastContext";
import { API_PATHS } from "@/constants/apiPaths";

import socket from "@/services/socket";
import useUserStore from "@/store/useUserStore";
import { OtherCursorsState } from "@/types/otherCursor";
import { Socket } from "socket.io-client";

export interface SocketContextType {
  otherCursors: OtherCursorsState;
  projectId: string | undefined;
  socket: Socket;
  myUserID: string | undefined;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { projectId } = useParams();
  const [otherCursors, setOtherCursors] = useState<OtherCursorsState>({});
  const { showToast } = useToast();
  const { userInfo } = useUserStore.getState();
  const queryClient = useQueryClient();

  const myUserID = userInfo?.userID;
  const navigate = useNavigate();

  const removeCursor = (userID: string) => {
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
      navigate(`${API_PATHS.PROJECTS}`);
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

    socket.on("domino update", ({ sendUser }) => {
      if (myUserID === sendUser) return;
      queryClient.refetchQueries({ queryKey: ["dominos", projectId], exact: true });
    });

    socket.on("user left", ({ message, userID }) => {
      showToast({ message, placement: "bottomRight" });
      removeCursor(userID);
    });

    socket.on("other cursor clear", ({ userID }) => {
      removeCursor(userID);
    });

    return () => {
      socket.off("user joined");
      socket.off("cursor position update");
      socket.off("domino update");
      socket.off("user left");
      socket.off("other cursor clear");
      socket.off("room full");
    };
  }, [projectId]);

  return (
    <SocketContext.Provider value={{ otherCursors, projectId, socket, myUserID }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw Error;
  return context;
};
