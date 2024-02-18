const { Server } = require("socket.io");
const { createServer } = require("node:http");

const initializeSocketServer = (app) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
    path: "/chopsticksocket",
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
  io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
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
