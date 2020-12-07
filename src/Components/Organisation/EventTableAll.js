import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import EventCardAll from "./EventCardAll";
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import EventCreateModal from "../EventForm/EventCreateModal";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

//This component is to display  all events based on search


/**
 * Gets details of all organizations
 */
async function getAllOrgDetails() {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/details/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;
}

/**
 * Gets all users from the db
 */
async function getAllUser() {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/user/`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })

    let orgDict = {};


    res.data.forEach(currUser => {
        if (currUser.is_organisation) {
            orgDict[currUser.id] = currUser;
        }
    });



    return orgDict;
}



class EventTableAll extends Component {
    constructor(props) {
        super(props);
        var len = this.props.feedItems.length
        var count = 1;
        if (len > 6) {
            count += Math.floor(len / 6);
        }
        this.state = {
            page: 1,
            pageCount: count,
            orgDict: {}
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    async componentDidMount() {
        let allOrgDetails = await getAllOrgDetails();
        let orgDict = await getAllUser();

        this.setState({ orgDict: orgDict })
    }

    async componentDidUpdate() {
        var len = this.props.feedItems.length
        var count = 1;
        if (this.state.pageCount == 1 && len > 6) {
            if (len > 6) {
                count += Math.floor(len / 6);
            }
            this.setState({
                pageCount: count
            })
        }

    }
    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
        );
    }

    render() {
        var eventArray = this.props.feedItems;
        eventArray = eventArray.slice((this.state.page - 1) * 6, (this.state.page * 6));

        return (
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid container justify="center" style={{ padding: "10px" }}>
                        <Box width="100%" textAlign="center">
                            <Typography variant="h4">
                                Campaigns
                            </Typography>
                        </Box>
                        {
                            this.props.userDetails.is_organisation &&
                            <Box textAlign="center">
                                <EventCreateModal userDetails={this.props.userDetails} />
                            </Box>
                        }

                    </Grid>
                    {eventArray.map(currEvent => (

                        <Grid item xs={12} sm={6} md={4} key={currEvent.id}>
                            <EventCardAll history={this.props.history} details={currEvent} userDetails={this.props.userDetails} orgDetails={this.state.orgDict[currEvent.user_profile]} />
                        </Grid>
                    ))}
                    <Grid container justify="center" style={{ padding: "10px" }}>
                        <Pagination
                            defaultPage={1}
                            page={this.state.page}
                            color="primary"
                            count={this.state.pageCount}
                            onChange={this.handlePageChange}
                        />
                    </Grid>
                </Grid>
            </Container>

        )
    }

}

export default EventTableAll;