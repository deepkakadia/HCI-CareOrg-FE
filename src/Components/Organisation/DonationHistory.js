import React, { Component } from "react";
import MaterialTable from 'material-table';

class DonationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    render() {
        var eventArray = this.props.feedItems;
        console.log(this.state.page)
        var feedItems = [
            {
                "id": 1,
                "user_profile": 1,
                "event_title": "Earthquake relief",
                "event_description": "akiaja",
                "created_on": "2020-11-30",
                "expires_on": "2020-12-05",
                "is_Expired": true,
                "goal_amount": 20000,
                "received_amount": 100
            },
            {
                "id": 2,
                "user_profile": 1,
                "event_title": "lolal",
                "event_description": "aaaa",
                "created_on": "2020-11-30",
                "expires_on": "2020-12-12",
                "is_Expired": false,
                "goal_amount": 20000,
                "received_amount": 0
            }
        ]

        const userDetails = {
            "id": 1,
            "email": "meet@123.com",
            "name": "Meet Patel",
            "is_organisation": true
        }

        var donationHistory = [
            {
                "id": 1,
                "user_profile": 1,
                "event_id": 1,
                "date": "2020-11-01",
                "amount_donated": 100
            },
            {
                "id": 2,
                "user_profile": 1,
                "event_id": 1,
                "date": "2020-12-01",
                "amount_donated": 1000
            },
            {
                "id": 3,
                "user_profile": 1,
                "event_id": 1,
                "date": "2021-12-01",
                "amount_donated": 150
            },
            {
                "id": 4,
                "user_profile": 1,
                "event_id": 1,
                "date": "2020-12-01",
                "amount_donated": 300
            },
            {
                "id": 5,
                "user_profile": 1,
                "event_id": 1,
                "date": "2020-12-01",
                "amount_donated": 300
            }
        ]
        donationHistory = donationHistory.filter(donation => donation.user_profile === userDetails.id);
        donationHistory.forEach(donation => donation.campaign_name = feedItems.filter(x => x.id === donation.event_id)[0].event_title);

        return (
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
        )
    }

}

export default DonationHistory;