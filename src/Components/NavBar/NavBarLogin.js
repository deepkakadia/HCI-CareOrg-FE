import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBarDashBoard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2A3D45" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Benchmark
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            className={classes.menuButton}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/about"
            color="inherit"
            className={classes.menuButton}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/evaluation"
            color="inherit"
            className={classes.menuButton}
          >
            Evaluation
          </Button>
          <Button
            component={Link}
            to="/submit"
            color="inherit"
            className={classes.menuButton}
          >
            Submit
          </Button>
          <Button
            component={Link}
            to="/dataset"
            color="inherit"
            className={classes.menuButton}
          >
            Dataset
          </Button>
          <Button
            component={Link}
            to="/license"
            color="inherit"
            className={classes.menuButton}
          >
            License
          </Button>
          <Button component={Link} to={props.btnLink} color="inherit">
            {props.btnName}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBarDashBoard;
