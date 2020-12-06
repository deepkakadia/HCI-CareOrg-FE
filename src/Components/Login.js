import React from "react";
import { login } from "../utils/index";
import Dashboard from "./Dashboard"
import { Redirect } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  Divider,
  Tooltip,
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Image from "../utils/home.png"


const styles = theme => ({
  typography: {
    fontFamily: 'Roboto',
  },
  root: {
    height: '60vh',
    spacing: 10,
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const StyledButton = withStyles({
  root: {
    background: 'black',
    borderRadius: 5,
    border: 2,
    color: 'white',
    height: 48,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: 5,
    marginLeft: "auto",
    marginRight: -12,
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", authflag: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    let check = await login(this.state.username, this.state.password);
    if (check) {
      const { history } = this.props;
      history.push({
        pathname: "/Dashboard",
        state: {
          name: this.state.username
        }
      });
    } else {
      alert("Please provide correct credentials and if you havent yet created account. Click on Singup Below");
    }
  }



  render() {
    const { classes } = this.props;
    const { history } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
          </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                type="email"
                label="Email"
                fullWidth
                name="username"
                variant="outlined"
                color="primary"
                value={this.state.username}
                onChange={this.handleChange}
                required
                autoFocus
              />
              <TextField
                style={{ marginTop: "15px" }}
                id="password"
                type="password"
                label="Password"
                fullWidth
                name="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <Tooltip title="User and Organisation can login">
                <Button
                
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
              </Button>
            </Tooltip>
              <Divider variant="inset" />
            </form>
            <Grid container justify="center">
              <Typography style={{ marginTop: "15px" }}>Want to create an account? Click below !</Typography>

              <Grid container justify="center" className={classes.root} style={{ marginTop: "15px" }}>
                <Grid item xs={6}>
                  <Typography noWrap component="h1" variant="h4">
                    For Organisation
                  </Typography>
                  <Typography>If you are looking to create charity events, click below to get registered as an organisation</Typography>
                  <br></br>
                  <Tooltip title ="SignUp as Organisation">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push('/signuporg')}
                  >
                    Sign Up as Organisation
              </Button>
              </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Typography noWrap variant="h4" fontWeight="fontWeightBold">
                    For User
                </Typography>
                  <Typography>Create your personal account to help various NGO and support their cause</Typography>
                  <br></br>
                  <Tooltip title="SignUp as User">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push('/signupuser')}
                  >
                    Sign Up as User
              </Button>
              </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginForm)