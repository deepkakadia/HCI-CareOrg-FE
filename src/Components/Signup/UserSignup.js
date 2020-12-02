import React from "react";
import { signup } from "../../utils/index";
import { login } from "../../utils/index";
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


class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", firstname: "",lastname:"", password: "",confirmpassword: ""};
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
    let check = await signup(
      this.state.username,
      this.state.name,
      this.state.password
    );
    console.log(check);
    if (check) {
      const { history } = this.props;
      alert("New Account Created, Please login again!");
      history.push("/login");
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
            Organisation SignUp
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
              type="text"
              label="Firstname"
              fullWidth
              name="firstname"
              variant="outlined"
              color="primary"
              value={this.state.firstname}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <TextField
              type="text"
              label="Lastname"
              fullWidth
              name="lastname"
              variant="outlined"
              color="primary"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <TextField
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
