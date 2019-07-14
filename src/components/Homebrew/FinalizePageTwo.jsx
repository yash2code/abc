import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShare } from "../../actions/modalController";
import {
  updateFinalizePage,
  updateFinalizeData
} from "../../actions/finalizeController";
import withStyles from "@material-ui/core/styles/withStyles";
import CardBody from "../Card/CardBody.jsx";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ButtonMaterial from "@material-ui/core/Button";
import FinalizePageOne from "./FinalizePageOne.jsx";
import FinalizePageThree from "./FinalizePageThree.jsx";
import BG from "../../assets/img/finalResult.jpg";

function mapStateToProps(state) {
  return {
    share: state.modalReducer.share,
    plants: state.finalizeReducer.plants,
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
    updateFinalizeData: data => dispatch(updateFinalizeData(data))
  };
}

class FinalizePageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternatingColor: ["#fff", "#f6f6f6"],
      slide: 0
    };
    this.handleTabs = this.handleTabs.bind(this);
  }
  handleTabs(event, value) {
    this.setState({
      slide: value
    });
  }
  save(stepsForward){
        if(this.props.morning){
          var meet_time = 'Morning';
        }else if(this.props.afternoon){
          var meet_time = 'Afternoon';
        }else if(this.props.night){
          var meet_time = 'Night';
        }else{
          var meet_time = 'Anytime';
        }
        fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body : '{"action":"setDesign","params":{"background_images":"'+ this.props.imageUrl +'","best_time_to_call":"'+meet_time+'","comments":"Need to add more plant","created_date":"2019-05-17 16:00:12","designType":"submitted","preview_snaps":"http://cssent.com/t/rn1/r1.jpg","productsarray":"94","search_key":"backyard,small plant,green","share_url":"https://www.facebook.com/moonvalleynursery/","snaps":"https://ecomdiag.blob.core.windows.net/mvndev/I9YjftG286.jpg","title":"test","token":"dapyhnthgrf0ar02tq5qog2unuin61p7","user_email":"'+localStorage.getItem('email')+'","user_id":"'+localStorage.getItem('userId')+'","user_name":"test","user_phone":"1234567891","data":[{"height":150,"image":"'+ this.props.imageUrl +'","key":"1","lastOffsetX":303.75,"lastOffsetY":236,"left":303.75,"productId":"94","rotate":"0.71rad","scale":1.7705869185145997,"top":236,"type":"Image1","viewHeight":100,"viewWidth":100,"width":150}]}}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.success == true) {
          this.props.updateFinalizePage(2, stepsForward)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { classes } = this.props;
    var display;
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
        active: false,
        completed: true,
        bodyContent: <FinalizePageTwo imageUrl={this.props.imageUrl}/>
      },
      {
        stepName: "Share",
        header: "Schedule With Our Design Consultant",
        active: true,
        completed: false,
        bodyContent: <FinalizePageThree imageUrl={this.props.imageUrl}/>
      }
    ];
    var stepsBackward = [
      {
        stepName: "Your Information",
        header: "Schedule With Our Design Consultant",
        active: true,
        completed: false,
        bodyContent: <FinalizePageOne imageUrl={this.props.imageUrl}/>
      },
      {
        stepName: "Save & Send",
        header: "Schedule With Our Design Consultant",
        active: false,
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
    const Spec = (
      <div>
        <GridContainer justify="center" className={classes.lineItemContainer}>
          <GridItem xs={10} className={classes.lineItemHeader}>
            <GridContainer justify="center" className={classes.formContainer}>
              <GridItem xs={4}>
                <Typography variant="body1" className={classes.header}>
                  Name
                </Typography>
              </GridItem>
              <GridItem xs={5}>
                <Typography variant="body1" className={classes.header}>
                  Scientific Name
                </Typography>
              </GridItem>
              <GridItem xs={3}>
                <Typography variant="body1" className={classes.headerQuantity}>
                  Quantity
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.props.plants.map((obj, i) => (
            <GridItem
              xs={10}
              key={i}
              className={classes.lineItem}
              style={{
                backgroundColor: this.state.alternatingColor[
                  i % this.state.alternatingColor.length
                ]
              }}
            >
              <GridContainer justify="flex-start" className={classes.lineItem}>
                <GridItem xs={4}>
                  <Typography variant="body1" className={classes.item}>
                    {obj.name}
                  </Typography>
                </GridItem>
                <GridItem xs={5}>
                  <Typography variant="body2" className={classes.itemSci}>
                    {obj.sci}
                  </Typography>
                </GridItem>
                <GridItem xs={3}>
                  <Typography variant="body2" className={classes.itemQuantity}>
                    {obj.quantity}
                  </Typography>
                </GridItem>
              </GridContainer>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
    const Preview = (
      <GridContainer justify="center" className={classes.previewContain}>
        <GridItem xs={10} className={classes.gridItem}>
          <img src={this.props.imageUrl} alt="preview" className={classes.preview} />
        </GridItem>
      </GridContainer>
    );
    if (this.state.slide === 1) {
      display = Spec;
    } else {
      display = Preview;
    }
    return (
      <CardBody>
        <GridContainer justify="center">
          <GridItem xs={6}>
            <Tabs
              variant="fullWidth"
              value={this.state.slide}
              onChange={this.handleTabs}
              classes={{ indicator: classes.tabSlider }}
              className={classes.tabsContainer}
            >
              <Tab label="Preview" />
              <Tab label="Specification" />
            </Tabs>
          </GridItem>
        </GridContainer>
        {display}
        <GridContainer justify="center" className={classes.firstButton}>
          <GridItem xs={5}>
            <ButtonMaterial
              id="submit2"
              variant="contained"
              size="large"
              className={classes.buttonAsk}
              onClick={() => this.save(stepsForward)}
            >
              Submit Design
            </ButtonMaterial>
          </GridItem>
          <GridItem xs={5}>
            <ButtonMaterial
              id="cancel2"
              variant="outlined"
              size="large"
              className={classes.buttonCancel}
              onClick={() => this.props.updateFinalizePage(0, stepsBackward)}
            >
              Back
            </ButtonMaterial>
          </GridItem>
        </GridContainer>
      </CardBody>
    );
  }
}

const style = {
  previewContain: {
    marginTop: "2vh"
  },
  preview: {
    borderRadius: "15px",
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "auto",
    height: "36.5vh",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  lineItemHeader: {
    height: "8vh",
    backgroundColor: "#f6f6f6"
  },
  lineItemContainer: {
    marginTop: "2vh",
    maxHeight: "41vh",
    overflowY: "scroll"
  },
  lineItem: {
    height: "5vh",
    overflow: "hidden"
  },
  header: {
    textDecoration: "underline",
    textUnderlinePosition: "under",
    textAlign: "left",
    fontWeight: 600,
    opacity: 0.7,
    height: "8vh",
    lineHeight: "8vh"
  },
  headerQuantity: {
    textAlign: "center",
    textDecoration: "underline",
    textUnderlinePosition: "under",
    fontWeight: 600,
    opacity: 0.7,
    height: "8vh",
    lineHeight: "8vh"
  },
  item: {
    height: "6vh",
    paddingTop: "1vh",
    textAlign: "left"
  },
  itemSci: {
    height: "6vh",
    paddingTop: "1.2vh",
    textAlign: "left"
  },
  itemQuantity: {
    height: "6vh",
    paddingTop: "1.2vh"
  },
  firstButton: {
    width: "100%",
    marginTop: "10wh"
    // position: "absolute",
    // bottom: "1vh"
  },
  tabsContainer: {
    textAlign: "center"
  },
  tabSlider: {
    backgroundColor: "#ff0000"
  },
  buttonAsk: {
    marginTop: "2vh",
    marginBottom: "4vh",
    backgroundColor: "#ff0000",
    color: "#fff",
    width: "auto",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  buttonCancel: {
    marginTop: "2vh",
    marginBottom: "4vh",
    width: "auto"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(FinalizePageTwo));
