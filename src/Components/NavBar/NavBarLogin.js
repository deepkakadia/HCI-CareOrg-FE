import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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
  },
}));

const NavBarDashBoard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2A3D45" }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            CareOrg
          </Typography>
          <StyledButton
            component={Link}
            to="/"
            color="inherit"
            className={classes.menuButton}
          >
            Home
          </StyledButton>
          <StyledButton component={Link} to={props.btnLink} color="inherit">
            {props.btnName}
          </StyledButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBarDashBoard;
