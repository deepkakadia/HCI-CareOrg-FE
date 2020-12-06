import React, { Component } from "react";
import MaterialTable from 'material-table';
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import NavBarHome from "../NavBar/NavBarHome";
import { Redirect } from "react-router-dom"
import StyledBadge from '../../Components/StyledBadge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { getUserById, getAllEvents } from '../Dashboard';
import axios from 'axios';
import Confetti from '../../utils/Confetti';


/**
 * Gets details of all Donations
 */
export async function getAllDonations() {
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
class DonationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            feedItems: [],
            userDetails: {},
            donationHistory: [],
            confettiState: false,
        };
    }

    async componentDidMount() {



        let userDetails = await getUserById(localStorage.getItem('userid'));
        let feedItems = await getAllEvents();

        let donationHistory = await getAllDonations();

        this.setState({
            feedItems: feedItems,
            userDetails: userDetails,
            donationHistory: donationHistory,
            confettiState: true
        })

        setTimeout(() => {
            this.setState({ confettiState: false })
        }, 10000);
    }

    render() {
        // var eventArray = this.props.feedItems;
        let { feedItems, userDetails, donationHistory } = this.state

        donationHistory = donationHistory.filter(donation => donation.user_profile === userDetails.id);
        donationHistory.forEach(donation => donation.campaign_name = feedItems.filter(x => x.id === donation.event_id)[0].event_title);

        var total = 0;
        donationHistory.forEach(x => {
            total += x.amount_donated
        });
        return (

            //Add mnavbar

            <div>
                {this.state.confettiState && <Confetti />}
                {localStorage.getItem("is_organisation") == "true" &&
                    <Redirect to="/Dashboard" />
                }

                {/* We can send userObj to nav bar which can decide to show donation history */}
                <NavBarHome />

                {/* <StyledBadge data={this.state.userObj.name}></StyledBadge> */}
                <Container maxWidth="lg">

                    <Grid container spacing={0} alignItems='center'>
                        <Grid item xs={12} align='center'>
                            {total != 0 && <Card style={{ marginTop: "50px" }} elevation={0}>
                                <CardContent gutterBottom>
                                    <Typography variant="h2">You have made donations of</Typography>
                                </CardContent>

                                <CardContent>
                                    <Typography style={{ color: 'green' }} variant="h2">${total} </Typography>
                                </CardContent>

                                <CardContent>
                                    <Typography variant="h3"> Keep it up <FavoriteIcon fontSize="inherit" color="secondary" /> </Typography>
                                </CardContent>
                            </Card>}

                            {total === 0 && <Card style={{ marginTop: "50px", marginBottom: "50px" }} elevation={0}>
                                <CardContent>
                                    <Typography variant="h2"> Make your first donation <FavoriteIcon fontSize="inherit" color="secondary" /> </Typography>
                                </CardContent>

                                <CardContent gutterBottom>
                                    <Typography variant="h2">to see your donation history</Typography>
                                </CardContent>
                            </Card>}

                        </Grid>
                        <Grid item xs={12} align='center'>

                            <MaterialTable
                                title="Donation History"
                                columns={[
                                    { title: 'Campaign Name', field: 'campaign_name', sorting: false },
                                    { title: 'Donated on', field: 'date', type: "date", defaultSort: 'desc' },
                                    {
                                        title: 'Amount',
                                        field: 'amount_donated',
                                        type: 'numeric',
                                        cellStyle: {
                                            // backgroundColor: '#039be5',
                                            color: 'green',
                                            fontWeight: "500"

                                        },
                                        headerStyle: {
                                            // backgroundColor: '#039be5',
                                        },
                                        align: "right",
                                    },

                                ]}
                                data={donationHistory}
                                options={{
                                    sorting: true,
                                    search: false,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>


        )
    }

}

export default DonationHistory;