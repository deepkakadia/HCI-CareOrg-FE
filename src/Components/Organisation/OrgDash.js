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
import axios from "axios";
import ForceOrgProfileEdit from '../OrganizationForm/ForceOrgProfileEdit'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';


/**
 * Gets details of all organizations for re-rendering component after edit save
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

class OrgDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: this.props.profileDetails,
            userDetails: this.props.userDetails,
            feedItems: this.props.filteredEvents,
            /**This is use to force re-render component after edit is saved */
            updateCalled: false,
            /**This is to force an edit modal when org user logs in for 
             * the first time */
            forceModalToggle: false,
        }
        /**This is use to trigger componetDidUpdate to compare old state */
        this.baseState = this.state
        this.handleUpdateCalled = this.handleUpdateCalled.bind(this)
    }

    componentWillMount() {

        const { description, industry, location } = this.props.profileDetails
        console.log(this.props.profileDetails)
        if (description === '' || industry === '' || location === '') {
            this.setState({ forceModalToggle: true })
        }
        console.log("props" + this.props)
    }

    /**This function sets state for update called to call ComponentDidUpdate
    */
    handleUpdateCalled(updateBool) {
        this.setState({ updateCalled: updateBool });
        this.componentDidUpdate(this.baseState)
    }
    //This function updates the compnent after a successful profile edit
    async componentDidUpdate(prevState) {
        if (this.state.updateCalled !== prevState.updateCalled) {
            let newOrgDetails = await getAllOrgDetails();
            let filteredOrgDetail = newOrgDetails.filter(x => x.user_profile == this.state.userDetails.id)[0]

            this.setState({ profileDetails: filteredOrgDetail })//orgDetail
        }
    }

    handle_logout = () => {
        logout();
        this.props.history.push("/");
    };

    render() {
        return (


            <div>

                <ForceOrgProfileEdit forceModalToggle={this.state.forceModalToggle} handleUpdateCalled={this.handleUpdateCalled} profileDetails={this.state.profileDetails} userDetails={this.state.userDetails} ></ForceOrgProfileEdit>


                <Container maxWidth="lg">
                    <Grid container spacing={0} alignItems='center'>
                        <Grid item xs={12} align='center'>
                            {console.log(this.state.profileDetails)}
                            {this.state.profileDetails.profile_image && <img src={this.state.profileDetails.profile_image} height="400px" width="100%" alt="stock profile" />}

                            {this.state.profileDetails.profile_image === '' &&
                                <Typography variant='h2'>Upload your profile picture</Typography>
                            }

                        </Grid>
                        <Grid item xs={12} align='center'>
                            <h1>{this.state.userDetails.name}</h1>
                        </Grid>
                        <Box display="flex" width="100%" alignItems="center" style={{ margin: "25px 24px 25px 24px", }}>
                            <Box textAlign="center" flexGrow={1}>
                                <Typography>{this.state.profileDetails.description}</Typography>
                            </Box>
                            <div>
                                <OrgProfileFormEdit handleUpdateCalled={this.handleUpdateCalled} profileDetails={this.state.profileDetails} userDetails={this.state.userDetails}> Edit Profile</OrgProfileFormEdit>
                            </div>
                        </Box>
                        <Box display="flex" width="100%" alignItems="center" style={{ margin: "-10px 24px 25px 24px", }}>
                            <Box textAlign="right" flexGrow={1} style={{ margin: "0px 10px 0px 0px", }}>
                                <Typography><AssistantPhotoIcon /> {this.state.profileDetails.industry}</Typography>
                            </Box>
                            <Box textAlign="left" flexGrow={1} style={{ margin: "0px 0px 0px 10px", }}>
                                <Typography><LocationOnIcon /> {this.state.profileDetails.location}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider />
                    <EventTable {...this.state} />
                </Container >
            </div>
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
