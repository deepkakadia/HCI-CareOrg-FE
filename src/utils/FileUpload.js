import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        console.log(this.state.files)

        axios.post('upload_file', this.state.files[0], {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                    Upload File
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['.pdf,.zip,.png,.jpeg,.jpg']}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}