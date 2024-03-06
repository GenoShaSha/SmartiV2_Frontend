import logo from "../../assets/pharox-logo.png";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: "linear-gradient(#009cdf, #2f287f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <img className="image" src={logo} alt="logo" />
      </div>
      {/* <div
        className="container"
      > */}
      <LinearProgress
        sx={{
          width: "50%",
        }}
      />
      {/* </div> */}
    </Grid>
  );
};

export default LoadingScreen;
