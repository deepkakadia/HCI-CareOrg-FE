import React from "react";
import { signup } from "../../utils/index";
import { login } from "../../utils/index";
import Image from "../../utils/home.png"
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
      spacing: 10,
    },
    root: {
      height: '100vh',
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
    textField: {
      marginTop: 15, 
    },
  });


class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", username: "", password: "",confirmpassword: ""};
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
    if(this.state.password != this.state.confirmpassword){
      alert("Passwords do not match")
      return 
    }
    event.preventDefault();
    let check = await signup(
      this.state.email,
      this.state.username,
      this.state.password,
      false
    );
    if (check) {
      const { history } = this.props;
      history.push("/Dashboard");
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
            User SignUp
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
          className = {classes.textField}
            id="username"
              type="text"
              label="Username"
              fullWidth
              name="username"
              variant="outlined"
              color="primary"
              value={this.state.firstname}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <TextField
            className = {classes.textField}
            id = "email"
              type="email"
              label="Email"
              fullWidth
              name="email"
              variant="outlined"
              color="primary"
              value={this.state.email}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <TextField
            className = {classes.textField}
            id = "password"
              type="password"
              label="Password"
              fullWidth
              name="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <TextField
            className = {classes.textField}
            id= "confirmpassword"
              type="password"
              label="Confirm Password"
              fullWidth
              name="confirmpassword"
              variant="outlined"
              value={this.state.confirmpassword}
              onChange={this.handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SignUp
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    );
  }
}


export default withStyles(styles)(UserSignUp)
