import { Container, Typography, Grid, Button } from '@material-ui/core'
import React, { Component } from 'react'

export class ConfirmPayment extends Component {
    render() {
        const { cardDetails, handleBack } = this.props
        return (
            <div>
                <Container>

                    <Typography>Confirm Payment Details</Typography>
                    <Typography>{cardDetails.cvc}</Typography>
                    <Typography>{cardDetails.expiry}</Typography>
                    <Typography>{cardDetails.focus}</Typography>
                    <Typography>{cardDetails.name}</Typography>
                    <Typography>{cardDetails.number}</Typography>
                    <Typography>{cardDetails.amount}</Typography>

                    {/* Next Stepper Button */}
                    <Grid container justify='center'>
                        <Grid item xs={2}>
                            <Button
                                variant="contained" color="primary" onClick={handleBack}>
                                Back
                                </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant="contained" color="primary">
                                Pay now
                                </Button>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        )
    }
}

export default ConfirmPayment
