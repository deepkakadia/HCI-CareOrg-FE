import React, { Component } from 'react'
import { Typography, Grid, Container, Button, DialogContentText, DialogActions } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core'
import './CardC.css'
export class AmountValueDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            cardError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        const { cardDetails } = this.props
        if (cardDetails.amount.length === 0 || isNaN(cardDetails.amount) || cardDetails.amount < 0) {
            this.setState({ cardError: true })
        }
        else {
            this.props.handleNext()
        }

    }

    //Card Number Validation
    validateAmount = (e) => {
        if (e.target.value.length === 0 || isNaN(e.target.value) || e.target.value <= 0) {
            this.setState({ cardError: true })
        }
        else {
            this.setState({ cardError: false })

        }
        this.props.handleInputChange(e)
    }

    render() {
        const { eventDetails, orgDetails } = this.props
        return (
            <div>



                <Container >

                    <Grid container className='App-form' direction={'column'} justify='center' spacing={3}>
                        <Grid item xs={12}>
                            <DialogContentText>
                                <Typography variant="h4">I want to donate to {orgDetails.name}</Typography>
                            </DialogContentText>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={this.state.cardError}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                type='tel'
                                name='amount'
                                label="Donation Amount"
                                id="Donation Amount"
                                placeholder='Enter Donation Amount'
                                value={this.props.cardDetails.amount}
                                onChange={this.validateAmount}
                                onFocus={this.props.handleInputFocus}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DialogContentText>
                                <Typography variant="h4"> and support {eventDetails.event_title} </Typography>
                            </DialogContentText>
                        </Grid>
                    </Grid>

                </Container>





                {/* Next Stepper Button */}
                <DialogActions >
                    <Button
                        disabled={this.state.cardError}
                        variant="contained" color="primary" onClick={this.handleSubmit}>
                        Next
                     </Button>
                </DialogActions>



            </div>

        )
    }
}


export default AmountValueDetail
