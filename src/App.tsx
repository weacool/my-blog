import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Blog/index.tsx";
import HomePage from "./HomePage.tsx";
import Portfolio from "./Portfolio.tsx";
import Dashboard from "./Dashboard.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="portfolio/*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//function

export default App;
