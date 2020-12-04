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
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom'


//This component is to display events based on search



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

class EventCardAll extends Component {
    constructor(props) {
        super(props)
        //this.getCardButton = this.getCardButton.bind(this)
        this.formatDate = this.formatDate.bind(this)
        this.redirectToOrgProfile = this.redirectToOrgProfile.bind(this)
    }


    //helper method
    formatDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString([], options);
    }
    redirectToOrgProfile() {
        console.log('redirect')
        return (<Redirect
            to={{
                pathname: "/org",
                state: { orgDetails: this.props.orgDetails, userDetails: this.props.userDetails }
            }
            }

        ></Redirect >)
    }

    render() {
        const { classes } = this.props;
        const { goal_amount, received_amount, is_Expired } = this.props.details

        // shorten user description
        var desc = this.props.details.event_description
        if (desc.length > 75) {
            desc = desc.substring(0, 75) + "..."
        }

        // paceholder image
        const imagePath = `/CampaignPhotos/camp_${this.props.details.id}.jpg`;

        // setting the required button according to the "signed in user"
        var cardButton = null;
        if (is_Expired) {
            cardButton = <Button variant="contained" color="secondary" disabled>Expired</Button>
        } else if (this.props.userDetails.is_organisation) {
            cardButton = <EventEditModal eventDetails={this.props.details} userDetails={this.props.userDetails} />
        } else {
            cardButton = <DonateNowModal orgDetails={this.props.orgDetails} details={this.props.details} userDetails={this.props.userDetails} />
        }

        return (
            <Card>
                <CardMedia
                    image={imagePath}
                    title="Contemplative Reptile"
                    className={classes.cardImage}
                >
                </CardMedia>
                {/* card details */}
                <CardContent className={classes.cardDesc}>
                    <Typography variant="h5" component="h2">
                        {this.props.details.event_title}
                    </Typography>
                    <Typography variant="body2">

                        <Link onClick={this.redirectToOrgProfile}>
                            {this.props.orgDetails.name}
                        </Link>

                      

                            </Typography>
                    <Typography gutterBottom variant="body2">
                        {/* Expires On: {this.formatDate(this.props.details.expires_on)} */}
                        Date
                        </Typography>
                            
                        <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                        </Typography>
                    </CardContent>
                        {/* donated amount */}
                <CardContent>
                    <Typography>
                        ${received_amount} raised of ${goal_amount}
                    </Typography>
                    <LinearProgressWithLabel value={100 * received_amount / goal_amount} />
                </CardContent>
                <CardActions>
                    <Box display="flex" width="100%" alignItems="center">
                        <Box flexGrow={1}>
                            <LearnMoreComponent eventDetails={this.props.details}></LearnMoreComponent>
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

export default withStyles(styles)(EventCardAll);
