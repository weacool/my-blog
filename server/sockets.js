const { Server } = require("socket.io");
const { createServer } = require("node:http");

const initializeSocketServer = (app) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://ec2-3-26-41-98.ap-southeast-2.compute.amazonaws.com",
      methods: ["GET", "POST"],
    },
  });

  let stateholder = [
    {
      player: 1,
      hand1: 1,
      hand2: 1,
      turn: true,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [],
    },
    {
      player: 2,
      hand1: 1,
      hand2: 1,
      turn: false,
      myHand: null,
      isButtonClicked1: false,
      isButtonClicked2: false,
      switchCombo: [],
    },
  ];
  console.log(stateholder);
  io.on("connection", (socket) => {
    console.log("a user connected");

    io.emit("updateState", stateholder);

    socket.on("sendState", (newState) => {
      // Update the server-side state with the received state
      stateholder = newState;
      // Broadcast the updated state to all connected clients
      io.emit("updateState", stateholder);
    });
  });
  return server;
};
module.exports = initializeSocketServer;
