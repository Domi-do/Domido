import { io } from "socket.io-client";

const userNickname = localStorage.getItem("userNickname");
const userID = localStorage.getItem("userID");

const socket = io("http://localhost:3000", { query: { userNickname, userID } });

export default socket;
