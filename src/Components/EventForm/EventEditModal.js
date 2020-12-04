import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Container, InputAdornment
    , DialogContentText
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import axios from 'axios';
import refreshPage from '../../utils/refreshPage';

export default class EventEditModal extends Component {

    constructor(props) {
        super(props);

        const { eventDetails } = this.props
        this.state = {
            eventId: eventDetails.id,
            user_profile: eventDetails.user_profile,
            event_title: eventDetails.event_title,
            event_description: eventDetails.event_description,
            created_on: eventDetails.created_on,
            expires_on: eventDetails.expires_on,
            is_Expired: eventDetails.is_Expired,
            goal_amount: eventDetails.goal_amount,
            received_amount: eventDetails.received_amount,
            campaign_image: eventDetails.campaign_image,

            // Error Validation state
            modalOpen: false,
            titleError: false,
            event_descriptionError: false,
            expiry_onError: false,
            goal_amountError: false,
            deleteModalOpen: false

        }

        // Input Validation funcitons
        this.validateevent_title = this.validateevent_title.bind(this)
        this.validateevent_description = this.validateevent_description.bind(this)
        this.validateexpiry_on = this.validateexpiry_on.bind(this)
        this.hanldeEventImageUpload = this.hanldeEventImageUpload.bind(this)

        //Input onChange functions 
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)

        // Form Button functions
        this.handleOnSave = this.handleOnSave.bind(this)
        this.handleReset = this.handleReset.bind(this)

        //Event Edit Modal toggle
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);

        // Confirm Delete Modal toggle
        this.handleOnDelete = this.handleOnDelete.bind(this)
        this.handleDeleteModalToggle = this.handleDeleteModalToggle.bind(this)
    }

    /**
     *Toggles the delete confirmation modal
     */
    handleDeleteModalToggle() {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen })
    }

    /**
     * Handles delete confirmation 
     */
    handleOnDelete() {
        //Make axios delete call
        this.handleDeleteModalToggle()
        this.handleClickClose()
    }


    // This funciton handles modal toggle status
    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    /**
     * This function resets the state and handles close
     */
    handleClickClose() {
        this.setState({ modalOpen: !this.state.modalOpen });
        this.handleReset()
    }


    // this function handles createEvent submit button 
    async handleOnSave() {
        if (this.state.goal_amount.length == 0 || isNaN(this.state.goal_amount) || this.state.goal_amount <= 0) {
            this.setState({ goal_amountError: true })
        }
        if (this.state.event_title.length == 0 || typeof (this.state.event_title) != 'string') {
            this.setState({ titleError: true })
        }
        if (this.state.event_description.length == 0 || typeof (this.state.event_description) != 'string') {
            this.setState({ event_descriptionError: true })
        }
        else {
            let token = localStorage.getItem('token')

            try {
                let data = new FormData();


                data.append("id", this.state.eventId);
                data.append("user_profile", this.state.user_profile);
                data.append("event_title", this.state.event_title);
                data.append("event_description", this.state.event_description);
                data.append("created_on", this.state.created_on);
                data.append("expires_on", new Date(this.state.expires_on).toISOString().split('T')[0]);
                data.append("is_Expired", this.state.is_Expired);
                data.append("goal_amount", this.state.goal_amount);
                data.append("received_amount", this.state.received_amount);
                let file = this.state.campaign_image
                if (file) {
                    data.append('campaign_image', file, file.name);
                }
                let res = await axios.put(`http://localhost:8000/api/feed/${this.state.eventId}/`, data, {
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

            this.handleClickOpen()
            refreshPage()
            //Make axios call to PUT to backend using the current state
            //Check for if image uploaded
        }

    }

    //This funciton handle date change for expiry date
    validateexpiry_on = (e) => {
        this.setState({ expires_on: e.toString() })
    }

    /**
     * This function validates the goal amount
     * @param {event} e 
     */
    validateAmount = (e) => {
        if (e.target.value.length == 0 || isNaN(e.target.value) || e.target.value <= 0) {
            this.setState({ goal_amountError: true })

        }
        else {
            this.setState({ goal_amountError: false })

        }
        this.handleInputChange(e)
    }

    /**
     * Handles image upload 
     * @param {event} e 
     */
    hanldeEventImageUpload = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    //Validations Functions
    validateevent_title = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ titleError: true })
        }
        else {
            this.setState({ titleError: false })

        }
        this.handleInputChange(e)

    }
    validateevent_description = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ event_descriptionError: true })
        }
        else {
            this.setState({ event_descriptionError: false })

        }
        this.handleInputChange(e)
    }


    // Resets state to default previous values from props
    handleReset() {


        this.setState({
            event_title: this.props.eventDetails.event_title,
            event_description: this.props.eventDetails.event_description,
            goal_amount: this.props.eventDetails.goal_amount,
            expires_on: this.props.eventDetails.expires_on,
            campaign_image: this.props.eventDetails.campaign_image,
        })

    }

    // Handle Field change
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                campaign_image: img
            });
        }
    };

    render() {
        return (
            <div>
                {/* Modal Toggle Button */}
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Edit
                </Button>

                {/* Edit Modal */}
                <Dialog onClose={this.handleClickClose} aria-labelledby="customized-dialog-title" open={this.state.modalOpen} disableBackdropClick disableEscapeKeyDown>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickClose}>
                        Edit Campaign
                         <IconButton aria-label="close" onClick={this.handleClickOpen} align="right">
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <form>
                            <Container>
                                <Grid container direction={'column'} spacing={3} >

                                    <Grid item >
                                        <TextField
                                            label="Campaign Name"
                                            error={this.state.titleError}
                                            type="text"
                                            name="event_title"
                                            value={this.state.event_title}
                                            onChange={this.validateevent_title}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>



                                    <Grid item>
                                        <TextField
                                            label="Campaign Description"
                                            error={this.state.event_descriptionError}
                                            type="text"
                                            multiline={true}
                                            name="event_description"
                                            value={this.state.event_description}
                                            onChange={this.validateevent_description}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                    </Grid>


                                    <Grid item width={25}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="startDate"
                                                format="MM/dd/yyyy"
                                                margin="dense"
                                                readOnly={true}
                                                disabled={true}
                                                label="Campaign start date"
                                                value={this.state.created_on}
                                                onFocus={this.handleInputFocus}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                keyboardIcon={<div></div>}
                                                helperText="Campaign Start date cannot be changed"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item width="25%">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="expiry_on"
                                                format="MM/dd/yyyy"
                                                margin="dense"

                                                label="Campaign expiry date"
                                                value={this.state.expires_on}
                                                onChange={this.validateexpiry_on}
                                                onFocus={this.handleInputFocus}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputAdornmentProps={{ position: 'start' }}
                                                minDate={new Date().setDate(new Date().getDate() + 1)}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item >
                                        <TextField
                                            error={this.state.goal_amountError}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            label="Goal Amount"
                                            type='tel'
                                            name='goal_amount'
                                            value={this.state.goal_amount}
                                            onChange={this.validateAmount}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item>
                                        <input type="file" name="campaign_image" onChange={this.onImageChange} />
                                    </Grid>

                                </Grid>
                            </Container>
                        </form>

                    </DialogContent>

                    <DialogActions>

                        <Button color="secondary" onClick={this.handleDeleteModalToggle}>Delete</Button>

                        <Button autoFocus onClick={this.handleReset} color="default">
                            Reset
                                </Button>


                        <Button autoFocus onClick={this.handleOnSave} color="primary" disabled={this.state.event_descriptionError || this.state.expiry_onError || this.state.goal_amountError}>
                            Save
                                </Button>


                    </DialogActions>
                </Dialog>



                {/* Delete Confirmation Modal */}


                <Dialog
                    open={this.state.deleteModalOpen}
                    onClose={this.handleDeleteModalToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete Campaign</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete {this.state.event_title}?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteModalToggle} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOnDelete} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        )
    }
}




