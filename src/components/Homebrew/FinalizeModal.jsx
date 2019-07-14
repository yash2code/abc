import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShare } from "../../actions/modalController";
import {
  updateFinalizePage,
  updateFinalizeData
} from "../../actions/finalizeController";
import { updateButtons } from "../../actions/buttonController";
import withStyles from "@material-ui/core/styles/withStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classNames from "classnames";
import Card from "../Card/Card.jsx";
import StepHeader from "./StepHeader.jsx";
import FinalizePageOne from "./FinalizePageOne.jsx";
import FinalizePageTwo from "./FinalizePageTwo.jsx";
import FinalizePageThree from "./FinalizePageThree.jsx";
import "../../animate.css";
import htmlToImage from 'html-to-image';

function mapStateToProps(state) {
  return {
    share: state.modalReducer.share,
    step: state.finalizeReducer.step,
    steps: state.finalizeReducer.steps,
    fullName: state.finalizeReducer.fullName,
    email: state.finalizeReducer.email,
    phone: state.finalizeReducer.phone,
    animation: state.finalizeReducer.animation,
    forwardsStep: state.finalizeReducer.forwardsStep,
    backwardsStep: state.finalizeReducer.backwardsStep
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

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animType: {
        enter: "customSlideOutLeft",
        exit: "customSlideOutLeft"
      },
      key: Math.floor(Math.random() * 10000000 + 1)
    };
    this.props.updateButtons({ menu: false });
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    let node = document.getElementById('container');
    let dataUrl = await htmlToImage.toPng(node);
    console.log("dataUrldataUrldataUrl  ",dataUrl);
    let imageData=dataUrl;
    console.log(this.props.imageUrl)
    var steps = [
      {
        stepName: "Your Information",
        header: "Schedule With Our Design Consultant",
        active: true,
        completed: false,
        bodyContent: <FinalizePageOne imageUrl={imageData}/>
      },
      {
        stepName: "Save & Send",
        header: "Schedule With Our Design Consultant",
        active: false,
        completed: false,
        bodyContent: <FinalizePageTwo imageUrl={imageData}/>
      },
      {
        stepName: "Share",
        header: "Schedule With Our Design Consultant",
        active: false,
        completed: false,
        bodyContent: <FinalizePageThree imageUrl={imageData}/>
      }
    ];
    this.props.updateFinalizePage(0, steps);
    this.props.updateFinalizeData({ animation: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.backwardsStep && !prevProps.backwardsStep) {
      this.setState({
        animType: {
          enter: "customSlideOutRight",
          exit: "customSlideOutRight"
        },
        key: this.state.key - 1
      });
    }
    if (this.props.forwardsStep && this.props.step !== prevProps.step) {
      this.setState({
        animType: {
          enter: "customSlideOutLeft",
          exit: "customSlideInRight"
        },
        key: this.state.key + 1
      });
    }
  }

  render() {
    var content;
    const { classes } = this.props;
    if (this.props.steps.length !== 0) {
      content = this.props.steps[this.props.step].bodyContent;
    } else {
      content = "please provide an array";
    }
    return (
      <Card className={classNames(classes.main, "fadeIn")}>
        <StepHeader
          step={this.props.step}
          steps={this.props.steps}
          location="final"
        />
        <TransitionGroup>
          <CSSTransition
            in={this.props.animation}
            timeout={{
              enter: 1000,
              exit: -1000
            }}
            key={this.state.key}
            classNames={this.state.animType}
            onExited={() => {
              this.props.updateFinalizeData({
                animation: false
              });
            }}
          >
            <div>{content}</div>
          </CSSTransition>
        </TransitionGroup>
      </Card>
    );
  }
}

const style = {
  main: {
    zIndex: 40,
    textAlign: "center",
    width: "66vw",
    height: "74vh",
    marginLeft: "17vw",
    marginTop: "16vh"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(ShareModal));
