import React from 'react'
import DonateNowModal from './DonateNowModal'
import { Grid, Container } from '@material-ui/core'



function ModalHome2() {

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

                    </Grid>
                    <Grid item xs={2}>
                        <DonateNowModal></DonateNowModal>
                    </Grid>


                </Grid>
            </Container>
        </div>
    )
}

export default ModalHome2;
