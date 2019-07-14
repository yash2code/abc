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

var min_width, min_height, max_width, max_height;
var resizeContainer = null;
var image_target = null;
var resize_canvas = null;
var orig_src = null;
var event_state = {};
var constrain = false;

class CropModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    resizeContainer = document.getElementById("resize-container");
    image_target = document.getElementById("resize-image");

    orig_src = new Image();
    event_state = {};
    constrain = false;
    min_width = 60;
    min_height = 60;
    max_width = 800;
    max_height = 900;
    resize_canvas = document.createElement("canvas");
    orig_src.src = image_target.src;
    resizeContainer.addEventListener("mousedown", this.startResize);
    resizeContainer.addEventListener("mousemove", this.resizing);
    resizeContainer.addEventListener("mouseup", this.endResize);
  }

  startResize(e) {
    e.preventDefault();
    e.stopPropagation();

    let offset = resizeContainer.getBoundingClientRect();

    event_state.container_width = offset.width;
    event_state.container_height = offset.height;
    event_state.container_left = offset.left;
    event_state.container_top = offset.top;
    event_state.mouse_x =
      (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) +
      window.scrollX;
    event_state.mouse_y =
      (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) +
      window.scrollY;

    // This is a fix for mobile safari
    // For some reason it does not allow a direct copy of the touches property

    // if (typeof e.originalEvent.touches !== "undefined") {
    //   event_state.touches = [];
    //   e.originalEvent.touches.map((i, ob) => {
    //     event_state.touches[i] = {};
    //     event_state.touches[i].clientX = 0 + ob.clientX;
    //     event_state.touches[i].clientY = 0 + ob.clientY;
    //   });
    // }
    event_state.touches = {};
    event_state.touches.clientX = 0 + e.clientX;
    event_state.touches.clientY = 0 + e.clientY;
    event_state.event = e;
  }

  endResize(e) {
    e.preventDefault();
    resizeContainer.removeEventListener("mousedown", this.startResize);
    resizeContainer.removeEventListener("mouseup", this.endResize);
    resizeContainer.removeEventListener("mousemove", this.resizing);
  }

  resizing(e) {
    console.log("mous eu[=====================p]");
    var mouse = {},
      width,
      height,
      left,
      top,
      offset = resizeContainer.getBoundingClientRect();
    mouse.x =
      (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) +
      window.scrollX;
    mouse.y =
      (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) +
      window.scrollY;

    width = mouse.x - event_state.container_left;
    height = mouse.y - event_state.container_top;
    left = event_state.container_left;
    top = event_state.container_top;

    if (constrain || e.shiftKey) {
      height = (width / orig_src.width) * orig_src.height;
    }

    if (
      width > min_width &&
      height > min_height &&
      width < max_width &&
      height < max_height
    ) {
      // this.resizeImage(width, height);
      resize_canvas.width = width;
      resize_canvas.height = height;
      resize_canvas.getContext("2d").drawImage(orig_src, 0, 0, width, height);
      image_target.src = resize_canvas.toDataURL("image/png");
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      // resizeContainer.offset({ left: left, top: top });
      image_target.style.left = left;
      image_target.style.top = top;
    }
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.currentCanvas);
    return (
      <Card className={classNames(classes.root, "fadeIn")}>
        <CardHeader className={classes.cardHeader}>
          <Typography variant="body1" className={classes.headerText}>
            Crop Design Draft
          </Typography>
        </CardHeader>
        <div id="resize-container" className="resize-container">
          <span className="resize-handle resize-handle-nw" />
          <span className="resize-handle resize-handle-ne" />
          <img
            id="resize-image"
            className="resize-image"
            src={this.props.currentCanvas}
            alt="preview"
          />
          <span className="resize-handle resize-handle-se" />
          <span className="resize-handle resize-handle-sw" />
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
