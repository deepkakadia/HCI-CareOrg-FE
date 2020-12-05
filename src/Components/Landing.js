import React, { Component } from "react";
import NavBarHome from "./NavBar/NavBarHome";
import { withStyles } from "@material-ui/core/styles";
import Image from "../utils/home.png"
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  Divider,
  Container,
  Card,
} from "@material-ui/core";

const styles = theme => ({
  typography: {
    fontFamily: 'Roboto',
  },
  root: {
    height: '100vh',
  },
  paper: {
    backgroundImage: `url(${Image})`,
  },
  container:{
    background: "blue"
  },
  carddialog:{
    width: 500,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.74)',
    color:"white"
  }  
});


class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <Paper className = {classes.paper}>
        <NavBarHome />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
          <Grid item xs={3}>
            <Card className= {classes.carddialog}>
              <Typography component="h1" variant="h5">No act of kindness, no matter how small, is ever wasted</Typography>
            </Card>
          </Grid>
          
          </Grid>
        
          
        </Paper>
      </div>
          
        
    );
  }
}

export default withStyles(styles)(HomePage)