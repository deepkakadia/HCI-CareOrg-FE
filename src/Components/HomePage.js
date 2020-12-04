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

/**
 * Gets all users from the db
 * returns a dictionary of userObj with id as key
 */
async function getAllUser() {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })

    let orgDict = {};


    res.data.forEach(currUser => {

        orgDict[currUser.id] = currUser;

    });



    return orgDict;
}

async function getAllProfileDetails() {
    let token = localStorage.getItem('token');
    console.log(token)
    let res = await axios.get(`http://localhost:8000/api/details/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        }
    })

    return res.data;
}

/**
 * Gets details of all organizations and creats a dict with
 */
async function getAllOrgDetails(orgDict) {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/details/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    console.log(res.data)

    let filteredEvents = []
    res.data.forEach(currEvent => {

        let user_profile = parseInt(currEvent.user_profile)
        if (user_profile in orgDict) {
            let currObj = orgDict[user_profile];
            console.log(currObj)
            currObj['location'] = currEvent.location
            currObj['industry'] = currEvent.industry
            filteredEvents.push(currObj)

        }
    });


    return filteredEvents;
}






class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: {},
            allProfileDetails: [],
            userObj: {},
            allEvents: [],
            eventsForSearch: [],
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
        //Gets all users from db
        let allUsers = await getAllUser();
        let allProfileDetails = await getAllProfileDetails();
        let userId = localStorage.getItem('userid')

        let userObj = allUsers[userId];
        let allEvents = await getAllEvents();
        let eventsForSearch = await getAllOrgDetails(allUsers);


        this.setState({
            allUsers: allUsers,
            userObj: userObj,
            allProfileDetails: allProfileDetails,
            allEvents: allEvents,
            filteredEvents: allEvents,
            eventsForSearch: eventsForSearch,
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
        const { allProfileDetails, allEvents, searchName, searchLocation, searchIndustry, eventsForSearch } = this.state;
        // let filteredEvents_id = new Set()

        let filteredOrgIds = new Set()
        var filteredProfiles = allProfileDetails;

        if (searchIndustry != "") {
            filteredProfiles = filteredProfiles.filter(details => details.industry == searchIndustry);
        }
        if (searchLocation != "") {
            filteredProfiles = filteredProfiles.filter(details => details.location == searchLocation)
        }
        // apply regex here
        let regex = new RegExp(`^(${searchName}.+|.+${searchName}|.+${searchName}.+)$`);

        // get all events from the list of all filtered org profiles
        for (let i = 0; i < filteredProfiles.length; i++) {
            filteredOrgIds.add(filteredProfiles[i].user_profile);
        }

        let filteredEvents = allEvents.filter(event => filteredOrgIds.has(event.user_profile))

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
                                    <option value="Community Development">Community Development</option>
                                    <option value="Education">Education</option>
                                    <option value="Environment">  Environment</option>
                                    <option value="Health">Health </option>
                                    <option value="Human and Civil rights">Human and Civil rights </option>
                                    <option value="Human services">Human services </option>


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
                                    onChange={this.validateSearchLocation}
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
                            <Button variant="contained" color="primary" onClick={this.hanldeOnSubmit}>
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