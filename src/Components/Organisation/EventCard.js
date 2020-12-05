import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import DonateNowModal from "../DonateNowComponent/DonateNowModal";
import EventEditModal from "../EventForm/EventEditModal";
import LearnMoreComponent from './LearnMoreComponent';
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";


const styles = theme => ({
    typography: {
        fontFamily: 'Roboto',
    },
    cardDesc: {
        paddingBottom: "0px",
    },
    cardImage: {
        objectFit: 'fill',
        height: '200px',
    },
});

class EventCard extends Component {
    constructor(props) {
        super(props)
        //this.getCardButton = this.getCardButton.bind(this)
        this.formatDate = this.formatDate.bind(this)

        this.state = {
            orgDetails: this.props.userDetails,
            loggedInUser: this.props.loggedInUser,
        }
    }

    //helper method
    formatDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString([], options);
    }

    // async componentDidMount() {
    //     try {
    //         var orgDetails = this.props.userDetails;
    //         if (!orgDetails.is_organisation) {
    //             orgDetails = getOrgDetails(this.props.userDetails, this.props.eventDetails)
    //         }
    //         console.log(orgDetails)
    //         this.setState({
    //             orgDetails: orgDetails,
    //         })

    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    render() {
        const { classes } = this.props;
        const { goal_amount, received_amount, is_Expired } = this.props.eventDetails

        // shorten user description
        var desc = this.props.eventDetails.event_description
        if (desc.length > 75) {
            desc = desc.substring(0, 75) + "..."
        }
        const imagePath = this.props.eventDetails.campaign_image;

        // var orgDetails = getOrgDetails(this.props.userDetails, this.props.eventDetails)

        // setting the required button according to the "signed in user"
        var cardButton = null;
        if (is_Expired) {
            cardButton = <Button variant="contained" disabled>Expired</Button>
        } else if (this.state.loggedInUser.is_organisation) {
            cardButton = <EventEditModal eventDetails={this.props.eventDetails} userDetails={this.state.orgDetails} />
        } else {
            cardButton = <DonateNowModal details={this.props.details} orgDetails={this.state.orgDetails} userDetails={this.state.loggedInUser} />
        }

        return (
            <Card>
                <CardMedia
                    image={imagePath}
                    title="Campaign Image"
                    className={classes.cardImage}
                >
                </CardMedia>
                <CardContent className={classes.cardDesc}>
                    <Typography variant="h5" component="h2">
                        {this.props.eventDetails.event_title}
                    </Typography>
                    <Typography variant="body2">
                        {this.state.orgDetails.name}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Expires On: {this.formatDate(new Date(this.props.eventDetails.expires_on))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                        ${received_amount} raised of ${goal_amount}
                    </Typography>
                    <LinearProgressWithLabel value={Math.floor(10 * 100 * received_amount / goal_amount) / 10} />
                </CardContent>
                <CardActions>
                    <Box display="flex" width="100%" alignItems="center">
                        <Box flexGrow={1}>
                            <LearnMoreComponent eventDetails={this.props.eventDetails}></LearnMoreComponent>
                        </Box>
                        <Box textAlign="center">
                            {cardButton}
                        </Box>
                    </Box>
                </CardActions>
            </Card >
        );
    }
}

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${props.value}%`}</Typography>
            </Box>
        </Box>
    );
}

async function getOrgDetails(userDetails, eventDetails) {

    let token = localStorage.getItem("token");
    let res = await Axios.get(`http://localhost:8000/api/user/${eventDetails.user_profile}/`,
        {
            headers: {
                'Authorization': `Token ${token}`,
                'accept': 'application/json',
            }
        }
    )
    let response = await res.json()
    console.log(response)
    return await res.data
}

export default withStyles(styles)(EventCard);
