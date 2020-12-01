import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import HorizontalLabelPositionBelowStepper from './Stepper'
import './CardC.css'
import AmountValueDetail from './AmountValueDetail';
import ConfirmPayment from './ConfirmPayment';
import PaymentForm from './AddPaymentInformation'
//Dialog
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class DonateNowCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            StepCount: 0,
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            amount: ''


        }

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);


    }

    /**
     * Handles Next button action
     */
    handleNext() {
        this.setState({ StepCount: this.state.StepCount + 1 });
    };
    /**
     * Handles back button action
     */
    handleBack() {
        this.setState({ StepCount: this.state.StepCount - 1 });
    };
    /**
    * Handles back reset action
    */
    handleReset() {
        this.setState({ StepCount: 0 });
    };

    // Handle Field change
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }
    // This funciton handles modal toggle status
    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }


    render() {
        const { cvc,
            expiry,
            focus,
            name,
            number,
            amount } = this.state
        const cardDetails = {
            cvc: cvc,
            expiry: expiry,
            focus: focus,
            name: name,
            number: number,
            amount: amount
        }



        return (


            // // Main Card Component
            // <Card className="root" variant="outlined">

            //     <CardHeader title="Make A Donation"></CardHeader>
            //     {/* Card stepper */}
            //     <CardContent>
            //         <HorizontalLabelPositionBelowStepper stepCount={this.state.StepCount}></HorizontalLabelPositionBelowStepper>
            //         {/* {this.state.stepCount == 2 ? (<Typography>All steps completed</Typography>) : (<Typography >{getStepContent(this.state.StepCount)}</Typography>)} */}
            //     </CardContent>


            //     {/* Card dynamic Content */}
            //     <CardContent>
            //         {this.state.StepCount == 0 &&
            //             <AmountValueDetail stepCount={this.state.StepCount} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
            //         }
            //         {this.state.StepCount == 1 &&
            //             <PaymentForm stepCount={this.state.StepCount} handleBack={this.handleBack} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
            //         }
            //         {this.state.StepCount == 2 &&
            //             <ConfirmPayment stepCount={this.state.StepCount} handleBack={this.handleBack} cardDetails={cardDetails}></ConfirmPayment>
            //         }
            //     </CardContent>

            // </Card >



            //Dialog Component
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Donate Now
            </Button>

                <Dialog onClose={this.handleClickOpen} aria-labelledby="customized-dialog-title" open={this.state.modalOpen}>

                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickOpen}>
                        Make a Donation
                        <IconButton aria-label="close" onClick={this.handleClickOpen}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers>

                        <HorizontalLabelPositionBelowStepper stepCount={this.state.StepCount}></HorizontalLabelPositionBelowStepper>


                        {this.state.StepCount == 0 &&
                            <AmountValueDetail stepCount={this.state.StepCount} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
                        }
                        {this.state.StepCount == 1 &&
                            <PaymentForm stepCount={this.state.StepCount} handleBack={this.handleBack} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
                        }
                        {this.state.StepCount == 2 &&
                            <ConfirmPayment stepCount={this.state.StepCount} handleBack={this.handleBack} cardDetails={cardDetails}></ConfirmPayment>
                        }
                    </DialogContent>

                </Dialog>
            </div>

        );
    }
}
export default DonateNowCard;




