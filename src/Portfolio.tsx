import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Chopsticks from "./Chopsticks/Index.tsx";

function MyButtonChopSticks() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("/portfolio/chopsticks");
  };

  const isChopsticksRoute = location.pathname === "/portfolio/chopsticks";

  return (
    <div>
      {!isChopsticksRoute && (
        <Link to="/portfolio/chopsticks">
          <button onClick={handleClick}>
            <img className="chopsticks" src="Chopsticks.jpg" />
          </button>
          <p>Chopsticks Game</p>
        </Link>
      )}
    </div>
  );
}

const Portfolio = () => {
  return (
    <div>
      <div>
        <Link to="/">
          <MyButtonChopSticks />
        </Link>
        <Routes>
          <Route path="chopsticks" element={<Chopsticks />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Portfolio;
