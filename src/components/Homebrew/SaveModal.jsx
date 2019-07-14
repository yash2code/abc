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
import htmlToImage from "html-to-image";

let imageData = "";

function mapStateToProps(state) {
  return {
    save: state.modalReducer.save,
    phone: state.registerReducer.phone
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSave: save => dispatch(updateSave(save)),
    updateButtons: data => dispatch(updateButtons(data)),
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}
function base64ToBlob(base64, mime) {
  mime = mime || "";
  var sliceSize = 1024;
  var byteChars = atob(base64);
  var byteArrays = [];

  for (
    var offset = 0, len = byteChars.length;
    offset < len;
    offset += sliceSize
  ) {
    var slice = byteChars.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
}
const dataURItoBlob = dataURI => {
  let byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  let mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  let ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  let blob = new Blob([ab], { type: "image/png" });
  return blob;
};

// const extractImageFileExtensionFromBase64 = base64Data => {
//   return base64Data.substring(
//     "data:image/".length,
//     base64Data.indexOf(";base64")
//   );
// };

class SaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false,
      name: "",
      imageData: "",
      imageUrl: ""
    };
    this.props.updateButtons({ menu: false });
    this.updateName = this.updateName.bind(this);
    //this.getImageContent = this.getImageContent.bind(this);
  }
  componentWillMount() {
    //console.log("llllllllllllllllllllllllllllllllll");
    let node = document.getElementById("container");
    htmlToImage
      .toPng(node)
      .then(async function(dataUrl) {
        console.log("dataUrl  ", dataUrl);

        //  await this.setState({imageData:dataUrl})
        //  imageData=dataUrl
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }
  async componentDidMount() {
    //await this.getImageContent();
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    //setTimeout(() => {
    this.forceUpdate();
    let node = document.getElementById("container");
    let dataUrl = await htmlToImage.toPng(node);
    console.log("dataUrldataUrldataUrl  ", dataUrl);
    imageData = dataUrl;
    localStorage.setItem("imageData", imageData);
    //   .then(async function (dataUrl) {
    //    await this.setState({imageData:dataUrl})
    //   })
    //   .catch(function (error) {
    //   console.error('oops, something went wrong!', error);
    // });
    //}, 5000)
    setTimeout(() => {
      this.forceUpdate();
    }, 50);
  }
  getImageContent() {
    try {
      let node = document.getElementById("container");
      htmlToImage
        .toPng(node)
        .then(function(dataUrl) {
          this.setState({ imageData: dataUrl });
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
    } catch (error) {
      console.log(
        "geting error datafromAPIdatafromAPI::::::::::::::::  ",
        error
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  }
  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }
  c;

  async setAsDraft() {
    // console.log("imageData",imageData);
    var base64ImageContent = imageData.replace(
      /^data:image\/(png|jpg);base64,/,
      ""
    );
    let blobObj = dataURItoBlob(imageData, "image/png");
    // let ext = extractImageFileExtensionFromBase64(imageData);
    // console.log("ext",ext);
    // console.log("blobOBJ",blobObj);
    var objecturl = URL.createObjectURL(dataURItoBlob(imageData));
    console.log("OBJECT URL", objecturl, "blobobj ..", blobObj);
    const data = new FormData();

    var file = new File([blobObj], `${this.state.name}.png`, {
      type: "image/png",
      lastModified: Date.now()
    });

    data.append("imageData", file);
    await fetch(`https://dev.moonvalleynurseries.com/designImage.php`, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ imageUrl: res.DATA.imageUrl }, () =>
          console.log(this.state.imageUrl, "imaguerl after res")
        );
      });
    // console.log(imageUrl,'url iamge ka behc')

    if (this.state.name) {
      console.log(localStorage.getItem("userId"), "userrrrriiiiiiiiiiiid");
      await fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: `{"action":"setDesign","params":{"background_images":"${
          this.state.imageUrl
        }","best_time_to_call":"AnyTime","comments":"Need to add more plant","created_date":"${new Date().toLocaleString()}","designType":"draft","app_type":"web","preview_snaps":"http://cssent.com/t/rn1/r1.jpg","productsarray":"94","search_key":"backyard,small plant,green","share_url":"https://www.facebook.com/moonvalleynursery/","snaps":"https://ecomdiag.blob.core.windows.net/mvndev/I9YjftG286.jpg","title":"${
          this.state.name
        }","token":"dapyhnthgrf0ar02tq5qog2unuin61p7","user_email":"${localStorage.getItem(
          "email"
        )}","user_id":"${localStorage.getItem(
          "userId"
        )}","user_name":"${localStorage.getItem("firstname") +
          " " +
          localStorage.getItem(
            "lastname"
          )}","user_phone":"1234567890","data":[{"height":150,"image":"${
          this.props.imageUrl
        }","key":"1","lastOffsetX":303.75,"lastOffsetY":236,"left":303.75,"productId":"94","rotate":"0.71rad","scale":1.7705869185145997,"top":236,"type":"Image1","viewHeight":100,"viewWidth":100,"width":150}]}}`
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.success == true) {
            this.props.updateButtons({ menu: true });
            this.props.handleNavigation("My Designs");
            this.props.updateSave(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { classes } = this.props;
    console.log(
      "this.props.imageUrl[[[[[[[[[[[]]]]]]]]]]]  ",
      this.state.imageData
    );

    return (
      <Card className={classNames(classes.root, "fadeIn")}>
        <CardHeader className={classes.cardHeader}>
          <Typography variant="body1" className={classes.headerText}>
            Save Design Draft
          </Typography>
        </CardHeader>
        <CardBody>
          <GridContainer justify="center" className={classes.cardBodyContain}>
            <GridItem xs={7}>
              <div id="testimg">
                {" "}
                <div />
              </div>
              {/* <img  src={imageData} alt="asdfasdf"/> */}
              <img src={imageData} alt="preview" className={classes.preview} />
            </GridItem>
            <GridItem xs={6}>
              <TextField
                label="* File Name"
                id="Name"
                className={classes.designName}
                value={this.state.name}
                onChange={this.updateName}
                fullWidth={true}
                margin="dense"
              />
              {this.state.error && "Name shouldnt be empty"}
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" className={classes.buttonsContain}>
            <GridItem xs={3}>
              <ButtonMaterial
                className={classes.button}
                variant="outlined"
                size="large"
                onClick={() => {
                  // this.props.updateButtons({ menu: true })
                  // this.props.handleNavigation('My Designs')
                  // this.props.updateSave(false)
                  this.setAsDraft();
                }}
              >
                Save
              </ButtonMaterial>
            </GridItem>
            <GridItem xs={3}>
              <ButtonMaterial
                className={classes.buttonSecondary}
                variant="outlined"
                size="large"
                onClick={() => {
                  this.props.updateSave(false);
                  this.props.updateButtons({ menu: true });
                }}
              >
                Cancel
              </ButtonMaterial>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

const style = {
  root: {
    zIndex: 40,
    textAlign: "center",
    width: "66vw",
    height: "74vh",
    marginLeft: "17vw",
    marginTop: "16vh"
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
    width: "100%",
    height: "44vh",
    position: "absolute",
    left: 0,
    top: "8vh",
    margin: 0,
    textAlign: "center"
  },
  preview: {
    borderRadius: "15px",
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "36vh",
    height: "36vh",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, .5)",
    "@media (max-width:767px)": {
      width: "20%",
      left: "20%"
    }
  },
  buttonsContain: {
    position: "absolute",
    bottom: "6vh",
    left: 0,
    width: "100%",
    margin: 0
  },
  button: {
    fontFamily: "Montserrat, sans-serif !important",
    color: "#fff",
    backgroundColor: "#ff0000",
    border: "none",
    "&:hover": {
      background: "#ff0000",
      color: "#ffffff"
    }
  },
  buttonSecondary: {
    fontFamily: "Montserrat, sans-serif",
    background: "none"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(SaveModal));
