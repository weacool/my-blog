import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Blog/index.tsx";
import HomePage from "./HomePage.tsx";
import Portfolio from "./Portfolio.tsx";
import Dashboard from "./Dashboard.tsx";
import Chopsticks from "./Chopsticks/Index.tsx";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Set the title dynamically
    document.title = "Chrispy";
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "./favicon.jpg"; // Adjust the path to your favicon file
    document.head.appendChild(favicon);
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="portfolio//*" element={<Portfolio />} />
          <Route path="portfolio/chopsticks/:id" element={<Chopsticks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
