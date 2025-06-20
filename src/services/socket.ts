import { io } from "socket.io-client";

import useUserStore from "@/store/useUserStore";

const { userInfo } = useUserStore.getState();

const userID = userInfo?.userID;
const userNickname = userInfo?.userNickname;

const socket = io(import.meta.env.VITE_API_BASE_URL, { query: { userNickname, userID } });

export default socket;
