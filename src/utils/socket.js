import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3040");
export default socket;