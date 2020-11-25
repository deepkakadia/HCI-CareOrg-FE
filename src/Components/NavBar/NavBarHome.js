import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { logout } from "../../utils/index";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
  const [islogin, setislogin] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    history.push("/dashboard");
    setAnchorEl(null);
  };

  const handleClick = () => {
    logout();
    window.alert("Logout Successful!");
    history.push("/login");
  };

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        if (
          localStorage.getItem("token") === "undefined" ||
          typeof localStorage.getItem("token") === undefined ||
          localStorage.getItem("token") === null
        ) {
          setislogin(false);
        } else {
          setislogin(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [islogin]);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2A3D45" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CareOrg
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            className={classes.menuButton}
          >
            Home
          </Button>
          {islogin === true ? (
            <Button onClick={handleClick} color="inherit">
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login / Signup
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBarDashBoard;
