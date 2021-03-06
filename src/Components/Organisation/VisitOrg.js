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
import NavBarHome from "../NavBar/NavBarHome"
import { getUserById, getAllOrgDetails, getAllEvents } from "../Dashboard";
import VisitOrgTable from './VisitOrgTable';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

class VisitOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OrgId: this.props.location.state.OrgId,
            userDetails: {},
            orgDetails: {},
            orgProfile: {},
            orgEvents: [],
        }
    }

    async componentDidMount() {
        // var orgid = this.props.location.state.OrgId;
        const userDetails = await getUserById(localStorage.getItem("userid"));
        const orgDetails = await getUserById(this.state.OrgId);

        const allProfileDetails = await getAllOrgDetails();
        var orgProfileDetails = allProfileDetails.filter(x => x.user_profile == this.state.OrgId)[0];
        const allEvents = await getAllEvents();
        var orgEvents = allEvents.filter(x => x.user_profile == this.state.OrgId)

        this.setState({
            userDetails: userDetails,
            orgDetails: orgDetails,
            orgProfile: orgProfileDetails,
            orgEvents: orgEvents,
        })
    }

    handle_logout = () => {
        logout();
        this.props.history.push("/");
    };

    render() {
        return (

            <div>
                <div>
                    <NavBarHome />
                </div>
                <Container>
                    <Grid container spacing={0} alignItems='center'>
                        <Grid item xs={12} style={{ marginTop: "25px" }} align='center'>
                            {this.state.orgProfile.profile_image && <img src={this.state.orgProfile.profile_image} height="400px" width="100%" alt="stock profile" />}
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <h1>{this.state.orgDetails.name}</h1>
                        </Grid>
                        <Box display="flex" width="100%" alignItems="center" style={{ margin: "25px 24px 25px 24px", }}>
                            <Box textAlign="center" flexGrow={1}>
                                <Typography>{this.state.orgProfile.description}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" width="100%" alignItems="center" style={{ margin: "-10px 24px 25px 24px", }}>
                            <Box textAlign="right" flexGrow={1} style={{ margin: "0px 10px 0px 0px", }}>
                                <Typography><AssistantPhotoIcon /> {this.state.orgProfile.industry}</Typography>
                            </Box>
                            <Box textAlign="left" flexGrow={1} style={{ margin: "0px 0px 0px 10px", }}>
                                <Typography><LocationOnIcon /> {this.state.orgProfile.location}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider />
                    <VisitOrgTable {...this.state} />
                </Container >
            </div>
        );
    }
}

export default VisitOrg;
