import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Enter Donation Amount', 'Add Payment Information', 'Confirm Payment Details'];
}



export default function HorizontalLabelPositionBelowStepper({ stepCount }) {
    const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();



    return (
        <div className={classes.root}>
            <Stepper activeStep={stepCount} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

        </div>
    );
}