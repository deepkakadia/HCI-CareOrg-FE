import React, { Component } from "react";
import { logout } from "../utils/index";
import NavBarDashBoard from "./NavBar/NavBarDashBoard";
import axios from "axios";
import OrgDash from './Organisation/OrgDash';

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

    console.log(res.data);
    return res.data;

}

async function getAllEvents() {

    let token = localStorage.getItem('token');
    console.log(token)
    let res = await axios.get(`http://localhost:8000/api/feed/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })


    return res.data;

}

async function getDonationHistory(userId) {

    let token = localStorage.getItem('token');
    let res = await axios.get(`http://localhost:8000/api/history/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })

    console.log(res.data);
    return res.data;

}


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

            token: localStorage.getItem('token'),
            userObj: {},
            allEvents: [],
            donationHistory: [],
        }
        console.log(this.state)
    }

    async componentDidMount() {
        console.log('componentDid mount')
        try {
            let userId = localStorage.getItem('userid')
            let userObj = await getUserById(userId)

            let donationHistory = []
            if (!userObj.is_organisation) {
                donationHistory = await getDonationHistory(userId)
                let filterdDonations = donationHistory.filter(donationObj => donationObj.user_profile == userId);
                console.log(filterdDonations)
            }


            let allEvents = await getAllEvents();
            this.setState({ userObj: userObj, allEvents: allEvents, donationHistory: donationHistory });
        } catch (e) {
            console.log('error:' + e)
        }




    }


    handle_logout = () => {
        logout();
        this.props.history.push("/login");
    };

    render() {

        return (
            <div>
                <div>
                    <NavBarDashBoard />
                </div>
                {this.state.userObj.is_organisation && <OrgDash userDetails={this.state.userObj} orgDetails={this.state.userObj} />}

                <form action="/login" method="get">
                    <input type="submit" value="Login" name="Submit" id="form_login" />
                </form>
                <form action="/signup" method="get">
                    <input type="submit" value="SignUp" name="Submit" id="form_signup" />
                </form>
                <button onClick={this.handle_logout}>Logout</button>
            </div>
        );
    }
}

export default Dashboard;

