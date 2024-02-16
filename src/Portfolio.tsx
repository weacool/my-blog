import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Chopsticks from "./Chopsticks/Index.tsx";

interface MyButtonChopSticksProps {
  id: number;
}

function MyButtonChopSticks({ id }: MyButtonChopSticksProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/portfolio/chopsticks/${id}`);
  };

  const isChopsticksRoute =
    location.pathname === `/portfolio/chopsticks/1` ||
    location.pathname === `/portfolio/chopsticks/2`;

  return (
    <div>
      {!isChopsticksRoute && (
        <Link to={`/portfolio/chopsticks/${id}`}>
          <div style={{ padding: "50px" }}>
            <button onClick={handleClick}>
              <img className="chopsticks" src={`Chopsticks.jpg`} />
            </button>
            <p>Chopsticks Game Player {id}</p>
          </div>
        </Link>
      )}
    </div>
  );
}

const Portfolio = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <MyButtonChopSticks id={1} />
        <MyButtonChopSticks id={2} />
        {/* Add more buttons as needed */}
        <Routes>
          <Route path="chopsticks/:id" element={<Chopsticks />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Portfolio;
