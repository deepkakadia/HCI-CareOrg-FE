import { Container, Typography, Button, DialogContentText, DialogActions } from '@material-ui/core'
import React, { Component } from 'react'

export class ConfirmPayment extends Component {

    //On handle close make axios request before using handleClose()
    render() {
        const { cardDetails, handleBack, orgDetails, eventDetails } = this.props
        return (
            <div>
                <Container>
                    {/* cvc: '',
                    expiry: '',
                    focus: '',
                    name: '',
                    number: '',
                    amount: '' */}

                    <DialogContentText>
                        <Typography variant="h5" color='primary'>Payment Details:</Typography>
                        <Typography variant='h6'>Name on Card: {cardDetails.name} </Typography>
                        <Typography variant='h6'>Card Number ending with: {"*" + cardDetails.number.substring(12, 16)} </Typography>
                        <Typography variant='h6'>Donation Amount: {cardDetails.amount} </Typography>
                    </DialogContentText>
                    <DialogContentText>
                        <Typography variant="h5" color="primary">Making a donation to:</Typography>
                        <Typography variant='h6'>Charity Organization name: {orgDetails.user_name} </Typography>
                        <Typography variant='h6'>Campaign name: {eventDetails.event_name} </Typography>
                    </DialogContentText>

                </Container>

                <DialogActions>
                    <Button
                        variant="contained" color="primary" onClick={handleBack}>
                        Back
                                </Button>
                    <Button
                        variant="contained" color="primary">
                        Pay now
                            </Button>

                </DialogActions>
            </div>
        )
    }
}

export default ConfirmPayment
