import React, { Component } from "react";
import Form from "./Form";
import Table from "./OutputTable";
import NavBarHome from "./NavBar/NavBarHome";

class Submit extends Component {
  state = {
    data: [],
  };

  render() {
    return (
      <div>
        <NavBarHome />
        <Form
          onSubmit={(submission) =>
            this.setState({
              data: [...this.state.data, submission],
            })
          }
        />
        <Table
          data={this.state.data}
          header={[
            {
              name: "First name",
              prop: "firstName",
            },
            {
              name: "Last name",
              prop: "lastName",
            },
            {
              name: "Email",
              prop: "email",
            },
          ]}
        />{" "}
      </div>
    );
  }
}

export default Submit;
