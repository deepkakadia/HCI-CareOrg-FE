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
import LearnMoreComponent from './LearnMoreComponent'
import Fab from '@material-ui/core/Fab';
import { Divider } from "@material-ui/core";

class EventCard extends Component {
    constructor(props) {
        super(props)

        //this.getCardButton = this.getCardButton.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }


    formatDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString([], options);
    }

    render() {

        const { goal_amount, received_amount, is_Expired } = this.props.details

        var desc = this.props.details.event_description
        if (desc.length > 150) {
            desc = desc.substring(0, 100) + "..."
        }
        const imagePath = `/CampaignPhotos/camp_${this.props.details.id}.jpg`;

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
                    //give style to image
                    image={imagePath}
                    title="Contemplative Reptile"
                    style={{ objectFit: 'fill', height: '200px' }}
                >
                </CardMedia>
                <CardContent>

                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.details.event_title}
                    </Typography>
                    <Typography variant="body2">
                        {this.props.orgDetails.user_name}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Expires On: {this.formatDate(this.props.details.expires_on)}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                    </Typography>
                </CardContent>
                <CardContent>
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

export default EventCard;
