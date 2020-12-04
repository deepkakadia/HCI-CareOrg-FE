import React, { Component } from "react";
import { logout } from "../../utils/index";
import Grid from '@material-ui/core/Grid';
import EventTable from "./EventTable";
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import DonationHistory from "./DonationHistory";
import Divider from '@material-ui/core/Divider';
import OrgProfileFormEdit from '../OrganizationForm/OrgProfileFormEdit'
import Axios from "axios";

class OrgDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: this.props.profileDetails,
            userDetails: this.props.userDetails,
            feedItems: this.props.filteredEvents,
        }
    }

    handle_logout = () => {
        logout();
        this.props.history.push("/");
    };

    render() {
        return (
            <Container maxWidth="lg">
                <Grid container spacing={0} alignItems='center'>
                    <Grid item xs={12} align='center'>
                        <img src={this.state.profileDetails.profile_image} height="400px" width="100%" alt="stock profile" />
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <h1>{this.state.userDetails.name}</h1>
                    </Grid>
                    <Box display="flex" width="100%" alignItems="center" style={{ margin: "25px 24px 25px 24px", }}>
                        <Box textAlign="center" flexGrow={1}>
                            <Typography>{this.state.profileDetails.description}</Typography>
                        </Box>
                        <div>
                            <OrgProfileFormEdit profileDetails={this.state.profileDetails} userDetails={this.state.userDetails}> Edit Profile</OrgProfileFormEdit>
                        </div>
                    </Box>
                </Grid>
                <Divider />
                <EventTable {...this.state} />
            </Container >
        );
    }
}

async function createEmptyProfile() {
    try {

        let token = localStorage.getItem('token')
        var data = {
            "user_profile": localStorage.getItem("userid"),
            "description": "Please setup your profile",
            "location": "Please setup your profile",
            "industry": "Please setup your profile",
        };

        let res = await fetch("http://localhost:8000/api/details/", {
            method: "POST",
            headers: {
                'Authorization': `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return res.data
    } catch (e) {
        console.log("OrgDash error: " + e);
    }
}


export default OrgDash;
