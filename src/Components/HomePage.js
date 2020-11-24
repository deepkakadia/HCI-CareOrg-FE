import React, { Component } from "react";
import NavBarHome from "./NavBar/NavBarHome";

class HomePage extends Component {
  //   handle_logout = () => {
  //     logout();
  //     this.props.history.push("/login");
  //   };
  render() {
    return (
      <div>
        <div>
          <NavBarHome />
        </div>
        <h2>Hello this our HomePage</h2>
      </div>
    );
  }
}

export default HomePage;
