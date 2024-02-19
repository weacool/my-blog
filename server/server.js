const express = require("express");
const path = require("path");
const cors = require("cors");
const initializeSocketServer = require("./sockets.js");
const app = express();
const isProduction = process.env.NODE_ENV === "production";

const port = isProduction ? 5000 : 5001;
const createBlogServer = require("./database.js");

// Define the base URL
const baseURL = isProduction ? "http://chrispy.cz" : "http://localhost:5173";

app.use(cors({ origin: baseURL }));
createBlogServer(app);

app.use(express.static(path.join(__dirname, "../dist")));

// Define a route to handle all other requests and serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Initialize the socket server passing the app to it
const server = initializeSocketServer(app, baseURL);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
