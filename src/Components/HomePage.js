import React, { Component } from "react";
import NavBarHome from "./NavBar/NavBarHome";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import EventTableAll from "./Organisation/EventTableAll";

import {
    Grid, TextField, FormControl, InputLabel,
    Select, Button
} from '@material-ui/core';
import country_list from './OrganizationForm/countrList';
async function getUserById(userId) {

    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}

/**
 * Gets all events from the db
 */
async function getAllEvents() {

    let token = localStorage.getItem('token');

    let res = await axios.get(`http://localhost:8000/api/feed/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userObj: {},
            allEvents: [],
            filteredEvents: [],
            searchName: '',
            searchIndustry: '',
            searchLocation: '',
            searchNameError: false,
            industryError: false,
            locationError: false
        }
        //Handles input validation 
        this.validateSearchName = this.validateSearchName.bind(this);
        this.validateSearchIndustry = this.validateSearchIndustry.bind(this);
        this.validateSearchLocation = this.validateSearchLocation.bind(this);
        //Handles input on change
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)

        this.hanldeOnSubmit = this.hanldeOnSubmit.bind(this)


    }

    async componentDidMount() {
        let userId = localStorage.getItem('userid')
        let userObj = await getUserById(userId);
        let allEvents = await getAllEvents();



        this.setState({
            userObj: userObj,
            allEvents: allEvents
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



    /**
    * Validates org searchName
    * @param {event} e 
    */
    validateSearchName = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ searchNameError: true })
        }
        else {
            this.setState({ searchNameError: false })

        }
        this.handleInputChange(e)
    }


    /**
     * Validates org location
     * @param {event} e
     */
    validateSearchLocation = (e) => {
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
    validateSearchIndustry = (e) => {
        if (e.target.value.length === 0 || typeof (e.target.value) != 'string') {
            this.setState({ industryError: true })
        }
        else {
            this.setState({ industryError: false })

        }
        this.handleInputChange(e)
    }



    hanldeOnSubmit(e) {
        e.preventDefault();
        const { allEvents, searchName, searchLocation, searchIndustry } = this.state;

        let filteredEvents = allEvents.filter((currEvent) =>
            currEvent.event_description === searchName || currEvent.location === searchLocation ||
            currEvent.industry === searchIndustry)

        this.setState({ filteredEvents: filteredEvents })
    }



    render() {
        return (
            <div>
                <div>
                    {/* We can send userObj to nav bar which can decide to show donation history */}
                    <NavBarHome />
                </div>
                <h2>Hello this our HomePage</h2>
                <h3>Welcome {this.state.userObj.name}</h3>





                <Container maxWidth="lg">




                    <Grid container direction="column" justify="center" alignContent="center" spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Organization name"
                                error={this.state.searchNameError}
                                type="text"
                                name="searchName"
                                placeholder="Enter an organization name to search"
                                value={this.state.searchName}
                                onChange={this.validateSearchName}
                                onFocus={this.handleInputFocus}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />


                        </Grid>




                        <Grid item xs={12}>

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="organization category select">Select Category</InputLabel>
                                <Select
                                    native
                                    id="organization category select"
                                    error={this.state.industryError}
                                    label="Select Category"
                                    value={this.state.searchIndustry}
                                    name="searchIndustry"
                                    onChange={this.validateSearchIndustry}
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
                                    value={this.state.searchLocation}
                                    name="searchLocation"
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

                        <Grid item xs={12}>
                            <Button onClick={this.hanldeOnSubmit}>
                                Search
                                </Button>
                        </Grid>

                    </Grid>

                    <br></br>

                    <Divider />
                    <EventTableAll history={this.props.history} feedItems={this.state.filteredEvents} userDetails={this.state.userObj} />

                </Container >




            </div>
        );
    }
}

export default HomePage