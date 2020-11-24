import React from "react";
import { login } from "../utils/index";
import NavBarLogin from "./NavBar/NavBarLogin";
import Dashboard from "./Dashboard"
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";

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
    return (
      <div>
        <div>
          <NavBarLogin btnName="Signup" btnLink="/signup" />
        </div>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item style={{ paddingBottom: "15px" }}>
                  <Typography component="h1" variant="h5">
                    Sign in to your account
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
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
                      </Grid>
                      <Grid item>
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
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#1b998b",
                            color: "#ffffff",
                          }}
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item style={{ marginTop: "10px" }}>
                  <Link href="/signup" variant="body2">
                    New User? Create Account
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
