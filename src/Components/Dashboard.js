import React, { Component } from "react";
import { logout } from "../utils/index";
import NavBarDashBoard from "./NavBar/NavBarDashBoard";
import axios from "axios";
import OrgDash from './Organisation/OrgDash';
import { Redirect } from "react-router-dom";

/**
 * Gets user obj from database
 * @param {userId} userId 
 */
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
 * Gets all users from the db
 */
async function getAllUser() {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/user/`, {
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
/**
 * Gets all donation history
 * @param {userid} userId 
 */
async function getDonationHistory() {

    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/history/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}

/**
 * Gets details of all organizations
 */
async function getAllOrgDetails() {
    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/details/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;
}


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * Logged in user's token
             */
            token: localStorage.getItem('token'),
            // Loged in user object 
            userObj: {},
            /**All events in the db and their details */
            allEvents: [],
            /**All Donation history */
            donationHistory: [],
            /**Details of all the organizations */
            allOrgProfiles: [],
            /**objects of all the users in the db */
            allUserProfiles: [],
        }


    }

    async componentDidMount() {

        try {
            let userId = localStorage.getItem('userid')
            let userObj = await getUserById(userId)

            let donationHistory = []
            //Find the donation history of the logged in user -- Do we need to do this here?
            if (!userObj.is_organisation) {
                donationHistory = await getDonationHistory(userId)
                let filterdDonations =
                    donationHistory.filter(donationObj =>
                        donationObj.user_profile == userId);
            }

            let allOrgProfiles = await getAllOrgDetails();
            let allUserProfiles = await getAllUser();
            let allEvents = await getAllEvents();
            let filteredEvents = allEvents.filter(event => (event.user_profile == userObj.id))

            this.setState({
                userObj: userObj,
                filteredEvents: filteredEvents,
                donationHistory: donationHistory,
                allOrgProfiles: allOrgProfiles,
                allUserProfiles: allUserProfiles,
            });

        } catch (e) {
            console.log('error:' + e)
        }

    }


    handle_logout = () => {
        logout();
        this.props.history.push("/login");
    };

    render() {

        let orgDetail = this.state.allOrgProfiles.filter(x => x.user_profile == this.state.userObj.id)[0]

        //Below written code handles a newly signed up organisation user, handles undefined profileDetail 
        var OrgDashProps = {}

        if (orgDetail === undefined) {
            OrgDashProps = {
                userDetails: this.state.userObj,
                allOrgProfiles: this.state.allOrgProfiles,
                filteredEvents: this.state.filteredEvents,
                profileDetails: {
                    "id": '',
                    "user_profile": localStorage.getItem('userid'),
                    "description": "",
                    "location": "",
                    "industry": "",
                    "profile_image": null
                }
            }
        }
        else {
            OrgDashProps = {
                userDetails: this.state.userObj,
                allOrgProfiles: this.state.allOrgProfiles,
                profileDetails: orgDetail,
                filteredEvents: this.state.filteredEvents,
            }
        }


        return (
            <div>
                <div>
                    <NavBarDashBoard />
                </div>

                {/* If the Logged in user is an organization */}
                {/* {orgDetail == undefined &&
                    // redirect to setup profile
                    <Redirect to="/" />
                } */}

                {this.state.userObj.is_organisation &&
                    <OrgDash {...OrgDashProps} />
                }

                {localStorage.getItem("is_organisation") != "true" &&
                    <Redirect to="/homepage" />
                }
            </div>
        );
    }
}

export default Dashboard;

