import React, { Component } from "react";
import NavBarHome from "./NavBar/NavBarHome";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import EventTableAll from "./Organisation/EventTableAll";
import { Grid, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
async function getUserById(userId) {

    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}

/**
 * Gets all events from the db
 */
async function getAllEvents() {

    let token = localStorage.getItem('token');

    let res = await axios.get(`http://localhost:8000/api/feed/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userObj: {},
            allEvents: []
        }


    }

    async componentDidMount() {
        let userId = localStorage.getItem('userid')
        let userObj = await getUserById(userId);
        let allEvents = await getAllEvents();



        this.setState({
            userObj: userObj,
            allEvents: allEvents
        })

    }
    render() {
        return (
            <div>
                <div>
                    {/* We can send userObj to nav bar which can decide to show donation history */}
                    <NavBarHome />
                </div>
                <h2>Hello this our HomePage</h2>
                <h3>Welcome {this.state.userObj.name}</h3>





                <Container maxWidth="lg">


                    <Grid container>
                        <Grid item>
                            <TextField>

                            </TextField>
                        </Grid>
                    </Grid>



                    <Divider />
                    <EventTableAll history={this.props.history} feedItems={this.state.allEvents} userDetails={this.state.userObj} />

                </Container >




            </div>
        );
    }
}

export default HomePage;
