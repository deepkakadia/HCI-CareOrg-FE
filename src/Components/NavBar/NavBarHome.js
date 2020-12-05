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
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    fontFamily: "roboto",
    font: "bold",
  },

}));

const StyledButton = withStyles({
  root: {
    background: 'black',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: 10,
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const NavBarDashBoard = (props) => {
    const classes = useStyles();
    const [islogin, setislogin] = useState(undefined);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const history = useHistory();

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
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            CareOrg
          </Typography>
          {islogin === true ? (
            <StyledButton onClick={handleClick}>
              Logout
            </StyledButton>
          ) : (
            <StyledButton component={Link} to="/login">
              Login
            </StyledButton>
          )}
          
        </Toolbar>
      </AppBar>
    </div>
  );

};
export default NavBarDashBoard;
