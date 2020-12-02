import React, { Component } from "react";
import { logout } from "../../utils/index";
import Grid from '@material-ui/core/Grid';
import EventTable from "./EventTable";
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DonationHistory from "./DonationHistory";

class OrgDash extends Component {
    constructor(props) {
        super(props);
        this.state = { name: undefined }
    }
    handle_logout = () => {
        logout();
        this.props.history.push("/");
    };

    render() {
        // get details of the organisation you are visiting from props
        const orgDetails = {
            'user_profile': 1,
            'user_name': 'Bhojnalay @ NYC',
            'description': 'donate money to feed poor and malnourished',
            'location': 'India',
            'industry': 'Food',

        }

        const userDetails = {
            "id": 1,
            "email": "meet@123.com",
            "name": "Meet Patel",
            "is_organisation": true
        }
        // from props
        // (current) a list of feeditems for that organisation 
        // or 
        // get the full list and filter it
        const feedItems = [
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
            {
                'user_profile': 1,
                'event_title': 'Thanksgiving Kitchen',
                'event_description': 'Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night Help cook and deliver food to the needy on Thanksgiving night',
                'created_on': new Date(2020, 9, 1),
                'expires_on': new Date(2020, 9, 30),
                'goal_amount': 10000,
                'received_amount': 3000,
            },
        ]

        return (
            <Container maxWidth="lg">
                <Grid container spacing={0} alignItems='center'>
                    <Grid item xs={12} align='center'>
                        <img src="/org_bg_1.jpg" height="400px" width="100%" alt="stock profile" />
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <h1>{orgDetails.user_name}</h1>
                    </Grid>
                    <Box display="flex" width="100%" alignItems="center" style={{ margin: "25px 24px 25px 24px", }}>
                        <Box textAlign="center" flexGrow={1}>
                            <Typography>{orgDetails.description}</Typography>
                        </Box>
                        {userDetails.is_organisation &&
                            <Box textAlign="center">
                                <Button Button variant="outlined" color="primary"> Edit Profile</Button>
                            </Box>
                        }
                    </Box>
                </Grid>
                <EventTable feedItems={feedItems} userDetails={userDetails} orgDetails={orgDetails} />
                <DonationHistory />
            </Container >
        );
    }
}

export default OrgDash;
