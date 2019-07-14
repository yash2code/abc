import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { updateSave } from "../../actions/modalController";
import { updateButtons } from "../../actions/buttonController";
import { handleNavigation } from "../../actions/navigationController";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import ButtonMaterial from "@material-ui/core/Button";
import BG from "../../assets/img/finalResult.jpg";

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

class CropModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.currentCanvas
    };
    // this.props.updateButtons({ menu: false });
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.currentCanvas);
    return (
      <Card className={classNames(classes.root, "fadeIn")}>
        <CardHeader className={classes.cardHeader}>
          <Typography variant="body1" className={classes.headerText}>
            Crop Design Draft
          </Typography>
        </CardHeader>
        <CardBody>
          <img
            src={this.props.currentCanvas}
            alt="preview"
            className={classes.cardBodyContain}
          />
        </CardBody>
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
    height: "54vh",
    // marginLeft: "17vw",
    marginTop: "24vh"
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
