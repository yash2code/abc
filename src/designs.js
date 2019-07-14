import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import Fab from "@material-ui/core/Fab";
import Card from "./components/Card/Card.jsx";
import CardBody from "./components/Card/CardBody.jsx";
import CardHeader from "./components/Card/CardHeader.jsx";
import image from "./assets/img/designsBGFinal.jpg";
import image2 from "./assets/img/finalResult.jpg";
import { updateButtons } from "./actions/buttonController";

import Close from "@material-ui/icons/Close";

import "./design.css";

function mapStateToProps(state) {
  return {
    // for when designs redux is added
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class Designs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: []
    };
    this.props.updateButtons({ menu: true });
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"getMyDesign","params":{"user_id": "' +
        localStorage.getItem("userId") +
        '",  "app_type":"web" ,"token": "kedc0tayb4wo6tbnx1x5utbkdpnz6ux1"}}'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.success == true) {
          this.setState({ designs: response.DATA });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  delete(obj) {
    console.log(obj);
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"deleteDesign","params": {"id":"' +
        obj.id +
        '","token" :"x7q7dm61x1yym42f2zm9wgezuwi52rzj"}}'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.success == true) {
          fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:
              '{"action":"getMyDesign","params":{"user_id": "' +
              localStorage.getItem("userId") +
              '","app_type": "web","token": "kedc0tayb4wo6tbnx1x5utbkdpnz6ux1"}}'
          })
            .then(response => response.json())
            .then(response => {
              console.log(response);
              if (response.success == true) {
                this.setState({ designs: response.DATA });
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <img
          src={image}
          alt="bgImage"
          className={classNames(classes.backgroundImage, "fadeInTwo")}
        />
        <Card className={classNames(classes.mainCard, "fadeIn")}>
          <CardHeader className={classes.cardHeader}>
            <Typography variant="h6" className={classes.headerText}>
              My Designs
            </Typography>
          </CardHeader>
          <CardBody>
            <GridContainer justify="center" className={classes.container}>
              {this.state.designs.map((obj, i) => (
                <GridItem key={i} xs={5}>
                  <div
                    className={classNames({
                      draftHeader: !obj.showHeader,
                      submittedHeader: obj.showHeader
                    })}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        color: obj.showHeader ? "#fff" : "#000"
                      }}
                    >
                      {obj.showHeader ? "Submitted" : "Draft"}
                    </Typography>
                  </div>
                  <Fab
                    className={classes.deleteButton}
                    style={{
                      backgroundColor: obj.showHeader ? "#ff0000" : "#f6f6f6"
                    }}
                    onClick={() => {
                      this.delete(obj);
                    }}
                    aria-label="deleteButton"
                  >
                    <Close
                      style={{ color: obj.showHeader ? "#fff" : "#000" }}
                    />
                  </Fab>
                  <Card className={classes.designCard}>
                    <CardBody
                      className={classes.designCardBody}
                      style={{ background: `url(${obj.background_image})` }}
                      onClick={() => {
                        localStorage.setItem("draft_image", obj.data[0].image);
                        // redirect: window.location.replace("/dashboard") ;
                        this.props.history.push({
                          pathname: "/dashboard",
                          state: obj
                        });
                      }}
                    />
                  </Card>
                  <Typography
                    variant="body2"
                    className={classes.designAttributes}
                  >
                    {obj.title} -{" "}
                    {new Date(obj.created_date).toLocaleDateString()}
                  </Typography>
                </GridItem>
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const style = {
  main: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
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
  mainCard: {
    zIndex: 2,
    width: "66vw",
    height: "76vh",
    position: "absolute",
    left: "17vw",
    top: "10vh",
    verticalAlign: "middle",
    "@media (max-width:767px)": {
      marginTop: "90px"
    }
  },
  container: {
    overflowY: "scroll",
    maxHeight: "68vh",
    marginTop: "1.5vh"
  },
  backgroundImage: {
    height: "100vh",
    margin: "0",
    padding: "0"
  },
  cardHeader: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 500,
    padding: "1vh",
    backgroundColor: "#252525",
    textAlign: "center",
    color: "#fff",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)"
  },
  headerText: {
    fontFamily: "Montserrat, sans-serif",
    color: "#fff !important",
    fontWeight: 600,
    textAlign: "center",
    lineHeight: "4vh"
  },
  designCard: {
    height: "24vh",
    borderRadius: "6px"
  },
  designCardBody: {
    width: "auto",
    height: "22vh",
    borderRadius: "6px",
    backgroundSize: "100% 100% !important"
  },
  designAttributes: {
    transform: "translateY(-2.5vh)",
    fontSize: "1.2em",
    textAlign: "right !important",
    "@media (max-width: 767px)": {
      fontSize: "13px"
    }
  },
  deleteButton: {
    width: "3vw",
    height: "3vw",
    position: "absolute",
    right: "0vw",
    top: "2vh",
    zIndex: 5,
    "@media (max-width: 767px)": {
      width: "20%"
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Designs));
