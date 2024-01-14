import { Outlet, Link } from "react-router-dom";

function MyButtonAbout()  {

  return (
      <Link to="/About">
      <button 
      className = "buttoncss1"
      >
          About
      </button>
      </Link>
  )
}

function MyButtonHome()  {

  return (
      <Link to="/">
      <button 
      className = "buttoncss3"
      >
          Home
      </button>
      </Link>
  )
}

function MyButtonPortfolio()  {

  return (
      <Link to="/Portfolio">
      <button 
      className = "buttoncss2"
      >
          Portfolio
      </button>
      </Link>
  )
}

const Dashboard = () => {
  return (
    <>
      <nav>
        
            <Link to="/">
              <MyButtonHome />
            </Link>

            <Link to="/about">
              <MyButtonAbout />
            </Link>

            <Link to="/Portfolio">
              <MyButtonPortfolio />
            </Link>

      </nav>

      <Outlet />
    </>
  )
};

export default Dashboard;