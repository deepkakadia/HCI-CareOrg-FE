import React from "react";
import NavBarLogin from "./NavBar/NavBarLogin";
import { signup } from "../utils/index";

import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", username: "", password: "", authflag: 1 };
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
    return (
      <div>
        <div>
          <NavBarLogin btnName="Login" btnLink="/login" />
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
                    Sign up to create Account
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          label="Name"
                          fullWidth
                          name="name"
                          variant="outlined"
                          color="primary"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required
                          autoFocus
                        />
                      </Grid>
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
                  <Link href="#" variant="body2">
                    Forgot Password?
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

export default SignupForm;
