import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About.tsx";
import HomePage from "./HomePage.tsx";
import Portfolio from "./Portfolio.tsx";
import Dashboard from "./Dashboard.tsx";
import io from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:5000"); // Replace with your server URL

    // Event handling
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("connect_error", (error) => {
      debugger;
      console.error("Connection error:", error.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Additional event handling as needed

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio/*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//function

export default App;
