import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import Check from "@material-ui/icons/Check";
import clsx from "clsx";
import PropTypes from "prop-types";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 22
      },
      active: {
        "& $line": {
          backgroundImage:
            "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
      },
      completed: {
        "& $line": {
          backgroundImage:
            "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
      },
      line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1
      }
    })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center"
    },
    active: {
      color: "#784af4"
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor"
    },
    completed: {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18
    }
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active
        })}
      >
        {completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool
  };
  

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    button: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }));

function getSteps() {
    return ['Enter Donation Amount', 'Add Payment Information', 'Confirm Payment Details'];
}



export default function HorizontalLabelPositionBelowStepper({ stepCount }) {
    const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



    return (
        <div className={classes.root}>
            <Stepper
                alternativeLabel
                activeStep={stepCount}
                connector={<QontoConnector />}
            >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
            ))}
            </Stepper>
                       
        </div>
    );
}