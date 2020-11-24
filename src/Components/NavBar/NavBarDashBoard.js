import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { logout } from "../../utils/index";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

const NavBarDashBoard = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => {
    logout();
    window.alert("Logout Successful!");
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2A3D45" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Benchmark
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button onClick={handleClick} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBarDashBoard;
