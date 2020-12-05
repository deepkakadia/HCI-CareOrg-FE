import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import EventCard from "./EventCard";
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import EventCreateModal from "../EventForm/EventCreateModal";

class EventTable extends Component {
    constructor(props) {
        super(props);
        var len = this.props.feedItems.length
        var count = 1;
        if (len > 6) {
            count += Math.floor(len / 6);
        }
        this.state = {
            page: 1,
            pageCount: count
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
        );
    }

    render() {
        var eventArray = this.props.feedItems;
        eventArray = eventArray.slice((this.state.page - 1) * 6, (this.state.page * 6));
        return (
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid container justify="center" style={{ padding: "10px" }}>
                        <Box width="100%" textAlign="center">
                            <Typography variant="h4" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                Campaigns
                            </Typography>
                        </Box>
                        {
                            this.props.userDetails.is_organisation &&
                            <Box textAlign="center">
                                <EventCreateModal userDetails={this.props.userDetails} />
                            </Box>
                        }
                    </Grid>
                    {eventArray.map(x => (
                        <Grid item xs={12} sm={6} md={4} key={x.id}>
                            <EventCard eventDetails={x}
                                userDetails={this.props.userDetails}
                                profileDetails={this.props.orgDetails}
                                loggedInUser={this.props.userDetails}
                            />
                        </Grid>
                    ))}
                    <Grid container justify="center" style={{ padding: "10px" }}>
                        <Pagination
                            defaultPage={1}
                            page={this.state.page}
                            color="primary"
                            count={this.state.pageCount}
                            onChange={this.handlePageChange}
                        />
                    </Grid>
                </Grid>
            </Container>

        )
    }

}

export default EventTable;