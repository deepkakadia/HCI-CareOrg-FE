import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { logout } from "../../utils/index";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import StyledButton from "./StyledButton"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "Black",
    fontFamily: "roboto",
    font: "bold",
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
      <AppBar position="static" style={{ background: "black" }}>
        <Toolbar>
        <Typography variant="h4" className={classes.title} style={{color: "white"}}>
            CareOrg
          </Typography>
          
          {/* <Button component={Link} to="/" color="inherit">
            Home
          </Button> */}
          <StyledButton onClick={handleClick} color="inherit">
            Logout
          </StyledButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBarDashBoard;
