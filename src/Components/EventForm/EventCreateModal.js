import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Container, InputAdornment, Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

export default class EventCreateModal extends Component {



    constructor(props) {
        super(props);


        this.state = {
            modalOpen: false,
            eventTitle: '',
            eventDescription: '',
            expiryDate: new Date().setDate(new Date().getDate() + 1),
            goal_amount: '',
            start_date: new Date(),
            titleError: false,
            descriptionError: false,
            expiryDateError: false,
            goal_amountError: false,
            event_image: ''

        }
        this.baseState = this.state
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.hanldeSubmit = this.hanldeSubmit.bind(this)
        this.validateEventTitle = this.validateEventTitle.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.validateEventDescription = this.validateEventDescription.bind(this)
        this.validateExpiryDate = this.validateExpiryDate.bind(this)
        this.hanldeClickClose = this.hanldeClickClose.bind(this)
    }

    // This funciton handles modal toggle status
    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    /**
     *This function handles modal close toggle and resets state 
     */
    hanldeClickClose() {
        this.setState(this.baseState)
    }

    /**
     * Handles the Create button for the Evemt form
     *
     */
    hanldeSubmit() {
        if (this.state.goal_amount.length == 0 || isNaN(this.state.goal_amount) || this.state.goal_amount <= 0) {
            this.setState({ goal_amountError: true })
        }
        if (this.state.eventTitle.length == 0 || typeof (this.state.eventTitle) != 'string') {
            this.setState({ titleError: true })
        }
        if (this.state.eventDescription.length == 0 || typeof (this.state.eventDescription) != 'string') {
            this.setState({ descriptionError: true })
        }
        else {

            //On handle close make axios request before using handleClose()
            //Make axios call to post to backend
            //Upload event image 

            this.hanldeClickClose();
        }

    }

    //This funciton handle date change for expiry date
    validateExpiryDate = (e) => {
        this.setState({ expiryDate: e })
    }

    validateAmount = (e) => {
        if (e.target.value.length == 0 || isNaN(e.target.value) || e.target.value <= 0) {
            this.setState({ goal_amountError: true })
        }
        else {
            this.setState({ goal_amountError: false })

        }
        this.handleInputChange(e)
    }

    //Validations Functions
    validateEventTitle = (e) => {
        if (e.target.value.length == 0 || typeof (e.target.value) != 'string') {
            this.setState({ titleError: true })
        }
        else {
            this.setState({ titleError: false })

        }
        this.handleInputChange(e)
    }
    validateEventDescription = (e) => {
        if (e.target.value.length == 0 || typeof (e.target.value) != 'string') {
            this.setState({ descriptionError: true })
        }
        else {
            this.setState({ descriptionError: false })

        }
        this.handleInputChange(e)
    }



    // Handle Field change
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }


    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create Event
                </Button>
                <Dialog onClose={this.hanldeClickClose} aria-labelledby="customized-dialog-title" open={this.state.modalOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickOpen}>
                        Create New Campaign
                         <IconButton aria-label="close" onClick={this.hanldeClickClose}>
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
                                            name="eventTitle"
                                            placeholder="Campaign Name"
                                            value={this.state.eventTitle}
                                            onChange={this.validateEventTitle}
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
                                            error={this.state.descriptionError}
                                            type="text"
                                            multiline={true}
                                            name="eventDescription"
                                            placeholder="Campaign Description"
                                            value={this.state.eventDescription}
                                            onChange={this.validateEventDescription}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                    </Grid>


                                    <Grid item>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="startDate"
                                                format="MM/dd/yyyy"
                                                margin="dense"
                                                readOnly={true}
                                                disabled={true}
                                                label="Campaign start date"
                                                value={this.state.start_date}
                                                onFocus={this.handleInputFocus}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    <Grid item>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="expiryDate"
                                                format="MM/dd/yyyy"
                                                margin="dense"

                                                label="Campaign expiry date"
                                                value={this.state.expiryDate}
                                                onChange={this.validateExpiryDate}
                                                onFocus={this.handleInputFocus}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
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
                                            placeholder='Enter Goal Amount'
                                            value={this.state.goal_amount}
                                            onChange={this.validateAmount}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            type="file"
                                            label="Upload an image"
                                            name='event_image'
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={
                                                {
                                                    accept: "image/png, image/jpeg"
                                                }
                                            }
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                            helperText="png or jpeg only"
                                        >
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </Container>
                        </form>






                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={this.hanldeSubmit} color="primary" disabled={this.state.descriptionError || this.state.expiryDateError || this.state.goal_amountError}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}


