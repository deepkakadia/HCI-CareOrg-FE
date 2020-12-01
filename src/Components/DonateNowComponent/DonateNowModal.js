import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DonateNowCard from './DonateNowCard';
import { Button, Typography } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export class DonateNowModal extends Component {

    constructor(props) {
        super(props);


        this.state = {
            modalOpen: false,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }


    // This funciton handles modal toggle status
    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }


    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Donate Now
                </Button>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClickOpen}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <DonateNowCard></DonateNowCard>
                </Modal>


            </div>
        )
    }
}

export default DonateNowModal
