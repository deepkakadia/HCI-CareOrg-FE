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
            event_title: '',
            event_description: '',
            goal_amount: '',
            created_on: new Date(2020, 9, 1),
            expires_on: new Date().setDate(new Date().getDate() + 1),
            event_image: '',

            // Form Validation state
            titleError: false,
            descriptionError: false,
            expires_onError: false,
            goal_amountError: false,


        }

        //Stores the initial state used for resetting 
        this.baseState = this.state

        // Input Validation functions
        this.validateevent_title = this.validateevent_title.bind(this)
        this.validateevent_description = this.validateevent_description.bind(this)
        this.validateexpires_on = this.validateexpires_on.bind(this)

        // Input onChange functions
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)

        //Event Create Modal Toggle
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.hanldeClickClose = this.hanldeClickClose.bind(this)
        this.handleOnCreate = this.handleOnCreate.bind(this)

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
    handleOnCreate() {
        if (this.state.goal_amount.length == 0 || isNaN(this.state.goal_amount) || this.state.goal_amount <= 0) {
            this.setState({ goal_amountError: true })
        }
        if (this.state.event_title.length == 0 || typeof (this.state.event_title) != 'string') {
            this.setState({ titleError: true })
        }
        if (this.state.event_description.length == 0 || typeof (this.state.event_description) != 'string') {
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
    validateexpires_on = (e) => {
        this.setState({ expires_on: e })
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
    validateevent_title = (e) => {
        if (e.target.value.length == 0 || typeof (e.target.value) != 'string') {
            this.setState({ titleError: true })
        }
        else {
            this.setState({ titleError: false })

        }
        this.handleInputChange(e)
    }
    validateevent_description = (e) => {
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
                    Create New Campaign
                </Button>
                <Dialog onClose={this.hanldeClickClose} aria-labelledby="customized-dialog-title" open={this.state.modalOpen} disableBackdropClick disableEscapeKeyDown>
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
                                            name="event_title"
                                            value={this.state.event_title}
                                            onChange={this.validateevent_title}
                                            onFocus={this.handleInputFocus}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            helperText={this.state.titleError && "Please Enter a valid name"}
                                            required
                                        />
                                    </Grid>



                                    <Grid item>
                                        <TextField
                                            label="Campaign Description"
                                            error={this.state.descriptionError}
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
                                            required
                                        />
                                    </Grid>


                                    <Grid item>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="created_on"
                                                format="MM/dd/yyyy"
                                                margin="dense"
                                                readOnly={true}
                                                disabled={true}
                                                label="Campaign Start Date"
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

                                    <Grid item>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                name="expires_on"
                                                format="MM/dd/yyyy"
                                                margin="dense"

                                                label="Campaign End Date"
                                                value={this.state.expires_on}
                                                onChange={this.validateexpires_on}
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
                                            helperText="Upload .png or .jpeg format only"
                                        >
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </Container>
                        </form>






                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={this.handleOnCreate} color="primary" disabled={this.state.descriptionError || this.state.expires_onError || this.state.goal_amountError}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}


