import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "../Card/CardHeader.jsx";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
/* props: {
    step: {
      type: Number,
      range: 0-2
    },
    steps: {
      type: Array,
      objectSchema: {
        stepName: String,
        header: String,
        active: Boolean,
        completed: Boolean
      }
    }
  }
*/

class StepHeader extends Component {
  render() {
    const { classes } = this.props;
    var step = this.props.step;
    var header;
    if (this.props.steps.length !== 0) {
      header = this.props.steps[step].header;
    } else {
      header = "please provide an array";
    }
    return (
      <CardHeader className={classes.headerContain}>
        <Typography variant="body1" className={classes.headerText}>
          {header}
        </Typography>
        {/* <div className={classes.iconOneCover} />
        <div
          className={classes.iconCover}
          style={{
            left: this.props.location === "reg" ? "27.3vw" : "31.8vw"
          }}
        />
        <div
          className={classes.iconCover}
          style={{
            right: this.props.location === "reg" ? "10.2vw" : "7vw"
          }}
        /> */}
        <Stepper
          activeStep={this.props.step}
          className={classes.stepperContain}
        >
          {this.props.steps.map((obj, i) => {
            return (
              <Step
                key={i}
                active={obj.active}
                completed={obj.completed}
                className={classes.step}
              >
                <StepLabel classes={{ active: classes.stepIconActive }}>
                  {obj.stepName}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardHeader>
    );
  }
}

const style = {
  headerContain: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 800,
    fontSize: "1.1em",
    padding: "1vh",
    backgroundColor: "#252525",
    textAlign: "center",
    color: "#fff",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  stepperContain: {
    backgroundColor: "#252525",
    color: "#fff !important",
    "@media (max-width: 767px)" : {
      flexDirection: 'column !important',
      textAlign:'left !important'
    }
  },
  headerText: {
    fontFamily: "Montserrat, sans-serif",
    color: "#fff !important",
    fontWeight: 400,
    marginBottom: "0",
    marginTop: "2vh"
  },
  iconOneCover: {
    backgroundColor: "#fff",
    position: "absolute",
    left: "3.7vw",
    top: "6vh",
    width: "2.5vh",
    height: "2.5vh",
    zIndex: 2
  },
  iconCover: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "6vh",
    width: "2.5vh",
    height: "2.5vh",
    // width: '20px',
    // height: '20px',
    zIndex: 2
  }
};

export default withStyles(style)(StepHeader);
