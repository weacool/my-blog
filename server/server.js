const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const cors = require("cors");
const isEqual = require("lodash/isEqual");

const app = express();
const port = process.env.PORT || 5000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

// Serve static files from the 'build' folder in your React app
app.use(express.static(path.join(__dirname, "../dist")));

// Define a route to handle all other requests and serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
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
    switchCombo: [[1, 1]],
  },
  {
    player: 2,
    hand1: 1,
    hand2: 1,
    turn: false,
    myHand: null,
    isButtonClicked1: false,
    isButtonClicked2: false,
    switchCombo: [[1, 1]],
  },
];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendState", (newState) => {
    // Update the server-side state with the received state
    stateholder = newState;
    //Broadcast the updated state to all connected clients
    io.emit("updateState", stateholder);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
