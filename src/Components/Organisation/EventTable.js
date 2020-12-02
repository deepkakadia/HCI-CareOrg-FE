import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EventCard from "./EventCard";
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
        // pagination method
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
                    <Grid container justify="left" style={{ padding: "10px" }}>
                        <Box width="100%">
                            <Typography variant="h4">
                                Campaigns
                            </Typography>
                            <Divider />
                        </Box>

                    </Grid>
                    {eventArray.map(x => (
                        <Grid item xs={12} sm={6} md={4} key={x.id}>
                            <EventCard details={x} userDetails={this.props.userDetails} orgDetails={this.props.orgDetails} />
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