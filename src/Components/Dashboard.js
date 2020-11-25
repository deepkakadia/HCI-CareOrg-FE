import React, { Component } from "react";
import { logout } from "../utils/index";
import NavBarDashBoard from "./NavBar/NavBarDashBoard";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {name: undefined}
  }
  handle_logout = () => {
    logout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <div>
          <NavBarDashBoard />
        </div>
        <h2>{this.state.name} This our Dashboard</h2>
        <form action="/login" method="get">
          <input type="submit" value="Login" name="Submit" id="form_login" />
        </form>
        <form action="/signup" method="get">
          <input type="submit" value="SignUp" name="Submit" id="form_signup" />
        </form>
        <button onClick={this.handle_logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
