import express from "express";
import http from "http";
import { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

type PlayerObject = { socketID: ""; address: ""; nftID: "" };

const waitingQueue: PlayerObject[] = [];
waitingQueue.pop();

// Function to handle matchmaking
const handleMatchmaking = () => {
  if (waitingQueue.length >= 2) {
    const [player1, player2] = waitingQueue.splice(0, 2);

    // Simulated room creation (in practice, implement actual room creation logic)
    const roomIdentifier = `room_${Math.random().toString(36).substring(7)}`;

    // Notify matched players about the room (using WebSockets)
    const matchData1 = {
      roomIdentifier: roomIdentifier,
      opponent: player2,
      turnAddress: player1.address,
    };

    const matchData2 = {
      roomIdentifier: roomIdentifier,
      opponent: player1,
      turnAddress: player1.address,
    };

    io.to(player1.socketID).emit("match", matchData1);
    io.to(player2.socketID).emit("match", matchData2);

    console.log(
      `Matched players: ${player1.socketID} and ${player2.socketID}\nRoom: ${roomIdentifier}`
    );
  }
};

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Add the connected player to the waiting queue

  socket.on("add-queue", (playerObject: PlayerObject) => {
    console.log(
      `Socket ID: ${playerObject.socketID} Address: ${playerObject.address} NFTID: ${playerObject.nftID}`
    );
    waitingQueue.push(playerObject);

    // Handle matchmaking whenever a player connects
    handleMatchmaking();
  });

  // Shares the attribute value with the socketID passed
  socket.on("share-attribute", ({ socketIDopponent, attribute }) => {
    io.to(socketIDopponent).emit(attribute);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove disconnected player from the waiting queue
    const index = waitingQueue.findIndex(
      (player) => player.socketID === socket.id
    );
    if (index !== -1) {
      waitingQueue.splice(index, 1);
    }
  });
});

server.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
