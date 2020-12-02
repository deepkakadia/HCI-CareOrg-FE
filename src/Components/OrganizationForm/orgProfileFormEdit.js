import React, { Component } from 'react'
import {
    Grid, Container, Button, TextField, FormControl, NativeSelect, Select, InputLabel,
    FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import country_list from './countrList'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export class OrgProfileFormEdit extends Component {

    constructor(props) {
        super(props);

        //Props for existing org details
        const { orgDetails } = this.props

        this.state = {
            //Event details state
            user_name: orgDetails.user_name,
            description: orgDetails.description,
            location: orgDetails.location,
            industry: orgDetails.industry,
            org_image: '',

            //Snackbar toggle state
            open: false,

            //Edit org profile modal toggle state
            modalOpen: false,

            //Validation Error State
            descriptionError: false,
            locationError: false,
            industryError: false

        }
        //Used to reset the state of the form
        this.baseState = this.state

        //Handles input validation 
        this.validatedescription = this.validatedescription.bind(this)
        this.validatelocation = this.validatelocation.bind(this)
        this.industry = this.industry.bind(this)

        //Hanlde on save button click
        this.handleOnSave = this.handleOnSave.bind(this)


        //Handles input on change
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)

        //Handles edit profile modal toggle
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.hanldeClickClose = this.hanldeClickClose.bind(this)


        //Handles Snackbar open toggle
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)



    }

    // This funciton handles modal toggle status
    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    /**
     *This function handles modal close toggle and resets state 
     */
    hanldeClickClose() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }


    /**
     * Handles Snack bar close toogle
     * 
     */
    handleClose() {
        this.setState({ open: false })
    }
    /**
     * Handles Snack bar open toogle
     */
    handleOpen() {
        this.setState({ open: true })
    }

    /**
     * Handles the save button for the Evemt form
     *
     */
    handleOnSave() {
        if (this.state.description.length === 0 || typeof (this.state.description) != 'string') {
            this.setState({ descriptionError: true })
        }
        if (this.state.location === 0 || typeof (this.state.location) != 'string') {
            this.setState({ locationError: true })
        }
        if (this.state.industry.length === 0 || typeof (this.state.industry) != 'string') {
            this.setState({ industryError: true })
        }
        else {

            this.handleOpen()
            this.hanldeClickClose()
            //Make axios call to post to backend
            //Upload event image 


        }

    }

    /**
     * Validates org description
     * @param {event} e 
     */
    validatedescription = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ descriptionError: true })
        }
        else {
            this.setState({ descriptionError: false })

        }
        this.handleInputChange(e)
    }



    /**
     * Validates org location
     * @param {event} e
     */
    validatelocation = (e) => {
        console.log(e.target.value)
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ locationError: true })
        }
        else {
            this.setState({ locationError: false })

        }
        this.handleInputChange(e)
    }

    /**
    * Validates org Industry
    * @param {event} e
    */
    industry = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ industryError: true })
        }
        else {
            this.setState({ industryError: false })

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
                    Edit Profile
                </Button>

                <Dialog onClose={this.hanldeClickClose} aria-labelledby="Edit-Profile" open={this.state.modalOpen} disableBackdropClick disableEscapeKeyDown>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickOpen}>
                        Edit Profile
                         <IconButton aria-label="close" onClick={this.hanldeClickClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Container className="app">

                            <Grid container direction="column" justify="center" alignContent="center" spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Organization Description"
                                        error={this.state.descriptionError}
                                        type="text"
                                        multiline={true}
                                        name="description"
                                        placeholder="Describe your organization"
                                        value={this.state.description}
                                        onChange={this.validatedescription}
                                        onFocus={this.handleInputFocus}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />


                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        error={this.state.industryError}
                                        type='text'
                                        name='industry'
                                        label='Industry'
                                        placeholder='Name the Industry'
                                        value={this.state.industry}
                                        onChange={this.industry}
                                        onFocus={this.handleInputFocus}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    {/* <FormControl inputVariant="outlined" error={this.state.locationError}>
                                        <NativeSelect
                                            error={this.locationError}
                                            label="Select Country"
                                            value={this.state.location}
                                            name="location"
                                            onChange={this.validatelocation}
                                            inputProps={{ 'aria-label': 'age' }}>
                                            <option value=''>
                                                -
                                            </option>
                                            {country_list().map(({ value, label }, index) =>
                                                <option value={value}>{label}</option>
                                            )}



                                        </NativeSelect>

                                    </FormControl>
                                    <FormHelperText>Select Country</FormHelperText> */}

                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="outlined-age-native-simple">Select Country</InputLabel>
                                        <Select
                                            native
                                            error={this.locationError}
                                            label="Select Country"
                                            value={this.state.location}
                                            name="location"
                                            onChange={this.validatelocation}
                                            inputProps={{ 'aria-label': 'age' }}>
                                            <option value=''>
                                                -
                                            </option>
                                            {country_list().map(({ value, label }, index) =>
                                                <option value={value}>{label}</option>
                                            )}
                                        </Select>
                                    </FormControl>



                                </Grid>

                                <Grid item>
                                    <TextField
                                        type="file"
                                        label="Upload an image"
                                        name='org_image'
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
                                        helperText="Upload png or jpeg only"
                                    >
                                    </TextField>
                                </Grid>



                            </Grid>




                        </Container>
                    </DialogContent>
                    <DialogActions>

                        <Button color="primary" onClick={this.hanldeClickClose}>
                            Cancel
                        </Button>

                        <Button color="primary"
                            error={this.state.descriptionError || this.state.industryError || this.state.locationError}
                            onClick={this.handleOnSave}>
                            Save
                        </Button>

                    </DialogActions>
                </Dialog>

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
                    <MuiAlert onClose={this.handleClose} severity="success">
                        Profile successfully updated
                </MuiAlert>
                </Snackbar >

            </div >
        )
    }
}

export default OrgProfileFormEdit
