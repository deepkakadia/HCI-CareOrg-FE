import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound404 from "./Components/NotFound404";
import SignUp from "./Components/SignUp";
import PrivateRoute from "./Components/PrivateRoutes";
import OrganisationSignUp from "./Components/Signup/OraganisationSignUp"
import UserSignUp from "./Components/Signup/UserSignup"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage";
import EventCreateModal from './Components/EventForm/EventCreateModal';
import OrgDash from './Components/Organisation/OrgDash';
import Landing from './Components/Landing'
import VisitOrg from './Components/Organisation/VisitOrg';
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        {/* <PrivateRoute exact path="/Dashboard" render={(props) => <Dashboard {...props}/>}/> */}

                        <Route exact path="/" component={Landing}></Route>
                        {/*if !is_organisation then redirect USER after sign in or login  */}


                        {/* If is_oragnisation redirect to /Dashboard */}
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/signuporg" component={OrganisationSignUp}></Route>
                        <Route exact path="/signupuser" component={UserSignUp}></Route>
                        <PrivateRoute exact path="/org" component={VisitOrg}></PrivateRoute>
                        <PrivateRoute exact path="/homepage" component={HomePage}></PrivateRoute>
                        <PrivateRoute exact path="/Dashboard" component={Dashboard}></PrivateRoute>
                        <Route component={NotFound404}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
