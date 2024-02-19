import Typography from "@mui/material/Typography";

const HomePage = () => {
  return (
    <div className="container">
      <Typography variant="h3" sx={{ marginTop: "170px" }}>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "80px", width: "650px" }}>
        I've created this website as a hobby and also a place where I can
        practice some of the real world skills in full stack development. From
        the front end all the way to deployment. I graduated university in a
        degree of statistics but have ample experience in programming through
        university courses and an internship for a startup. I hope to add more
        and more projects to my portfolio that are fun and interactive, starting
        with the chopsticks game that I have built. Please enjoy your stay while
        you're here.
      </Typography>
    </div>
  );
};

export default HomePage;
