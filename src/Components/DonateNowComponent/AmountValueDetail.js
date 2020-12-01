import React, { Component } from 'react'
import { Typography, Grid, Box, Container, CardActions, Button } from '@material-ui/core';
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
        if (cardDetails.amount.length == 0 || isNaN(cardDetails.amount) || cardDetails.amount < 0) {
            this.setState({ cardError: true })
        }
        else {
            this.props.handleNext()
        }

    }

    //Card Number Validation
    validateAmount = (e) => {
        if (e.target.value.length == 0 || isNaN(e.target.value) || e.target.value <= 0) {
            this.setState({ cardError: true })
        }
        else {
            this.setState({ cardError: false })

        }
        this.props.handleInputChange(e)
    }

    render() {
        const { stepCount, handleNext } = this.props
        return (
            <div>
                <form>
                    <Container >

                        <Grid container className='App-form' direction={'column'} justify='center' spacing={3}>
                            <Grid item xs={12}>

                                <Typography variant="h5"> I want to donate Redcross foundation </Typography>

                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={this.state.cardError}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    type='tel'
                                    name='amount'
                                    placeholder='Enter Donation Amount'
                                    value={this.props.cardDetails.amount}
                                    onChange={this.validateAmount}
                                    onFocus={this.props.handleInputFocus}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5"> To support Covid-19 relief fund </Typography>
                            </Grid>
                        </Grid>




                        {/* Next Stepper Button */}
                        <Grid container justify='center' className="App-form1" spacing={2}>
                            <Grid item xs={2}>
                                <Button
                                    disabled={this.state.cardError}
                                    variant="contained" color="primary" onClick={this.handleSubmit}>
                                    Next
                                </Button>

                            </Grid>
                        </Grid>

                    </Container>
                </form>

            </div>

        )
    }
}


export default AmountValueDetail
