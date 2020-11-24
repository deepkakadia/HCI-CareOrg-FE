import React from "react";
import { Button, TextField } from "@material-ui/core";

export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
  };

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
    };

    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",

        email: "",
        emailError: "",
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="firstName"
          label="First name"
          value={this.state.firstName}
          onChange={(e) => this.change(e)}
        />
        <br />
        <TextField
          name="lastName"
          label="Last Name"
          value={this.state.lastName}
          onChange={(e) => this.change(e)}
        />
        <br />
        <TextField
          name="email"
          label="Email"
          value={this.state.email}
          onChange={(e) => this.change(e)}
        />
        <br />
        <Button label="Submit" onClick={(e) => this.onSubmit(e)}>
          Save
        </Button>
      </form>
    );
  }
}
