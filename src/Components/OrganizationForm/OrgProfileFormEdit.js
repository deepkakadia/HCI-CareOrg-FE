import React, { Component } from 'react'
import {
    Grid, Container, Button, TextField, FormControl, Select, InputLabel,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import country_list from './countrList'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import refreshPage from '../../utils/refreshPage';

export class OrgProfileFormEdit extends Component {

    constructor(props) {
        super(props);
        //Props for existing org details
        const { profileDetails } = this.props

        this.state = {
            //Event details state
            profileDetails_id: this.props.profileDetails.id,
            user_profile: this.props.userDetails.id,
            description: profileDetails.description,
            location: profileDetails.location,
            industry: profileDetails.industry,
            profile_image: null,
            updateCalled: false,

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
        this.validateindustry = this.validateindustry.bind(this)

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

    // This function handles modal close toggle and resets state 
    hanldeClickClose() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    // Handles Snack bar close toogle    
    handleClose() {
        this.setState({ open: false })
    }

    // Handles Snack bar open toogle
    handleOpen() {
        this.setState({ open: true })
    }

    // Handles the save button for the Evemt form
    async handleOnSave() {
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
            console.log("form submitted")
            let token = localStorage.getItem('token')

            try {
                let data = new FormData();
                let file = this.state.profile_image
                if (file) {
                    data.append('profile_image', file, file.name);
                }
                data.append("user_profile", this.state.user_profile);
                data.append("description", this.state.description);
                data.append("location", this.state.location);
                data.append("industry", this.state.industry);

                let res = await axios.put(`http://localhost:8000/api/details/${this.state.profileDetails_id}/`, data, {
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


            this.handleOpen()
            this.hanldeClickClose()

            //Refreshes the parent component
            this.setState({ updateCalled: !this.state.updateCalled })
            this.props.handleUpdateCalled(this.state.updateCalled)


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
    validateindustry = (e) => {
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

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                profile_image: img
            });
        }
    };

    render() {
        return (
            <div>
                <Button style={{ minWidth: "125px" }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
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

                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="outlined-age-native-simple">Select Category</InputLabel>
                                        <Select
                                            native
                                            error={this.state.industryError}
                                            label="Select Category"
                                            value={this.state.industry}
                                            name="industry"
                                            onChange={this.validateindustry}
                                            inputProps={{ 'aria-label': 'category' }}>
                                            <option value=''>
                                                -
                                            </option>
                                            <option value="Animal welfare" >Animal welfare</option>
                                            <option value="Arts, Culture, Humanities">Arts, Culture, Humanities</option>
                                            <option value="Community Development">Community Development </option>
                                            <option value="Education">Education</option>
                                            <option value="Environment">  Environment</option>
                                            <option value="Health ">Health </option>
                                            <option value="Human and Civil rights">Human and Civil rights </option>
                                            <option value="Human services ">Human services </option>

                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>

                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="outlined-age-native-simple">Select Country</InputLabel>
                                        <Select
                                            native
                                            error={this.state.locationError}
                                            label="Select Country"
                                            value={this.state.location}
                                            name="location"
                                            onChange={this.validatelocation}
                                            inputProps={{ 'aria-label': 'age' }}>
                                            <option value=''>
                                                -
                                            </option>
                                            {country_list().map(({ value, label }, index) =>
                                                <option key={value} value={value}>{label}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item>
                                    <input type="file" name="profile_image" onChange={this.onImageChange}
                                        accept="image/png, image/jpeg" />
                                </Grid>
                            </Grid>


                        </Container>
                    </DialogContent>
                    <DialogActions>

                        <Button color="primary" onClick={this.hanldeClickClose}>
                            Cancel
                        </Button>

                        <Button color="primary"
                            disabled={this.state.descriptionError || this.state.industryError || this.state.locationError}
                            onClick={this.handleOnSave}>
                            Save
                        </Button>

                    </DialogActions>
                </Dialog>

                <Snackbar open={this.state.open} autoHideDuration={4000} onClose={this.handleClose} >
                    <MuiAlert onClose={this.handleClose} severity="success">
                        Profile successfully updated
                </MuiAlert>
                </Snackbar >

            </div >
        )
    }
}

export default OrgProfileFormEdit

