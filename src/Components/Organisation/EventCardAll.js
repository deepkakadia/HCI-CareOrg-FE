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
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


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
    }


    //helper method
    formatDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString([], options);
    }

    redirectToOrgProfile = (event) => {
        event.preventDefault()
        const { history } = this.props
        console.log(history)
        history.push({
            pathname: "/org",
            state: {
                OrgId: this.props.orgDetails.id,
            }
        });
    }

    render() {
        const { classes } = this.props;
        console.log(this.props)
        const { goal_amount, received_amount } = this.props.details

        // shorten user description
        var desc = this.props.details.event_description
        if (desc.length > 75) {
            desc = desc.substring(0, 75) + "..."
        }

        // paceholder image
        const imagePath = this.props.details.campaign_image;

        var is_Expired = this.props.details;


        if (new Date() > new Date(this.props.details.expires_on)) {
            console.log("event expired")
            is_Expired = true
        }

        // setting the required button according to the "signed in user"
        var cardButton = null;
        if (is_Expired === true) {
            cardButton = <Button variant="contained" color="secondary" disabled>Expired</Button>
        } else if (this.props.userDetails.is_organisation) {
            cardButton = <EventEditModal eventDetails={this.props.details} userDetails={this.props.userDetails} />
        } else {
            cardButton = <DonateNowModal orgDetails={this.props.orgDetails} details={this.props.details} userDetails={this.props.userDetails} />
        }

        let donation_progress = Math.floor(1000 * received_amount / goal_amount) / 10;
        if (donation_progress > 100) {
            donation_progress = 100;
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

                        <form onSubmit={this.redirectToOrgProfile}>

                            <Button type="submit" variant="outlined" color ="primary"><Typography>{this.props.orgDetails.name}</Typography></Button>

                        </form>



                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Expires On: {this.formatDate(new Date(this.props.details.expires_on))}
                        {/* {console.log(this.props.details.expires_on)} */}
                        {/* date */}
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
                    {/* Math.floor(1000 * received_amount / goal_amount) / 10 */}
                    <LinearProgressWithLabel value={donation_progress} />
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
