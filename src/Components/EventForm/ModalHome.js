import React from 'react'
import EventCreateModal from './EventCreateModal';
import EventEditModal from './EventEditModal';
import { Grid, Container } from '@material-ui/core'


function ModalHome() {

    let eventDetails = {
        eventTitle: 'Tsunami Releif',
        eventDescription: 'to fund the homless and repairs',
        expiryDate: new Date().setDate(new Date().getDate() + 1),
        goal_amount: '100',
        start_Date: new Date()

    }

    return (
        <div>
            <Container>
                <Grid container direction={'row'} spacing={3}>

                    <Grid item xs={2}>
                        <EventCreateModal></EventCreateModal>
                    </Grid>
                    <Grid item xs={2}>
                        <EventEditModal eventDetails={eventDetails}></EventEditModal>
                    </Grid>


                </Grid>
            </Container>
        </div>
    )
}

export default ModalHome;
