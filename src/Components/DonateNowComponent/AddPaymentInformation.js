import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import './payment.css'
import 'react-credit-cards/es/styles-compiled.css';
import { TextField, Grid, Container, Button } from '@material-ui/core';
export default class PaymentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cardError: false,
            cardNameError: false,
            cardExpiryError: false,
            cardCVCError: false
        }

        this.validateCardNumber = this.validateCardNumber.bind(this)
        this.validateCardName = this.validateCardName.bind(this)
        this.validateCardExpiry = this.validateCardExpiry.bind(this)
        this.validateCardCVC = this.validateCardCVC.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    /**
     * This function handles the next button disabled prop validation
     */
    handleSubmit() {
        const { cardDetails } = this.props
        if (cardDetails.cvc.length !== 3 || cardDetails.cvc < 0 || isNaN(cardDetails.cvc)) {
            this.setState({ cardCVCError: true })

        }
        if (cardDetails.number.length !== 16 || cardDetails.number < 0 || isNaN(cardDetails.number)) {
            this.setState({ cardError: true })

        }
        if (cardDetails.name.length < 2 || cardDetails.name.length > 26 || typeof (cardDetails.name) != 'string' || !this.validate(cardDetails.name)) {
            this.setState({ cardNameError: true })

        }

        if (cardDetails.expiry.length !== 4 || cardDetails.expiry < 0 || isNaN(cardDetails.expiry)) {
            this.setState({ cardExpiryError: true })

        }
        else {
            let valueStr = cardDetails.expiry;
            let month = parseInt(valueStr.substring(0, 2));
            let year = parseInt("20" + valueStr.substring(2, 4));
            if (valueStr.substring(0, 2) < 1 || valueStr.substring(0, 2) > 12) {
                this.setState({ cardExpiryError: true })

            }
            var today, someday;
            today = new Date();
            someday = new Date();
            someday.setFullYear(year, month, 1);
            if (someday <= today) {
                this.setState({ cardExpiryError: true })
                return
            }
            else {
                // add submit logic
                this.props.handleNext()

            }
        }
    }

    //Card CVC number Validation
    validateCardCVC = (e) => {
        if (e.target.value.length !== 3 || e.target.value < 0 || isNaN(e.target.value)) {
            this.setState({ cardCVCError: true })
        }
        else {
            this.setState({ cardCVCError: false })

        }
        this.props.handleInputChange(e)
    }

    //Card Expiry month Validation
    validateCardExpiry = (e) => {

        if (e.target.value.length !== 4 || e.target.value < 0 || isNaN(e.target.value)) {
            this.setState({ cardExpiryError: true })
        }
        let valueStr = e.target.value;
        let month = parseInt(valueStr.substring(0, 2));
        let year = parseInt("20" + valueStr.substring(2, 4));
        if (valueStr.substring(0, 2) < 1 || valueStr.substring(0, 2) > 12) {
            this.setState({ cardExpiryError: true })
        }
        var today, someday;
        today = new Date();
        someday = new Date();
        someday.setFullYear(year, month, 1);
        if (someday <= today) {
            this.setState({ cardExpiryError: true })
        }
        else {
            this.setState({ cardExpiryError: false })
        }
        this.props.handleInputChange(e)
    }

    //Card Number Validation
    validateCardNumber = (e) => {
        if (e.target.value.length !== 16 || e.target.value < 0 || isNaN(e.target.value)) {
            this.setState({ cardError: true })
        }
        else {
            this.setState({ cardError: false })

        }
        this.props.handleInputChange(e)
    }

    //Card name regex function 
    validate(name) {
        var regex = /^[a-zA-Z ]{2,30}$/;
        return regex.test(name);
    }

    //Card Name Validation
    validateCardName = (e) => {
        if (e.target.value.length < 2 || e.target.value.length > 26 || typeof (e.target.value) != 'string' || !this.validate(e.target.value)) {
            this.setState({ cardNameError: true })
        }
        else {
            this.setState({ cardNameError: false })

        }
        this.props.handleInputChange(e)
    }

    render() {
        const { cardDetails, handleInputFocus, handleBack } = this.props
        return (
            <div className='App'>
                <Cards
                    cvc={cardDetails.cvc}
                    expiry={cardDetails.expiry}
                    focused={cardDetails.focus}
                    name={cardDetails.name}
                    number={cardDetails.number}
                />
                <form>
                    <Container className='App-form'>
                        <Grid container spacing={3} justify='center'>
                            <Grid item size={6} width="50%">

                                <TextField
                                    error={this.state.cardError}
                                    type="tel"
                                    name="number"
                                    label="Card Number"
                                    placeholder="Card Number"
                                    value={cardDetails.number}
                                    onChange={this.validateCardNumber}
                                    onFocus={handleInputFocus}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>


                            <Grid item size={6} width="50%">
                                <TextField
                                    error={this.state.cardNameError}
                                    type='text'
                                    name='name'
                                    label='Name of Card Holder'
                                    placeholder='Name'
                                    value={cardDetails.name}
                                    onChange={this.validateCardName}
                                    onFocus={handleInputFocus}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>


                            <Grid item size={6} width="50%">
                                <TextField
                                    error={this.state.cardExpiryError}
                                    type='text'
                                    name='expiry'
                                    placeholder='MMYY Expiry'
                                    label='Expiry'
                                    value={cardDetails.expiry}
                                    onChange={this.validateCardExpiry}
                                    onFocus={handleInputFocus}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>


                            <Grid item size={6} width="50%">
                                <TextField
                                    error={this.state.cardCVCError}
                                    type='tel'
                                    name='cvc'
                                    placeholder='CVC'
                                    label='CVC'
                                    value={cardDetails.cvc}
                                    onChange={this.validateCardCVC}
                                    onFocus={handleInputFocus}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>


                            {/* Next Stepper Button */}
                            <Grid container justify='center' className="App-form1" spacing={2}>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained" color="primary" onClick={handleBack}>
                                        Back
                                </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        disabled={(this.state.cardError || this.state.cardNameError || this.state.cardExpiryError || this.state.cardCVCError)}
                                        variant="contained" color="primary" onClick={this.handleSubmit}>
                                        Next
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Container>
                </form >
            </div >
        );
    }
}