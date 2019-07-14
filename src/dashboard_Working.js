import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Check from "@material-ui/icons/Check";
import Clipboard from "./assets/img/clipboard-text.svg";
import Crop from "@material-ui/icons/Crop";
import Flip from "@material-ui/icons/Flip";
import Duplicate from "./assets/img/content-copy.svg";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Erase from "./assets/img/eraser.svg";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import Rotate from "@material-ui/icons/Rotate90DegreesCcw";
import ExpandMore from "./assets/img/arrow-expand.svg";
import frame from "./assets/img/frame.png";
// import Product from "./components/Product/Product.jsx";
import {
  updateShow,
  updateBackground,
  handleCutout,
  resetGuides,
  removeItem,
  duplicateItem
} from "./actions/dashboardController";
import { updateDrawer, updateSearchShow } from "./actions/drawerController";
import { updateShare, updateSave, updateSpec } from "./actions/modalController";
import { updateButtons } from "./actions/buttonController";
import { nextTutorialStep, resetTutorial } from "./actions/tutorialController";

import "./dashboard.css";
import "./animate.css";

import DrawerMenus from "./components/Homebrew/DashBottomDrawer.jsx";
import ShareModal from "./components/Homebrew/FinalizeModal.jsx";
import SpecModal from "./components/Homebrew/SpecificationModal.jsx";
import SaveModal from "./components/Homebrew/SaveModal.jsx";

import BG from "./assets/img/dashboardBGFinal.jpg";

function mapStateToProps(state) {
  return {
    menu: state.buttonReducer.menu,
    search: state.drawerReducer.search,
    bottom: state.drawerReducer.bottom,
    showWithGuides: state.dashboardReducer.showWithGuides,
    showData: state.dashboardReducer.showData,
    currentCutout: state.dashboardReducer.currentCutout,
    backgroundSource: state.dashboardReducer.backgroundSource,
    share: state.modalReducer.share,
    save: state.modalReducer.save,
    spec: state.modalReducer.spec,
    tutorialStep: state.tutorialReducer.step,
    isRunning: state.tutorialReducer.isRunning,
    splash: state.tutorialReducer.splash
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchShow: search => dispatch(updateSearchShow(search)),
    updateDrawer: drawerState => dispatch(updateDrawer(drawerState)),
    updateShow: obj => dispatch(updateShow(obj)),
    updateBackground: src => dispatch(updateBackground(src)),
    handleCutout: cutout => dispatch(handleCutout(cutout)),
    resetGuides: () => dispatch(resetGuides()),
    removeItem: item => dispatch(removeItem(item)),
    duplicateItem: item => dispatch(duplicateItem(item)),
    updateShare: share => dispatch(updateShare(share)),
    updateSave: save => dispatch(updateSave(save)),
    updateSpec: spec => dispatch(updateSpec(spec)),
    updateButtons: data => dispatch(updateButtons(data)),
    nextTutorialStep: () => dispatch(nextTutorialStep()),
    resetTutorial: () => dispatch(resetTutorial())
  };
}

var defaultFlip = {};
var container = null;
var canvases = [];
var enableDrag = false;
var enableRotate = false;
var enableResize = false;
var currentIndex = 0;

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      drawerState: "",
      first: true,
      firstSecondary: true,
      confirmationIcons: false,
      enableFlip: false
    };
    this.onChange = this.onChange.bind(this);
    this.props.updateButtons({ menu: true });
  }

  componentDidMount() {}

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.currentCutout !== this.props.currentCutout) {
      // console.log(this.props.currentCutout);
      currentIndex = this.props.currentCutout;
    }
  }

  componentWillUnmount() {
    this.props.updateBackground("");
    this.removeListeners();
  }

  handleContainerEvents() {
    if (document.getElementById("container")) {
      container = document.getElementById("container");
      container.addEventListener("mousedown", this.dragStart, false);
      container.addEventListener("mouseup", this.dragEnd, false);
      container.addEventListener("mousemove", this.handleEvents, false);
    }
  }

  removeListeners() {
    if (container !== null) {
      container.removeEventListener("mousedown", this.dragStart, false);
      container.removeEventListener("mouseup", this.dragEnd, false);
      container.removeEventListener("mousemove", this.handleEvents, false);
    }
  }

  dragStart(e) {
    // console.log(`drag_Start[ ${currentIndex} ]`);
    enableDrag = true;
    canvases[currentIndex].initialX =
      e.clientX - canvases[currentIndex].xOffset;
    canvases[currentIndex].initialY =
      e.clientY - canvases[currentIndex].yOffset;
  }

  dragEnd(e) {
    // console.log(`drag_End[ ${currentIndex} ]`);
    canvases[currentIndex].initialX = canvases[currentIndex].currentX;
    canvases[currentIndex].initialY = canvases[currentIndex].currentY;
    enableDrag = false;
    enableRotate = false;
    enableResize = false;
  }

  handleEvents(e) {
    if (enableDrag && !enableRotate && !enableResize) {
      // console.log(`dragging....currentPlant[ ${currentIndex} ]`);
      e.preventDefault();

      canvases[currentIndex].currentX =
        e.clientX - canvases[currentIndex].initialX;
      canvases[currentIndex].currentY =
        e.clientY - canvases[currentIndex].initialY;

      canvases[currentIndex].xOffset = canvases[currentIndex].currentX;
      canvases[currentIndex].yOffset = canvases[currentIndex].currentY;

      canvases[currentIndex].currentCanvas.style.transform =
        "translate3d(" +
        canvases[currentIndex].currentX +
        "px, " +
        canvases[currentIndex].currentY +
        "px, 0)";
    }

    if (enableRotate) {
      // console.log(`rotating......currentPlant[ ${currentIndex} ]`);
      e.preventDefault();
      var canvasRects = canvases[
        currentIndex
      ].currentCanvas.getBoundingClientRect();
      var canvasX = canvasRects.left + canvasRects.width / 2;
      var canvasY = canvasRects.top + canvasRects.height / 2;
      canvases[currentIndex].currentCanvas.style.transform =
        "rotate(" +
        Math.atan2(e.clientY - canvasY, e.clientX - canvasX) +
        "rad)";
      canvases[currentIndex].currentCanvas.style.webkitTransform =
        "rotate(" +
        Math.atan2(e.clientY - canvasY, e.clientX - canvasX) +
        "rad)";
    }

    if (enableResize) {
      // console.log(`resize to......currentPlant[ ${currentIndex} ]`);
      e.preventDefault();
      let canvasRect = canvases[
        currentIndex
      ].currentCanvas.getBoundingClientRect();
      canvases[currentIndex].currentCanvas.style.width =
        e.pageX - canvasRect.left + "px";
      canvases[currentIndex].currentCanvas.style.height =
        e.pageY - canvasRect.top + "px";
      canvases[currentIndex].currentCanvas.style.backgroundSize = `${e.pageX -
        canvasRect.left +
        1}px ${e.pageY - canvasRect.top + 1}px`;
    }
  }

  onChange = e => {
    var reader = new FileReader();
    let react = this;
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function() {
      react.props.updateBackground(reader.result);
    };
    if (this.props.tutorialStep === 0 && this.props.isRunning) {
      this.props.nextTutorialStep();
    }
  };

  cutoutFabs = () => {
    const { classes } = this.props;
    return (
      <div className={"fadeInTwo"}>
        <Fab
          color="primary"
          size="small"
          aria-label="Rotate"
          className={classes.rotateFrameFab}
          onMouseDown={() => {
            // console.log(`onMouseDown rotate_Start[ ${currentIndex} ]`);
            enableRotate = true;
          }}
          onMouseUp={() => {
            // console.log(`onMouseUp rotate_End[ ${currentIndex} ]`);
            enableRotate = false;
          }}
        >
          <Rotate />
        </Fab>
        <Fab
          color="primary"
          size="small"
          aria-label="Expand"
          className={classes.expandFrameFab}
          onMouseDown={() => {
            // console.log(`onMouseDown resize_Start[ ${currentIndex} ]`);
            enableResize = true;
          }}
          onMouseUp={() => {
            // console.log(`onMouseUp resize_End[ ${currentIndex} ]`);
            enableResize = false;
          }}
        >
          <img
            src={ExpandMore}
            alt="expandMore"
            className={classes.expandFrameIcon}
          />
        </Fab>
      </div>
    );
  };

  handleCanvas() {
    const { classes } = this.props;
    this.handleContainerEvents();
    return (
      <div
        id="container"
        className={classNames(classes.imageContainer, {
          shiftRight: this.props.spec,
          shiftLeft: !this.props.spec && !this.state.first,
          startDash: !this.props.spec && this.state.first
        })}
      >
        {this.props.showData.map((obj, i) => {
          let c_id = "currentCanvas" + i;
          if (canvases[i]) {
            defaultFlip = {
              transform: canvases[i].isFlipped ? "scaleX(1)" : "scaleX(-1)",
              WebkitTransform: canvases[i].isFlipped
                ? "scaleX(1)"
                : "scaleX(-1)"
            };
          }
          return (
            <div
              key={i}
              id={c_id}
              className={classNames(classes.frame, {
                noBG: !obj.showGuides
              })}
              style={{
                backgroundImage: "url(" + frame + ")",
                backgroundSize: `${obj.width + 1}vw ${obj.height + 1}vh`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: obj.width + "vw",
                height: obj.height + "vh",
                left: obj.xPos + "vw",
                top: obj.yPos / 2 + "vh"
              }}
              onLoad={() => {
                this.setState({ enableFlip: !this.state.enableFlip });
                if (!canvases[i]) {
                  canvases.push({
                    currentCanvas: document.getElementById(c_id),
                    currentX: null,
                    currentY: null,
                    initialX: null,
                    initialY: null,
                    xOffset: 0,
                    yOffset: 0,
                    isFlipped: false
                  });
                }
              }}
              onClick={() => {
                this.props.handleCutout(i);
                currentIndex = i;
              }}
            >
              <div className={classNames({ hidden: !obj.showGuides })}>
                {this.cutoutFabs()}
              </div>
              <img
                src={obj.cutImage}
                alt={obj.name}
                className={classNames(classes.cutout, "fadeIn")}
                style={defaultFlip}
                onClick={() => {
                  if (!this.props.show) {
                    this.props.resetGuides();
                    // this.props.handleCutout(i);
                    this.props.updateShow({ showWithGuides: true });
                    this.props.updateButtons({ menu: false });
                  }
                }}
              />
            </div>
          );
        })}
        <img
          src={this.props.backgroundSource}
          className={classNames(classes.image, "fadeIn")}
          key="backgroundCanvas"
          alt="background"
          onClick={() => {
            if (this.props.spec) {
              this.props.updateSpec(false);
              this.props.updateButtons({ menu: true });
            } else if (
              this.props.tutorialStep !== 4 &&
              this.props.tutorialStep !== 5
            ) {
              this.props.resetGuides();
              this.props.updateButtons({ menu: true });
              this.setState({ firstSecondary: true });
            }
          }}
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    var image, icons, modal;

    const mainIcons = (
      <div>
        <Fab
          color="primary"
          aria-label="Finalize"
          className={classNames(classes.fab2, "fab")}
          onClick={() => {
            if (this.props.tutorialStep !== 6) {
              this.props.updateShare(!this.props.share);
            }
          }}
        >
          <Check className={classes.check} />
        </Fab>
        <Fab
          color="primary"
          aria-label="Save"
          className={classNames(classes.saveFab, "fab")}
          onClick={() => {
            if (this.props.tutorialStep !== 6) {
              this.props.updateSave(!this.props.save);
            }
          }}
        >
          <Save className={classes.save} />
        </Fab>
        <Fab
          color="primary"
          aria-label="Add"
          className={classNames(classes.fab, "fab")}
          onClick={() => {
            if (this.props.tutorialStep === 1) {
              this.props.updateDrawer(!this.props.bottom);
              this.props.nextTutorialStep();
            } else if (this.props.tutorialStep !== 6) {
              this.props.updateDrawer(!this.props.bottom);
            }
          }}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="Specification"
          className={classNames(classes.specFab, "fab")}
          onClick={() => {
            if (this.props.tutorialStep !== 6) {
              this.setState({ first: false });
              this.props.updateSpec(!this.props.spec);
              this.props.updateButtons({ menu: !this.props.menu });
            }
          }}
        >
          <img src={Clipboard} alt="specification" className={classes.list} />
        </Fab>
      </div>
    );
    const secondaryIcons = (
      <GridContainer
        justify="center"
        className={classNames(classes.secondaryIconsContainer, {
          pullRight: this.state.confirmationIcons,
          pullLeft: !this.state.confirmationIcons
        })}
      >
        <GridItem xs={12}>
          <Tooltip
            open={this.props.tutorialStep === 5}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Crop"
            placement="left"
          >
            <Fab
              color="primary"
              aria-label="Crop"
              className={classes.secondaryFab}
              onClick={() => {
                if (this.props.tutorialStep !== 5) {
                  this.setState({
                    confirmationIcons: true,
                    firstSecondary: false
                  });
                }
              }}
            >
              <Crop />
            </Fab>
          </Tooltip>
        </GridItem>
        <GridItem xs={12}>
          <Tooltip
            open={this.props.tutorialStep === 5}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Duplicate"
            placement="left"
          >
            <Fab
              color="primary"
              aria-label="Duplicate"
              className={classes.secondaryFab}
              onClick={() => {
                if (this.props.tutorialStep !== 5) {
                  this.props.duplicateItem(this.props.currentCutout);
                }
              }}
            >
              <img
                src={Duplicate}
                alt="duplicate"
                className={classes.secondaryIconImage}
              />
            </Fab>
          </Tooltip>
        </GridItem>
        <GridItem xs={12}>
          <Tooltip
            open={this.props.tutorialStep === 5}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Flip"
            placement="left"
          >
            <Fab
              color="primary"
              aria-label="Flip"
              className={classes.secondaryFab}
              onClick={() => {
                if (this.props.tutorialStep !== 5) {
                  // todo write flip method
                  this.setState({ enableFlip: true });

                  if (!canvases[this.props.currentCutout].isFlipped) {
                    canvases[this.props.currentCutout].isFlipped = true;
                  } else {
                    canvases[this.props.currentCutout].isFlipped = false;
                  }
                  console.log(canvases);
                }
              }}
            >
              <Flip />
            </Fab>
          </Tooltip>
        </GridItem>
        <GridItem xs={12}>
          <Tooltip
            open={this.props.tutorialStep === 5}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Erase Yard"
            placement="left"
          >
            <Fab
              color="primary"
              aria-label="Erase"
              className={classes.secondaryFab}
              onClick={() => {
                if (this.props.tutorialStep !== 5) {
                  this.setState({
                    confirmationIcons: true,
                    firstSecondary: false
                  });
                }
              }}
            >
              <img
                src={Erase}
                alt="eraser"
                className={classes.secondaryIconImage}
              />
            </Fab>
          </Tooltip>
        </GridItem>
        <GridItem xs={12}>
          <Tooltip
            open={this.props.tutorialStep === 5}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Delete"
            placement="left"
          >
            <Fab
              color="primary"
              aria-label="Delete"
              className={classes.secondaryFab}
              onClick={() => {
                if (this.props.tutorialStep !== 5) {
                  this.props.removeItem(this.props.currentCutout);
                  this.props.updateShow({ showWithGuides: false });
                  this.props.updateButtons({ menu: true });
                  this.setState({ firstSecondary: true });
                }
              }}
            >
              <Delete />
            </Fab>
          </Tooltip>
        </GridItem>
      </GridContainer>
    );
    const confirmationIcons = (
      <GridContainer
        justify="center"
        className={classNames(classes.confirmationIconsContainer, {
          pullRight:
            !this.state.confirmationIcons && !this.state.firstSecondary,
          pullLeft: this.state.confirmationIcons,
          pullHold: !this.state.confirmationIcons && this.state.firstSecondary
        })}
      >
        <GridItem xs={12}>
          <Fab
            color="primary"
            aria-label="Yes"
            className={classes.confirmationFab}
            onClick={() => {
              this.setState({ confirmationIcons: false });
            }}
          >
            <Check className={classes.confirmationIcons} />
          </Fab>
        </GridItem>
        <GridItem xs={12}>
          <Fab
            color="primary"
            aria-label="No"
            className={classes.confirmationFab}
            onClick={() => {
              this.setState({ confirmationIcons: false });
            }}
          >
            <Close className={classes.confirmationIcons} />
          </Fab>
        </GridItem>
      </GridContainer>
    );

    if (this.props.backgroundSource !== "") {
      if (!this.props.menu && !this.props.showWithGuides) {
        icons = <div />;
      } else if (this.props.showWithGuides) {
        icons = (
          <div>
            {secondaryIcons}
            {confirmationIcons}
          </div>
        );
      } else {
        icons = mainIcons;
      }
      image = this.handleCanvas();
    } else {
      image = (
        <div>
          <div
            className={classNames(classes.border, {
              hidden: this.props.splash && this.props.isRunning
            })}
          >
            <AddIcon className={classes.plus} />
            <Typography variant="body1" className={classes.uploadMessage}>
              Upload your yard photo here
            </Typography>
          </div>
          <Input
            type={"file"}
            onChange={this.onChange}
            className={classes.input}
          />
        </div>
      );
      icons = <div />;
    }
    if (this.props.share) {
      modal = (
        <div>
          <ShareModal />
        </div>
      );
    } else if (this.props.save) {
      modal = (
        <div>
          <SaveModal />
        </div>
      );
    } else if (this.props.spec) {
      modal = (
        <div>
          <SpecModal />
        </div>
      );
    } else {
      modal = <div />;
    }
    return (
      <div className={classes.main}>
        <div className={classNames(classes.bg, "image", "fadeIn")} />
        <div
          className={classNames({
            cover: this.props.tutorialStep === 6
          })}
          onMouseUp={() => {
            enableDrag = false;
            enableRotate = false;
            enableResize = false;
          }}
        />
        {image}
        {icons}
        {modal}
        <Drawer
          anchor="bottom"
          variant="persistent"
          open={this.props.bottom}
          onClose={() => {
            this.props.updateDrawer(!this.props.bottom);
            this.props.updateSearchShow(false);
          }}
        >
          <div className={classes.drawerContainer}>
            <DrawerMenus />
          </div>
        </Drawer>
      </div>
    );
  }
}

const style = {
  main: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    zIndex: -1
  },
  bg: {
    backgroundImage: "url(" + BG + ")",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    opacity: 0.2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    overflow: "hidden"
  },
  bg2: {
    zIndex: 40,
    backgroundImage: "url(" + BG + ")",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    opacity: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  border: {
    width: "40vw",
    height: "30vh",
    border: "2px black dashed",
    top: "35vh",
    left: "28vw",
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center"
  },
  plus: {
    zIndex: 3,
    height: "10vh",
    width: "10vw",
    marginTop: "10vh",
    alignItems: "center",
    color: "#252525",
    opacity: 1
  },
  uploadMessage: {
    marginLeft: "16vw",
    marginTop: "6vh"
  },
  input: {
    zIndex: 3,
    width: "40vw",
    height: "30vh",
    top: "35vh",
    left: "28vw",
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    opacity: 0
  },
  imageContainer: {
    top: 0,
    width: "100vw",
    height: "100vh",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 1
  },
  image: {
    width: "100%",
    height: "100%"
  },
  fab2: {
    zIndex: 3,
    right: "6vw",
    top: "4vh",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ff0000",
    color: "#fff !important",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  saveFab: {
    zIndex: 3,
    right: "6vw",
    top: "13vh",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  fab: {
    zIndex: 3,
    right: "6vw",
    bottom: "4vh",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  specFab: {
    zIndex: 3,
    left: "6vw",
    bottom: "4vh",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  treeCard: {
    overflow: "hidden",
    height: "26vh",
    marginTop: "4vh",
    marginBottom: "3vh",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  },
  Icon: {
    height: "40%",
    width: "40%",
    opacity: 0.5,
    marginLeft: "20%",
    marginTop: "10%"
  },
  check: {
    height: "60%",
    width: "60%",
    color: "#fff"
  },
  save: {
    color: "#fff"
  },
  plantCard: {
    overflow: "hidden",
    height: "26vh",
    marginTop: "4vh",
    marginBottom: "3vh",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  },
  shareCard: {
    textAlign: "left",
    display: "inline-block",
    width: "70vw",
    zIndex: 41,
    marginTop: "16vh"
  },
  back: {
    position: "absolute",
    top: "6vh",
    left: "6vh",
    zIndex: 3
  },
  drawer: {
    height: "100%"
  },
  drawerContainer: {
    maxHeight: "64vh",
    overflow: "hidden"
  },
  secondaryIconsContainer: {
    position: "absolute",
    bottom: "2vh",
    right: "2vw",
    width: "12vw",
    height: "56vh",
    transition: "all 1s",
    zIndex: 2
  },
  list: {
    width: "50%",
    height: "50%"
  },
  secondaryFab: {
    marginRight: "2vw",
    marginTop: "2vh",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  secondaryIconImage: {
    width: "40%",
    height: "40%"
  },
  framedExampleContainer: {
    zIndex: 2,
    position: "absolute",
    top: "57vh",
    left: "23vw",
    padding: "5vh 3vw 5vh 4vw"
  },
  frame: {
    zIndex: 3,
    position: "absolute",
    alignItems: "center"
  },
  cutout: {
    padding: "10%",
    width: "80%",
    height: "80%",
    zIndex: 1
  },
  expandFrameFab: {
    position: "absolute",
    right: "-2.5vw",
    top: "-4.7vh",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ff0000",
    zIndex: 3,
    "&:hover": {
      background: "#fff",
      color: "#000"
    }
  },
  expandFrameIcon: {
    width: "60%",
    height: "60%"
  },
  rotateFrameFab: {
    position: "absolute",
    left: "-4.5vh",
    top: "-4.7vh",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ff0000",
    zIndex: 3,
    "&:hover": {
      background: "#fff",
      color: "#000"
    }
  },
  confirmationIconsContainer: {
    position: "absolute",
    bottom: "2vh",
    right: "2vw",
    width: "12vw",
    height: "22vh",
    transition: "all 1s",
    zIndex: 3
  },
  confirmationFab: {
    marginRight: "2vw",
    marginTop: "2vh",
    backgroundColor: "#ff0000",
    color: "#fff",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  confirmationIcons: {
    width: "55%",
    height: "55%"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Dash));
