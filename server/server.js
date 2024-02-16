const express = require("express");
const path = require("path");
const cors = require("cors");
const initializeSocketServer = require("./sockets.js");
const app = express();
const port = process.env.PORT || 5000;
const createBlogServer = require("./database.js");
app.use(cors({ origin: "http://localhost:5173" }));
createBlogServer(app);

app.use(express.static(path.join(__dirname, "../dist")));

// Define a route to handle all other requests and serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Initialize the socket server passing the app to it
const server = initializeSocketServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
