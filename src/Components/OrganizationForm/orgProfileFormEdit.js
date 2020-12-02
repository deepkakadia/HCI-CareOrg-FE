import React, { Component } from 'react'
import { Grid, Container, Paper, Button, TextField, FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import country_list from './countrList'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';




export class orgProfileFormEdit extends Component {

    constructor(props) {
        super(props);

        //Props for existing org details
        const { orgDetails } = this.props

        this.state = {
            orgDescription: orgDetails.orgDescription,
            orgLocation: orgDetails.orgLocation,
            orgIndustry: orgDetails.orgIndustry,
            open: false,

            orgDescriptionError: false,
            orgLocationError: false,
            orgIndustryError: false

        }
        this.baseState = this.state
        this.validateOrgDescription = this.validateOrgDescription.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.validateOrgLocation = this.validateOrgLocation.bind(this)
        this.validateOrgIndustry = this.validateOrgIndustry.bind(this)
        this.hanldeSubmit = this.hanldeSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
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
    hanldeSubmit() {
        if (this.state.orgDescription.length === 0 || typeof (this.state.orgDescription) != 'string') {
            this.setState({ orgDescriptionError: true })
        }
        if (this.state.orgLocation === 0 || typeof (this.state.orgLocation) != 'string') {
            this.setState({ orgLocationError: true })
        }
        if (this.state.orgIndustry.length === 0 || typeof (this.state.orgIndustry) != 'string') {
            this.setState({ orgIndustryError: true })
        }
        else {

            this.handleOpen()

            //Make axios call to post to backend
            //Upload event image 


        }

    }

    /**
     * Validates org description
     * @param {event} e 
     */
    validateOrgDescription = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ orgDescriptionError: true })
        }
        else {
            this.setState({ orgDescriptionError: false })

        }
        this.handleInputChange(e)
    }



    /**
     * Validates org location
     * @param {event} e
     */
    validateOrgLocation = (e) => {
        console.log(e.target.value)
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ orgLocationError: true })
        }
        else {
            this.setState({ orgLocationError: false })

        }
        this.handleInputChange(e)
    }

    /**
    * Validates org Industry
    * @param {event} e
    */
    validateOrgIndustry = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ orgIndustryError: true })
        }
        else {
            this.setState({ orgIndustryError: false })

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

                <Container className="app">

                    <Grid container spacing={0} justify="center" direction="row">
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                spacing={9}
                                className="login-form"
                            >
                                <Paper
                                    variant="elevation"
                                    elevation={2}
                                    className="login-background"
                                >
                                    <Grid container direction="column" justify="center" alignContent="center" spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Organization Description"
                                                error={this.state.orgDescriptionError}
                                                type="text"
                                                multiline={true}
                                                name="orgDescription"
                                                placeholder="Describe your organization"
                                                value={this.state.orgDescription}
                                                onChange={this.validateOrgDescription}
                                                onFocus={this.handleInputFocus}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />


                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                error={this.state.orgIndustryError}
                                                type='text'
                                                name='orgIndustry'
                                                label='Industry'
                                                placeholder='Name the Industry'
                                                value={this.state.orgIndustry}
                                                onChange={this.validateOrgIndustry}
                                                onFocus={this.handleInputFocus}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl error={this.state.orgLocationError}>
                                                <NativeSelect
                                                    error={this.orgLocationError}
                                                    // className={classes.selectEmpty}
                                                    value={this.state.orgLocation}
                                                    name="orgLocation"
                                                    onChange={this.validateOrgLocation}
                                                    inputProps={{ 'aria-label': 'age' }}>
                                                    <option value=''>
                                                        -
                                            </option>
                                                    {country_list().map(({ value, label }, index) =>
                                                        <option value={value}>{label}</option>
                                                    )}



                                                </NativeSelect>
                                            </FormControl>
                                            <FormHelperText>Select Country</FormHelperText>

                                        </Grid>
                                        <Grid item xs={12}>


                                            <Grid container direction="row" justify="center" alignContent="center">
                                                <Grid item>
                                                    <Button variant="contained" color="primary"
                                                        error={this.state.orgDescriptionError || this.state.orgIndustryError || this.state.orgLocationError}
                                                        onClick={this.hanldeSubmit}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Paper>

                            </Grid>

                        </Grid>
                    </Grid>

                </Container>

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
                    <MuiAlert onClose={this.handleClose} severity="success">
                        This is a success message!
                </MuiAlert>
                </Snackbar >

            </div >
        )
    }
}

export default orgProfileFormEdit
