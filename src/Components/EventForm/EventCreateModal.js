import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


export default class EventCreateModal extends Component {

    constructor(props) {
        super(props);


        this.state = {
            modalOpen: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }



    handleClickOpen() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open dialog
      </Button>
                <Dialog onClose={this.handleClickOpen} aria-labelledby="customized-dialog-title" open={this.state.modalOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClickOpen}>
                        Create New Campaign
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </Typography>

                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={this.handleClickOpen} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
