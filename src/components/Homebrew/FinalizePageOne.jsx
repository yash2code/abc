import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShare } from "../../actions/modalController";
import {
  updateFinalizePage,
  updateFinalizeData
} from "../../actions/finalizeController";
import { updateButtons } from "../../actions/buttonController";
import withStyles from "@material-ui/core/styles/withStyles";
import CardBody from "../Card/CardBody.jsx";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import ButtonMaterial from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FinalizePageTwo from "./FinalizePageTwo.jsx";
import FinalizePageThree from "./FinalizePageThree.jsx";

function mapStateToProps(state) {
  return {
    share: state.modalReducer.share,
    step: state.finalizeReducer.step,
    steps: state.finalizeReducer.steps,
    fullName: state.finalizeReducer.fullName,
    email: state.finalizeReducer.email,
    phone: state.finalizeReducer.phone,
    morning: state.finalizeReducer.morning,
    afternoon: state.finalizeReducer.afternoon,
    night: state.finalizeReducer.night,
    anytime: state.finalizeReducer.anytime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateShare: share => dispatch(updateShare(share)),
    updateFinalizePage: (step, steps) =>
      dispatch(updateFinalizePage(step, steps)),
    updateFinalizeData: data => dispatch(updateFinalizeData(data)),
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class FinalizePageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternatingColor: ["#fff", "#f6f6f6"]
    };
    this.handleCallTime = this.handleCallTime.bind(this);
  }
  handleCallTime = time => event => {
    if (time === "morning") {
      this.props.updateFinalizeData({
        morning: true
      });
    } else if (time === "afternoon") {
      this.props.updateFinalizeData({
        afternoon: true
      });
    } else if (time === "anytime") {
      this.props.updateFinalizeData({
        anytime: true
      });
    } else {
      this.props.updateFinalizeData({
        night: true
      });
    }
  };
  render() {
    const { classes } = this.props;
    var phoneDisplay = `(${this.props.phone[0]}${this.props.phone[1]}${
      this.props.phone[2]
      }) - ${this.props.phone[3]}${this.props.phone[4]}${this.props.phone[5]} - ${
      this.props.phone[6]
      }${this.props.phone[7]}${this.props.phone[8]}${this.props.phone[9]}`;
    var stepsForward = [
      {
        stepName: "Your Information",
        header: "Schedule With Our Design Consultant",
        active: false,
        completed: true,
        bodyContent: <FinalizePageOne imageUrl={this.props.imageUrl}/>
      },
      {
        stepName: "Save & Send",
        header: "Schedule With Our Design Consultant",
        active: true,
        completed: false,
        bodyContent: <FinalizePageTwo imageUrl={this.props.imageUrl}/>
      },
      {
        stepName: "Share",
        header: "Schedule With Our Design Consultant",
        active: false,
        completed: false,
        bodyContent: <FinalizePageThree imageUrl={this.props.imageUrl}/>
      }
    ];
    return (
      <CardBody className={classes.root}>
        <GridContainer justify="center" className={classes.formContainer}>
          <GridItem xs={10} className={classes.textContainer}>
            <Typography variant="body1">
              Please verify your contact Information and the best time for our
              Moon Valley Design Consultant to give you a call.
            </Typography>
          </GridItem>
          <GridItem xs={10} className={classes.greyContainer}>
            <GridContainer justify="center">
              <GridItem xs={4}>
                <Typography variant="body1" className={classes.fieldTitle}>
                  Name:
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant="body1" className={classes.fieldTitle}>
                {localStorage.getItem('firstname')+' '+localStorage.getItem('lastname')}
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={10}>
            <GridContainer justify="center">
              <GridItem xs={4}>
                <Typography variant="body1" className={classes.fieldTitle}>
                  Email:
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant="body1" className={classes.fieldTitle}>
                {localStorage.getItem('email')}
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={10} className={classes.greyContainer}>
            <GridContainer justify="center">
              <GridItem xs={4}>
                <Typography variant="body1" className={classes.fieldTitle}>
                  Phone:
                </Typography>
              </GridItem>
              <GridItem xs={6}>
                <Typography variant="body1" className={classes.fieldTitle}>
                {localStorage.getItem('telephone')}
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={10}>
            <GridContainer justify="center" className={classes.formContainer}>
              <GridItem xs={4}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Best Time to Call</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.morning}
                          onChange={this.handleCallTime("morning")}
                          value="morning"
                        />
                      }
                      label="Morning"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.afternoon}
                          onChange={this.handleCallTime("afternoon")}
                          value="afternoon"
                        />
                      }
                      label="Afternoon"
                    />
                  </FormGroup>
                </FormControl>
              </GridItem>
              <GridItem xs={6}>
                <FormControl
                  component="fieldset"
                  className={classes.formControlTwo}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.night}
                          onChange={this.handleCallTime("night")}
                          value="night"
                        />
                      }
                      label="Evening"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.anytime}
                          onChange={this.handleCallTime("anytime")}
                          value="anytime"
                        />
                      }
                      label="Any Time"
                    />
                  </FormGroup>
                </FormControl>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" className={classes.buttonContainer}>
          <GridItem xs={5}>
            <ButtonMaterial
              id="submit1"
              variant="contained"
              size="large"
              className={classes.buttonAsk}
              onClick={() => this.props.updateFinalizePage(1, stepsForward)}
            >
              Next
            </ButtonMaterial>
          </GridItem>
          <GridItem xs={5}>
            <ButtonMaterial
              id="cancel1"
              variant="outlined"
              size="large"
              className={classes.buttonCancel}
              onClick={() => {
                this.props.updateShare(!this.props.share);
                this.props.updateButtons({ menu: true });
              }}
            >
              Cancel
            </ButtonMaterial>
          </GridItem>
        </GridContainer>
      </CardBody>
    );
  }
}

// const style = {
//   root: {
//     position: "absolute",
//     top: "14vh",
//     height: "76%",
//     left: "inherit"
//   },
//   greyContainer: {
//     height: "6vh",
//     lineHeight: "6vh",
//     overflow: "hidden",
//     backgroundColor: "#f6f6f6"
//   },
//   whiteContainer: {
//     height: "6vh",
//     lineHeight: "6vh",
//     overflow: "hidden"
//   },
//   fieldTitle: {
//     lineHeight: "6vh",
//     textAlign: "left"
//   },
//   formContainer: {
//     marginTop: "1vh",
//     height: "19vh"
//   },
//   textContainer: {
//     marginTop: "1vh",
//     marginBottom: "2vh"
//   },
//   formControl: {
//     textAlign: "left",
//     position: "absolute",
//     left: "2vw",
//     top: "2vh"
//   },
//   formControlTwo: {
//     textAlign: "left",
//     position: "absolute",
//     left: "2vw",
//     top: "4.2vh"
//   },
//   buttonContainer: {
//     width: "100%",
//     height: "5vh",
//     textAlign: "center",
//     position: "absolute",
//     bottom: "4vh",
//     left: 0
//   },
//   buttonAsk: {
//     position: "absolute",
//     left: "13vw",
//     top: 0,
//     backgroundColor: "#ff0000",
//     color: "#fff",
//     width: "auto",
//     "&:hover": {
//       background: "#ff0000",
//       color: "#ffffff"
//     }
//   },
//   buttonCancel: {
//     position: "absolute",
//     right: "13vw",
//     top: 0,
//     width: "auto"
//   }
// };

const style = {
  root: {
    // position: "absolute",
    top: "14vh",
    height: "76%",
    left: "inherit"
  },
  greyContainer: {
    height: "6vh",
    lineHeight: "6vh",
    overflow: "hidden",
    backgroundColor: "#f6f6f6"
  },
  whiteContainer: {
    height: "6vh",
    lineHeight: "6vh",
    overflow: "hidden"
  },
  fieldTitle: {
    lineHeight: "6vh",
    textAlign: "left"
  },
  formContainer: {
    marginTop: "1vh"
  },
  textContainer: {
    marginTop: "1vh",
    marginBottom: "2vh"
  },
  formControl: {
    textAlign: "left",
    position: "absolute",
    left: "2vw",
    top: "2vh"
  },
  formControlTwo: {
    textAlign: "left",
    position: "absolute",
    left: "2vw",
    top: "4.2vh"
  },
  buttonContainer: {
    // position: "absolute",
    // bottom: "3vh",
    marginTop: "22vh",
    width: "100%"
  },
  buttonAsk: {
    backgroundColor: "#ff0000",
    color: "#fff",
    width: "auto",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  buttonCancel: {
    width: "auto"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(FinalizePageOne));
