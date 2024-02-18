import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Blog/index.tsx";
import HomePage from "./HomePage.tsx";
import Portfolio from "./Portfolio.tsx";
import Dashboard from "./Dashboard.tsx";
import Chopsticks from "./Chopsticks/Index.tsx";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="portfolio/" element={<Portfolio />} />
          <Route path="portfolio/chopsticks/:id" element={<Chopsticks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//function

export default App;
