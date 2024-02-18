import { Outlet, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";

const StyledButton = styled(Button)`
  color: rgb(81, 245, 182);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(81, 245, 182, 0.1);
  }
`;

function MyButtonBlog() {
  return (
    <Link to="/Blog">
      <StyledButton size="large" style={{ marginLeft: "20px" }}>
        Blog
      </StyledButton>
    </Link>
  );
}

function MyButtonHome() {
  return (
    <Link to="/">
      <StyledButton size="large" style={{ marginLeft: "30px" }}>
        Home
      </StyledButton>
    </Link>
  );
}

function MyButtonPortfolio() {
  return (
    <Link to="/portfolio">
      <StyledButton size="large" style={{ marginLeft: "20px" }}>
        Portfolio
      </StyledButton>
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
        <Divider
          sx={{
            backgroundColor: "rgba(150, 177, 250, 0.9)",
            marginLeft: "-30px",
            marginRight: "-50px",
            marginTop: "10px",
          }}
        />
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
