import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../types/index";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

export function connectSocket() {
  if (socket) {
    return socket;
  } else {
    // socket = io("http://localhost:3001");
    socket = io("https://epic-wars-server.onrender.com");
    return socket;
  }
}
