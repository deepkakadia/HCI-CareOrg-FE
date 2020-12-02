import React from "react";
import { login } from "../utils/index";
import NavBarLogin from "./NavBar/NavBarLogin";
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
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  typography: {
    fontFamily: 'Roboto',
  },
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
        pathname:"/Dashboard",
        state:{
            name: this.state.username
         }
       });
    } else {
      alert("Incorrect Credentials!");
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
              type="password"
              label="Password"
              fullWidth
              name="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Divider variant="inset"/>
          </form>
          <Grid container justify="center">
            <Typography>Want to create an account? Click below !</Typography>
          
            <Grid container justify="center" className={classes.root} style={{ marginTop: "10px" }}>
              <Grid item xs >
                  <Typography component="h1" variant="h4">
                    For Organisation
                  </Typography>
                <p>Description for the organisation</p>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => history.push('/signuporg')}
                >
                Sign Up as Organisation
              </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography  variant="h4" fontWeight="fontWeightBold">
                  For User
                </Typography>
                <p>Description for the organisation</p>
              <Button
              variant="contained"        
              color="primary"
              className={classes.submit}
              onClick={() => history.push('/signupuser')}
              >
                Sign Up as User
              </Button>
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