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
        this.state = { name: undefined }
        this.createEmptyProfile = this.createEmptyProfile.bind(this);
    }

    handle_logout = () => {
        logout();
        this.props.history.push("/");
    };

    createEmptyProfile = async () => {
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

            return data
        } catch (e) {
            console.log("OrgDash error: " + e);
        }
    }

    render() {

        const profileDetails = this.props.orgDetails
        const userDetails = this.props.userDetails
        const feedItems = this.props.filteredEvents


        var profile = this.props.allOrgProfiles.filter(x => x.user_profile == userDetails.id)
        if (profile.length == 0) {
            profile = this.createEmptyProfile()
        } else {
            profile = profile[0]
        }
        var EventTableProps = {
            userDetails: userDetails,
            profileDetails: profile,
            feedItems: feedItems,
        }

        return (
            <Container maxWidth="lg">
                <Grid container spacing={0} alignItems='center'>
                    <Grid item xs={12} align='center'>
                        <img src={profileDetails.profile_image} height="400px" width="100%" alt="stock profile" />
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <h1>{userDetails.name}</h1>
                    </Grid>
                    <Box display="flex" width="100%" alignItems="center" style={{ margin: "25px 24px 25px 24px", }}>
                        <Box textAlign="center" flexGrow={1}>
                            <Typography>{profileDetails.description}</Typography>
                        </Box>
                        <div>
                            <OrgProfileFormEdit profileDetails={profileDetails} userDetails={userDetails}> Edit Profile</OrgProfileFormEdit>
                        </div>
                    </Box>
                </Grid>
                <Divider />
                <EventTable {...EventTableProps} />
            </Container >
        );
    }
}

export default OrgDash;
