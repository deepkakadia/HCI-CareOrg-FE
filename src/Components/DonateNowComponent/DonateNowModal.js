import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import HorizontalLabelPositionBelowStepper from './Stepper'
import './CardC.css'
import AmountValueDetail from './AmountValueDetail';
import ConfirmPayment from './ConfirmPayment';
import PaymentForm from './AddPaymentInformation'
//Dialog
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



/**
 * props to be imported: 
 * organization name, Campaign name 
 * Still needs to be added
 * 
 */
class DonateNowModal extends Component {

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
        this.handleClickClose = this.handleClickClose.bind(this)
        this.baseState = this.state
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
        // this.setState({ StepCount: 0 });
        this.setState(this.baseState)

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
    //Handles Modal close toggle
    handleClickClose() {
        this.setState(this.baseState)
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
        const { details, orgDetails } = this.props



        return (

            //Dialog Component
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Donate Now
            </Button>

                <Dialog onClose={this.handleClickClose} open={this.state.modalOpen}
                    disableBackdropClick disableEscapeKeyDown aria-labelledby="Make a Donation">

                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickClose}>
                        Make a Donation
                        <IconButton aria-label="close" onClick={this.handleClickClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <HorizontalLabelPositionBelowStepper stepCount={this.state.StepCount}></HorizontalLabelPositionBelowStepper>
                        {this.state.StepCount === 0 &&
                            <AmountValueDetail eventDetails={details} orgDetails={orgDetails} stepCount={this.state.StepCount} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
                        }
                        {this.state.StepCount === 1 &&
                            <PaymentForm stepCount={this.state.StepCount} handleBack={this.handleBack} handleNext={this.handleNext} cardDetails={cardDetails} handleInputChange={this.handleInputChange} handleInputFocus={this.handleInputFocus} />
                        }
                        {this.state.StepCount === 2 &&
                            <ConfirmPayment orgDetails={orgDetails} eventDetails={details} stepCount={this.state.StepCount} handleBack={this.handleBack} cardDetails={cardDetails}></ConfirmPayment>
                        }
                    </DialogContent>

                </Dialog>
            </div>

        );
    }
}
export default DonateNowModal;




