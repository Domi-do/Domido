import { io } from "socket.io-client";

const userNickname = localStorage.getItem("userNickname");
const userID = localStorage.getItem("userID");

const socket = io(import.meta.env.VITE_API_BASE_URL, { query: { userNickname, userID } });

export default socket;
