const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const cors = require("cors");

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
