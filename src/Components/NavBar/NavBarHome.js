import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { logout } from "../../utils/index";
import { useHistory } from "react-router-dom";
import StyledButton from "./StyledButton"
import StyledButton2 from "./StyledButton2"
import { Redirect } from 'react-router-dom';

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
            <AppBar position="static" style={{ background: 'rgba(0, 0, 0)', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title} style={{ color: "White" }}>
                        <Link to="/homepage" className={classes.title} style={{ color: "White", textDecoration: 'none' }}>CareOrg</Link>
                    </Typography>
                    <StyledButton2 onClick={() => { return (<Redirect to="/donations"></Redirect>) }}>
                        Donation History
            </StyledButton2>
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
