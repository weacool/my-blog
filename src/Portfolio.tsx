import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Chopsticks from "./Chopsticks/Index.tsx";
import Typography from "@mui/material/Typography";

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
        <div className="containermargin">
          <Link to={`/portfolio/chopsticks/${id}`}>
            <div>
              <button onClick={handleClick}>
                <img className="chopsticks" src={`Chopsticks.jpg`} />
              </button>
            </div>
          </Link>
          <Typography variant="body1">Player {id}</Typography>
        </div>
      )}
    </div>
  );
}

const Portfolio = () => {
  return (
    <div>
      <div className="container3">
        <Typography variant="h3" sx={{ marginTop: "100px" }}>
          Chopstick Game
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "50px" }}>
          A fast and short game that's built using socket.io for websocketing
          and passing state to the server and back to the other clients. To
          begin, click on whichever player you wish to be and have a friend to
          be the other player. From there you'll see the rules on how to play.
        </Typography>
        <div className="container2">
          <MyButtonChopSticks id={1} />
          <MyButtonChopSticks id={2} />
        </div>

        <Routes>
          <Route path="chopsticks/:id" element={<Chopsticks />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Portfolio;
