import React, { Component } from "react";
import { loremIpsum } from "react-lorem-ipsum";

class About extends Component {
  //   handle_logout = () => {
  //     logout();
  //     this.props.history.push("/login");
  //   };
  render() {
    return (
      <div className="text-wrapper">
        {loremIpsum({ p: 3 }).map((text) => (
          <div className="text" key={text}>
            {text}
          </div>
        ))}
      </div>
    );
  }
}

export default About;
