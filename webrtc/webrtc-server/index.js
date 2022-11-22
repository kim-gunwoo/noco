const express = require("express");
const socketIo = require("socker.io");
const http = require("http");
const app = express();
const port = 8000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http//localhost:3000",
  },
});

const offerMap = new Map();

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("join", ({ roomId }) => {
    socket.join(roomId);
    const prevOffer = offerMap.get(roomId);
    socket.emit("remote-offer", { offer: prevOffer });
  });

  socket.on("new-offer", ({ roomId, offer }) => {
    offerMap.set(roomId, offer);
  });

  socket.on("new-answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("remote-answer", { answer });
  });
});

server.listen(port, () => {
  console.log(`server run ${port}`);
});
