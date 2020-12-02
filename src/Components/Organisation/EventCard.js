import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

class EventCard extends Component {
    render() {

        const { goal_amount, received_amount } = this.props.details
        var desc = this.props.details.event_description
        if (desc.length > 150) {
            desc = desc.substring(0, 100) + "..."
        }
        return (
            <Card>
                <CardMedia
                    //give style to image
                    image="./contemplating.jpg"
                    title="Contemplative Reptile"
                    style={{ objectFit: 'fill', height: '200px' }}
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.details.event_title}
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
                            <Button size="small" color="primary"> Learn More </Button>
                        </Box>
                        <Box textAlign="center">
                            {
                                this.props.userDetails.is_organisation
                                    ? <Button Button variant="contained" color="primary"> Edit </Button>
                                    : <Button Button variant="contained" color="secondary"> Donate </Button>
                            }
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
