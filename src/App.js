import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound404 from "./Components/NotFound404";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoutes";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EventCreateModal from './Components/EventForm/EventCreateModal'
import ModalHome from './Components/EventForm/ModalHome'
import ModalHome2 from './Components/DonateNowComponent/ModalHome'
import orgProfileFormEdit from './Components/OrganizationForm/orgProfileFormEdit'
import orgDash from './Components/Organisation/OrgDash'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/Dashboard"
                            component={Dashboard}
                        ></PrivateRoute>
                        {/* <PrivateRoute exact path="/Dashboard" render={(props) => <Dashboard {...props}/>}/> */}

                        <Route exact path="/" component={HomePage}></Route>
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/signup" component={SignUp}></Route>
                        <Route exact path="/createEvent" component={EventCreateModal}></Route>
                        <Route path="/test" component={ModalHome}></Route>
                        <Route path="/donate" component={ModalHome2}></Route>
                        <Route path="/org" component={orgDash}></Route>
                        <Route path="/test2" component={orgProfileFormEdit}></Route>
                        <Route component={NotFound404}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
