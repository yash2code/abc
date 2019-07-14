import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { updateShare } from "../../actions/modalController";
import {
  updateFinalizePage,
  updateFinalizeData
} from "../../actions/finalizeController";
import { updateButtons } from "../../actions/buttonController";
import { handleNavigation } from "../../actions/navigationController";
import withStyles from "@material-ui/core/styles/withStyles";
import CardBody from "../Card/CardBody.jsx";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import BG2 from "../../assets/img/finalResultWatermarked.jpg";
import Email from "@material-ui/icons/Email";
import Save from "@material-ui/icons/Save";
import twitter from "../../assets/img/twitter.svg";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import twitterRed from "../../assets/img/twitterRed.svg";
import facebookRed from "../../assets/img/facebookRed.svg";
import instagramRed from "../../assets/img/instagramRed.svg";

function mapStateToProps(state) {
  return {
    share: state.modalReducer.share,
    step: state.finalizeReducer.step,
    steps: state.finalizeReducer.steps,
    fullName: state.finalizeReducer.fullName,
    email: state.finalizeReducer.email,
    phone: state.finalizeReducer.phone
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateShare: share => dispatch(updateShare(share)),
    updateFinalizePage: (step, steps) =>
      dispatch(updateFinalizePage(step, steps)),
    updateFinalizeData: data => dispatch(updateFinalizeData(data)),
    updateButtons: data => dispatch(updateButtons(data)),
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}

class FinalizePageThree extends Component {
  render() {
    const { classes } = this.props;
    return (
      <CardBody className={"fadeInTwo"}>
        <GridContainer justify="center" className={classes.formContainer}>
          <GridItem xs={10} className={classes.gridItem}>
            <img src={this.props.imageUrl} alt="preview" className={classes.previewTwo} />
          </GridItem>
          <GridItem xs={10}>
            <Typography variant="body1" className={classes.socialHeader}>
              Thank you for your submission, one of our Design Specialists will
              contact you shortly.
            </Typography>
          </GridItem>
          <GridItem xs={12} className={classes.socialContainer}>
            <GridContainer justify="center">
              <GridItem xs={2}>
                <Fab
                  className={classNames(
                    classes.socialButton,
                    classes.iconFacebook
                  )}
                  size="medium"
                >
                  <div />
                </Fab>
              </GridItem>
              <GridItem xs={2}>
                <Fab
                  className={classNames(
                    classes.socialButton,
                    classes.iconTwitter
                  )}
                  size="medium"
                >
                  <div />
                </Fab>
              </GridItem>
              <GridItem xs={2}>
                <Fab
                  className={classNames(
                    classes.socialButton,
                    classes.iconInstagram
                  )}
                  size="medium"
                >
                  <div />
                </Fab>
              </GridItem>
              <GridItem xs={2}>
                <Fab className={classes.socialButton} size="medium">
                  <Email className={classes.icon} />
                </Fab>
              </GridItem>
              <GridItem xs={2}>
                <Fab className={classes.socialButton} size="medium">
                  <Save className={classes.icon} />
                </Fab>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.doneButton}>
          <GridItem xs={5}>
            <Typography
              key="done"
              variant="body1"
              onClick={() => {
                this.props.updateShare(!this.props.share);
                this.props.updateButtons({ menu: true });
                this.props.handleNavigation("My Designs");
              }}
            >
              Done
            </Typography>
          </GridItem>
        </GridContainer>
      </CardBody>
    );
  }
}

const style = {
  socialContainer: {
    textAlign: "center",
    width: "80%",
    marginTop: "1vh",
    marginBottom: "1vh",
    marginLeft: "10%",
    marginRight: "10%"
  },
  previewTwo: {
    borderRadius: "15px",
    marginTop: "2vh",
    marginBottom: "1vh",
    width: "50%",
    height: "auto",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  socialHeader: {
    marginTop: "2vh",
    marginBottom: "3vh"
  },
  socialButton: {
    color: "#ffffff",
    backgroundColor: "#ff0000",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#ff0000"
    }
  },
  icon: {
    width: "50%",
    height: "50%",
    "&:hover": {
      color: "#ff0000 !important"
    }
  },
  iconFacebook: {
    backgroundSize: "50% 50%",
    backgroundPosition: "center",
    backgroundImage: `url(${facebook})`,
    backgroundRepeat: "no-repeat",
    "&:hover": {
      backgroundImage: `url(${facebookRed})`
    }
  },
  iconTwitter: {
    backgroundSize: "50% 50%",
    backgroundPosition: "center",
    backgroundImage: `url(${twitter})`,
    backgroundRepeat: "no-repeat",
    "&:hover": {
      backgroundImage: `url(${twitterRed})`
    }
  },
  iconInstagram: {
    backgroundSize: "50% 50%",
    backgroundPosition: "center",
    backgroundImage: `url(${instagram})`,
    backgroundRepeat: "no-repeat",
    "&:hover": {
      backgroundImage: `url(${instagramRed})`
    }
  },
  doneButton: {
    // position: "absolute",
    // bottom: "5vh",
    // left: 0,
    width: "100%",
    margin: 0,
    textDecoration: "underline",
    textUnderlinePosition: "under"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(FinalizePageThree));
