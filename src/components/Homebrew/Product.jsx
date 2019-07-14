import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import axios from "axios";
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  updateShow,
  resetGuides,
  updateCanvas
} from "../../actions/dashboardController";
import { updateButtons } from "../../actions/buttonController";
const toDataUrl = async (url, callback) => {

  try {

    console.log("urlurlurl ", url);

    let datafromAPI = await axios.get("http://localhost:3000/static/media/citrus.f77f7ee4.jpg", { responseType: 'arraybuffer', crossDomain: true });
    //let datafromAPI = await axios.get(url,{responseType: 'arraybuffer',crossDomain: true});

    let image = new Buffer(datafromAPI.data, 'binary').toString('base64');
    //console.log("imageimageimage ",image);
    let data = `data:${datafromAPI.headers['content-type'].toLowerCase()};base64,${image}`;
    //console.log(data);
    callback(data)

    //return data;

  } catch (error) {
    console.log("geting error datafromAPIdatafromAPI::::::::::::::::  ", error);

  }


};
function mapStateToProps(state) {
  return {
    menu: state.buttonReducer.menu,
    crop: state.modalReducer.crop,
    showWithGuides: state.dashboardReducer.showWithGuides,
    currentCutout: state.dashboardReducer.currentCutout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateShow: data => dispatch(updateShow(data)),
    resetGuides: () => dispatch(resetGuides()),
    updateButtons: data => dispatch(updateButtons(data)),
    updateCanvas: data => dispatch(updateCanvas(data))
  };
}

const style = {
  cutout: {
    padding: "10%",
    width: "80%",
    height: "80%",
    zIndex: 1
  }
};

var canvas = null;
var dataURI = null;
var ctx = null;
var isPress = false;
var old = null;

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const { data, canvasId } = this.props;

    // console.log("enable erasing............." + this.props.enable);
    //console.log("data.cutImage  ", data.cutImage);

    // let blob = await fetch(data.cutImage,{mode: 'no-cors'}).then(r => r.blob());
    // let dataUrl = await new Promise(resolve => {
    //   let reader = new FileReader();
    //   console.log("reader.result   ",reader.result);

    //   reader.onload = () => resolve(reader.result);
    //   reader.readAsDataURL(blob);
    // });
    // console.log("dataUrldataUrl ----->>>>>>>>>>> ",dataUrl);
    await toDataUrl(data.cutImage, (myBase64) => {
      console.log("myBase64   ", myBase64); // myBase64 is the base64 string
      canvas = document.getElementById(canvasId);
      ctx = canvas.getContext("2d");

      var img = new Image();
      img.src = myBase64;
      img.onload = function () {
        var width = Math.min(500, img.width);
        var height = img.height * (width / img.width);

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        console.log("canvas.toDataURL() ::::::::: ", canvas);
      };
    });





  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.currentCutout !== this.props.currentCutout) {
      // console.log("canvas get change to erase: " + this.props.currentCutout);
      let canvasid = "drawCanvas" + this.props.currentCutout;
      canvas = document.getElementById(canvasid);
      ctx = canvas.getContext("2d");
    }

    if (prevProp.enable !== this.props.enable) {
      // console.log("eraser ability get changed to: " + this.props.enable);
      if (this.props.enable) {
        canvas.addEventListener("mousedown", this.eraseStart);
        canvas.addEventListener("mousemove", this.erase);
        canvas.addEventListener("mouseup", this.eraseEnd);
      } else {
        canvas.removeEventListener("mousedown", this.eraseStart);
        canvas.removeEventListener("mousemove", this.erase);
        canvas.removeEventListener("mouseup", this.eraseEnd);
      }
    }

    if (prevProp.crop !== this.props.crop) {
      if (this.props.crop) {
        this.props.updateCanvas(canvas.toDataURL());
      } else {
        // this.props.updateCanvas(canvas);
      }
      console.log("Crop value is:************" + this.props.crop);
    }
  }

  eraseStart(e) {
    isPress = true;
    old = { x: e.offsetX, y: e.offsetY };
  }

  eraseEnd(e) {
    isPress = false;
    dataURI = canvas.toDataURL();
    // this.props.updateCanvas(dataURI);
  }

  erase(e) {
    if (isPress) {
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      old = { x: x, y: y };
    }
  }

  render() {
    const { classes, data, flipStyle, canvasId } = this.props;
    console.log("product classesclasses ", classes);

    return (
      <canvas
        id={canvasId}
        alt={data.name}
        className={classNames(classes.cutout, "fadeIn")}
        style={flipStyle}
        onClick={() => {
          if (!this.props.show) {
            this.props.resetGuides();
            this.props.updateShow({ showWithGuides: true });
            this.props.updateButtons({ menu: false });
          }
        }}
      />
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  enable: PropTypes.bool
};

Product.defaultProps = {
  enable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Product));
