import { Container, Typography, Button, DialogContentText, DialogActions } from '@material-ui/core'
import React, { Component } from 'react'
import axios from 'axios';
import Confetti from '../../utils/Confetti';
import refreshPage from '../../utils/refreshPage'
import ConfettiDonation from '../../utils/ConfettiDonation';

export class ConfirmPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            confettiState: false,

        }
        this.handlePayNow = this.handlePayNow.bind(this);
        this.formatDate = this.formatDate.bind(this);

    }


    componentDidMount() {

        this.setState({
            confettiState: true
        })
        setTimeout(() => {
            this.setState({ confettiState: false })
        }, 5000);
    }

    //helper method
    formatDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString([], options);
    }

    async handlePayNow(e) {
        e.preventDefault()
        let token = localStorage.getItem('token')

        try {
            let data = new FormData();



            data.append("id", this.props.eventDetails.id);
            data.append("user_profile", this.props.eventDetails.user_profile);
            data.append("event_title", this.props.eventDetails.event_title);
            data.append("event_description", this.props.eventDetails.event_description);
            data.append("created_on", this.props.eventDetails.created_on);
            data.append("expires_on", new Date(this.props.eventDetails.expires_on).toISOString().split('T')[0]);
            data.append("is_Expired", this.props.eventDetails.is_Expired);
            data.append("goal_amount", this.props.eventDetails.goal_amount);
            data.append("received_amount", this.props.eventDetails.received_amount + parseInt(this.props.cardDetails.amount));
            let file = this.props.eventDetails.campaign_image
            if (file && typeof (file) != "string") {
                data.append('campaign_image', file, file.name);
            }
            let res = await axios.put(`http://localhost:8000/api/feed/${this.props.eventDetails.id}/`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            console.log(res.data)

        } catch (e) {
            console.log(e)
        }

        try {
            let data = new FormData();

            // data.append("id", this.state.eventId);
            // data.append("user_profile", this.state.user_profile);
            data.append("user_profile", localStorage.getItem('userid'));
            data.append("event_id", this.props.eventDetails.id);
            data.append("date", new Date().toISOString().split('T')[0]);
            data.append("amount_donated", this.props.cardDetails.amount);
            let res = await axios.post(`http://localhost:8000/api/history/`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })

        } catch (e) {
            console.log(e)
        }


        //set confetti state here 

        this.props.handleClickOpen()
        refreshPage()





    }

    //On handle close make axios request before using handleClose()
    render() {
        const { cardDetails, handleBack, orgDetails, eventDetails } = this.props
        return (
            <div>
                {this.state.confettiState && <ConfettiDonation />}

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
                        <Typography variant='h6'>Charity Organization name: {orgDetails.name} </Typography>
                        <Typography variant='h6'>Campaign name: {eventDetails.event_title} </Typography>
                    </DialogContentText>

                </Container>

                <DialogActions>
                    <Button
                        variant="contained" color="primary" onClick={handleBack}>
                        Back
                                </Button>
                    <Button
                        variant="contained" onClick={this.handlePayNow} color="primary">
                        Pay now
                            </Button>

                </DialogActions>
            </div>
        )
    }
}

export default ConfirmPayment
