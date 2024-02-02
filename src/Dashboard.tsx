import { Outlet, Link } from "react-router-dom";

function MyButtonAbout() {
  return (
    <Link to="/About">
      <button className="buttoncss1">About</button>
    </Link>
  );
}

function MyButtonHome() {
  return (
    <Link to="/">
      <button className="buttoncss3">Home</button>
    </Link>
  );
}

function MyButtonPortfolio() {
  return (
    <Link to="/portfolio">
      <button className="buttoncss2">Portfolio</button>
    </Link>
  );
}

const Dashboard = () => {
  return (
    <div>
      <nav>
        <MyButtonHome />
        <MyButtonAbout />
        <MyButtonPortfolio />
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
