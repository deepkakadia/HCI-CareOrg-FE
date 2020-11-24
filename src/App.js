import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound404 from "./Components/NotFound404";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoutes";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage";
import About from "./Components/About";
import Evaluation from "./Components/Evaluation";
import License from "./Components/License";
import Dataset from "./Components/Dataset";
import Submit from "./Components/Submit";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path="/Dashboard"
              component={Dashboard }
            ></PrivateRoute>
            {/* <PrivateRoute exact path="/Dashboard" render={(props) => <Dashboard {...props}/>}/> */}
            <PrivateRoute
              exact
              path="/submit"
              component={Submit}
            ></PrivateRoute>

            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/evaluation" component={Evaluation}></Route>
            <Route exact path="/license" component={License}></Route>
            <Route exact path="/dataset" component={Dataset}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route component={NotFound404}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
