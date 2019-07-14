import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { updateSave } from "../../actions/modalController";
import { updateButtons } from "../../actions/buttonController";
import { handleNavigation } from "../../actions/navigationController";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import Typography from "@material-ui/core/Typography";

import "./CropModal.css";

function mapStateToProps(state) {
  return {
    currentCanvas: state.dashboardReducer.currentCanvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSave: save => dispatch(updateSave(save)),
    updateButtons: data => dispatch(updateButtons(data)),
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}

var resizeContainer = null;
var image_target = null;
var active = false;
var sw_active = false;

class CropModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    resizeContainer = document.getElementById("resize-container");
    image_target = document.getElementById("resize-image");

    resizeContainer.addEventListener("mousemove", this.resizing);
  }

  resizing(e) {
    if (active) {
      e.preventDefault();
      image_target.style.width =
        e.pageX - image_target.getBoundingClientRect().left + "px";
      image_target.style.height =
        e.pageY - image_target.getBoundingClientRect().top + "px";
    }

    if (sw_active) {
      e.preventDefault();
      image_target.style.width =
        resizeContainer.getBoundingClientRect().width -
        e.pageX -
        image_target.getBoundingClientRect().left +
        "px";
      image_target.style.height =
        e.pageY - image_target.getBoundingClientRect().top + "px";
    }
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.currentCanvas);
    return (
      <Card
        className={classNames(classes.root, "fadeIn")}
        id="resize-container"
      >
        <CardHeader className={classes.cardHeader}>
          <Typography variant="body1" className={classes.headerText}>
            Crop Design Draft
          </Typography>
        </CardHeader>
        <div
          className="resize-container"
          onMouseUp={() => {
            active = false;
            sw_active = false;
          }}
        >
          <span className="resize-handle resize-handle-nw" />
          <span className="resize-handle resize-handle-ne" />
          <img
            id="resize-image"
            className="resize-image"
            src={this.props.currentCanvas}
            alt="preview"
            onMouseDown={() => {
              active = true;
            }}
          />
          <span
            className="resize-handle resize-handle-se"
            onMouseDown={() => {
              active = true;
            }}
          />
          <span
            className="resize-handle resize-handle-sw"
            onMouseDown={() => {
              sw_active = true;
            }}
          />
        </div>
      </Card>
    );
  }
}

const style = {
  root: {
    zIndex: 40,
    textAlign: "center",
    display: "inline-block",
    width: "66vw",
    height: "74vh",
    // marginLeft: "17vw",
    marginTop: "15vh"
    // alignSelf: "center"
  },
  cardHeader: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 800,
    fontSize: "1.1em",
    padding: "2vh",
    backgroundColor: "#252525",
    textAlign: "center",
    color: "#fff",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  headerText: {
    color: "#fff !important"
  },
  cardBodyContain: {
    width: "auto",
    height: "44vh",
    backgroundColor: "gray",
    backgroundSize: "contain"
  },
  preview: {
    borderRadius: "15px",
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "auto",
    height: "36vh",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  cutout: {
    padding: "10%",
    width: "80%",
    height: "80%",
    zIndex: 1
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(CropModal));
