import React, { Component } from "react";
import NavBarHome from "./NavBar/NavBarHome";

class HomePage extends Component {
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
