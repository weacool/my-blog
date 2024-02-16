import { Outlet, Link } from "react-router-dom";
import Button from "@mui/material/Button";

function MyButtonBlog() {
  return (
    <Link to="/Blog">
      <Button variant="contained" size="large" style={{ marginRight: "40px" }}>
        Blog
      </Button>
    </Link>
  );
}

function MyButtonHome() {
  return (
    <Link to="/">
      <Button variant="contained" size="large" style={{ marginRight: "40px" }}>
        Home
      </Button>
    </Link>
  );
}

function MyButtonPortfolio() {
  return (
    <Link to="/portfolio">
      <Button variant="contained" size="large" style={{ marginRight: "40px" }}>
        Portfolio
      </Button>
    </Link>
  );
}

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav>
        <MyButtonHome />
        <MyButtonBlog />
        <MyButtonPortfolio />
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
