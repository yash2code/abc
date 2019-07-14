import React, { Component } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Star from "@material-ui/icons/Star";
import Info from "@material-ui/icons/InfoOutlined";
import Magnify from "@material-ui/icons/Search";
import Card from "../Card/Card.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {
  updateShow,
  updateDrawer,
  updateSearchShow
} from "../../actions/drawerController";
import { addItem } from "../../actions/dashboardController";
import { updateButtons } from "../../actions/buttonController";
import { nextTutorialStep } from "../../actions/tutorialController";
import ReactHtmlParser from "react-html-parser";
import "../../animate.css";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import ficus from "../../assets/img/ficus.jpg";
import ficusCut from "../../assets/img/FicusCut.png";
import littleJohn from "../../assets/img/littleJohn.jpg";
import littleJohnCut from "../../assets/img/littleJohnCut.png";
import downChevron from "../../assets/img/chevron-down.svg";
import hedge from "../../assets/img/hedge.jpg";
import citrus from "../../assets/img/citrus.jpg";
import flowering from "../../assets/img/flowering.jpg";
import evergreen from "../../assets/img/evergreen.jpg";
import desert from "../../assets/img/desert.jpg";
import palm from "../../assets/img/palm.jpg";
import shrubs from "../../assets/img/shrub.jpg";
import cacti from "../../assets/img/cacti.jpg";
import ground from "../../assets/img/ground.jpg";
import vines from "../../assets/img/vines.jpg";

function mapStateToProps(state) {
  return {
    showData: state.dashboardReducer.showData,
    bottom: state.drawerReducer.bottom,
    drawerView: state.drawerReducer.drawerView,
    search: state.drawerReducer.search,
    tutorialStep: state.tutorialReducer.step
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateShow: showExample => dispatch(updateShow(showExample)),
    updateDrawer: drawerState => dispatch(updateDrawer(drawerState)),
    updateSearchShow: search => dispatch(updateSearchShow(search)),
    addItem: item => dispatch(addItem(item)),
    updateButtons: data => dispatch(updateButtons(data)),
    nextTutorialStep: () => dispatch(nextTutorialStep())
  };
}

var description = `The Ficus ‘Indian Laurel’ is one of the best medium to large shade trees you can find! Ficus nitida is native to Asia and Hawaii and is an evergreen tree ideal for growing in the Southwest. In fact, this single-trunk variety loves to grow where there’s plenty of full sun exposure. Of course, one of its big selling features is its wide spreading canopy, which features lush green foliage that adds beauty to any environment. We love to plant them on any landscape that could benefit from its generous shade capability. When properly placed around a home, its canopy can provide enough shade to help cool the home, which can lead to lower utility bills and a more comfortable indoor environment during those hot days.

As great as this Indian Laurel Ficus tree is for shade, it can also add some much-needed privacy. We love to plant them around property lines, where they can block out unwanted views in style and help homeowners achieve their own private backyard paradise! After all, Ficus nitida fits well with any tropical theme landscape, so they look fantastic planted with palm trees and other plants. It has a fast growth rate, so you won’t be waiting too long for it to add shade and privacy into your landscape. Best of all, once established, this drought-tolerant tree keeps its lush green appearance even in the most water-wise landscapes! Are you looking for a tree to act as a natural sound barrier? People that live near busy streets will want to plant Ficus ‘Indian Laurel’ trees, as it can help reduce noise while adding some valuable curb appeal too!`;

var description2 = `The Little John Bottlebrush, or just ‘Little John’, is one of the most identifiable shrubs in the areas where it grows, such as the general southwest region. The small to medium shrub produces dark red, brushy flowers during the spring and summer months. Versatile, hardy and colorful, the Little John is a popular accent plant used in many types of landscapes. Little John’s can make a nice informal hedge, accent to a desert yard, or planted in mass over large areas. Little John Bottlebrush shrubs thrive in a variety of soil conditions and love the summer heat. They do well when they are planted in an area of your yard that offers them full sun exposure. In the first year, Little John’s might need a bit more water but require less of it after the first year, once established. This bottlebrush shrub is known to attract hummingbirds and butterflies when in bloom, which adds some fun and entertainment for homeowners.`;
var littleJohnObj = {
  name: "Little John Bottlebrush",
  sciName: "Callistemon Citrinus",
  image: littleJohn,
  cutImage: littleJohnCut,
  description: description2
};
var ficusNitidaObj = {
  name: "Indian Laurel Tree",
  sciName: "Ficus Nitida",
  image: ficus,
  cutImage: ficusCut,
  description: description
};
var hedgeContents = [];
var citrusContents = [];
var floweringContents = [];
var evergreenContents = [];
var desertContents = [];
var palmContents = [];
var shrubsContents = [];
var cactiContents = [];
var groundContents = [];
var vinesContents = [];
var favoritesContents = [littleJohnObj, ficusNitidaObj];

class DrawerMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstAnimation: true,
      search: false,
      searchValue: "",
      filterValue: "Alphabet",
      drawerView: "",
      globalDisplay: [],
      categories: [],
      detail: {},
      fav: 0,
      favcontent: false
    };
    this.handleBack = this.handleBack.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.subcategories = this.subcategories.bind(this);
    this.favcontents = this.favcontents.bind(this);
    this.set_unsetfav = this.set_unsetfav.bind(this);
    this.props.updateSearchShow(false);
  }
  componentDidMount() {
    // for (let i = 0; i < 30; i++) {
    //   hedgeContents.push(littleJohnObj);
    //   if (i % 4 === 0) {
    //     citrusContents.push(ficusNitidaObj);
    //     floweringContents.push(littleJohnObj);
    //     evergreenContents.push(ficusNitidaObj);
    //     desertContents.push(littleJohnObj);
    //     palmContents.push(ficusNitidaObj);
    //     shrubsContents.push(littleJohnObj);
    //     cactiContents.push(ficusNitidaObj);
    //     groundContents.push(littleJohnObj);
    //     vinesContents.push(ficusNitidaObj);
    //   }
    // }
    this.setState({ categories: [] });
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"getAllCategories","params":{"token" :"' +
        localStorage.getItem("token") +
        '"}}'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.success !== false) {
          // response.DATA.map((obj, index) => (

          // );
          this.setState({ categories: response.DATA });
          console.log(this.state.categories);
        } else {
          //this.setState({categories:{name:'No data found'}});
        }
      })
      .catch(error => {
        this.setState({ email_error: "Please try again later" });
        //error invalid user
      });
  }

  subcategories(obj) {
    console.log(obj);
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"getCategoriesIdByProduct","params": {"category_id":"' +
        obj.cat_id +
        '","user_id": "' +
        localStorage.getItem("userId") +
        '","token" :"' +
        localStorage.getItem("token") +
        '"}}'
    })
      .then(response => response.json())
      .then(response => {
        if (response.success !== false) {
          this.setState({
            globalDisplay: response.DATA,
            drawerView: "Global",
            favcontent: false
          });
        } else {
          //this.setState({categories:{name:'No data found'}});
        }
      })
      .catch(error => {
        this.setState({ email_error: "Please try again later" });
        //error invalid user
      });
  }

  favcontents() {
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"getFavourite","params":{"user_id": "' +
        localStorage.getItem("userId") +
        '","token": "' +
        localStorage.getItem("token") +
        '"}}'
    })
      .then(response => response.json())
      .then(response => {
        console.log("favDATA");
        console.log(response);
        if (response.success !== false) {
          this.setState({
            drawerView: ""
          });
          setTimeout(() => {
            this.setState({
              globalDisplay: response.DATA,
              drawerView: "Global",
              favcontent: true
            });
          }, 400);
        } else {
          this.setState({ categories: { name: "No data found" } });
        }
      })
      .catch(error => {
        this.setState({ email_error: "Please try again later" });
        //error invalid user
      });
  }

  set_unsetfav(obj, ind) {
    if (obj.is_favourite == "1") {
      var action = "unsetFavourite";
      var fav = "0";
    } else {
      var action = "setFavourite";
      var fav = "1";
      this.setState({ fav });
    }
    if (this.state.fav == "1") {
      var action = "unsetFavourite";

      this.setState({ fav: "0" });
    } else {
      var action = "setFavourite";

      this.setState({ fav: "1" });
    }
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"action":"' +
        action +
        '","params":{"product_id":"' +
        obj.product_id +
        '", "user_id": "' +
        localStorage.getItem("userId") +
        '","token": "' +
        localStorage.getItem("token") +
        '"}}'
    })
      .then(response => response.json())
      .then(response => {
        console.log("set unset fav");
        console.log(response);
        if (response.success !== false) {
          if (this.state.favcontent) {
            this.favcontents();
          } else {
            this.state.globalDisplay[ind]["is_favourite"] = fav;
            console.log("let see", this.state.detail);
            this.forceUpdate();
          }
        } else {
          this.setState({ categories: { name: "No data found" } });
        }
      })
      .catch(error => {
        this.setState({ email_error: "Please try again later" });
        //error invalid user
      });
  }

  handleBack() {
    if (this.state.drawerView === "Global") {
      this.setState({
        drawerView: ""
      });
    } else if (this.state.drawerView === "Detail") {
      this.setState({
        drawerView: "Global"
      });
    } else {
      this.props.updateDrawer(false);
      this.props.updateSearchShow(false);
    }
  }
  updateSearch(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  search(event) {
    if (event.key === "Enter") {
      console.log("enter pressed");
      console.log(this.state.filterValue);
      if (
        this.state.filterValue == "Alphabet" ||
        this.state.filterValue == "AlphabetReverse"
      ) {
        var name = "name";
        if (this.state.filterValue == "AlphabetReverse") {
          var order = "DESC";
        } else {
          var order = "ASC";
        }
      } else {
        var name = "botnical_name";
        if (this.state.filterValue == "SciReverse") {
          var order = "DESC";
        } else {
          var order = "ASC";
        }
      }
      fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:
          '{"action":"searchProduct","params": {"keyword":"' +
          this.state.searchValue +
          '","user_id":"' +
          localStorage.getItem("userId") +
          '", "type": "' +
          name +
          '", "order": "' +
          order +
          '", "token" :"' +
          localStorage.getItem("token") +
          '"}}'
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.success !== false) {
            this.setState({
              globalDisplay: response.DATA,
              drawerView: "Global",
              favcontent: false
            });
          } else {
            this.setState({ categories: { name: "No data found" } });
          }
        })
        .catch(error => {
          this.setState({ email_error: "Please try again later" });
          //error invalid user
        });
    }
  }
  updateFilter(event) {
    this.setState({
      filterValue: event.target.value
    });
  }
  render() {
    const { classes } = this.props;
    var drawerState, searchState;
    var array = this.state.globalDisplay;
    console.log("Arrrayy", array);
    const GlobalDisplay = (
      <div
        className={classNames(classes.xScroll, {
          "globalDrawer-exit": this.state.drawerView !== "Global",
          "globalDrawer-enter": this.state.drawerView === "Global"
        })}
      >
        <div className={classes.xScrollContainer}>
          {array.map((obj, index) => (
            <Card
              className={classes.xScrollCard}
              style={{ backgroundImage: `url(${obj.image})` }}
              key={index}
            >
              <CardHeader className={classes.cardHeader}>
                <Typography variant="body1" className={classes.cardTextHeader}>
                  {obj.name}
                </Typography>
              </CardHeader>
              <CardBody>
                <div className={classes.iconContainer}>
                  <Star
                    onClick={() => {
                      this.set_unsetfav(obj, index);
                      if (this.props.tutorialStep !== 3) {
                        // todo write add to favorites method
                      }
                    }}
                    className={classes.favoritesIcon}
                    style={{
                      color: obj.is_favourite == "1" ? "#FFFF00" : "#f6f6f6"
                    }}
                  />
                  <AddIcon
                    onClick={() => {
                      this.props.addItem(obj);
                      this.props.updateShow(obj);
                      this.props.updateButtons({ menu: false });
                      this.props.updateDrawer(!this.props.bottom);
                      this.setState({ drawerView: "" });
                      if (this.props.tutorialStep === 3) {
                        this.props.nextTutorialStep();
                      }
                    }}
                    className={classes.addIcon}
                  />
                  <Info
                    onClick={() => {
                      if (this.props.tutorialStep !== 3) {
                        this.setState({ drawerView: "Detail", detail: obj });
                        this.props.updateSearchShow(false);
                      }
                    }}
                    className={classes.infoIcon}
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
    const DetailDisplay = (
      <div
        className={classNames(classes.detailContainer, {
          "detailDrawer-exit": this.state.drawerView !== "Detail",
          "detailDrawer-enter": this.state.drawerView === "Detail"
        })}
      >
        <GridContainer justify="center" className={classes.detailGrid}>
          <GridItem xs={5}>
            <div className={classes.cardHeaderDetail}>
              <Typography
                variant="body1"
                className={classes.cardTextHeaderDetail}
              >
                {this.state.detail.name}
              </Typography>
              <Typography
                variant="body2"
                className={classes.cardTextHeaderDetail}
              >
                {`( ${this.state.detail.botnical_name} )`}
              </Typography>
            </div>
            <Card
              className={classes.detailCard}
              style={{ backgroundImage: `url( ${this.state.detail.image} )` }}
            >
              <CardBody>
                <div className={classes.iconContainDetail}>
                  <AddIcon
                    onClick={() => {
                      this.props.addItem(this.state.detail);
                      this.props.updateButtons({ menu: false });
                      this.props.updateDrawer(!this.props.bottom);
                      this.setState({ drawerView: "" });
                      if (this.props.tutorialStep === 3) {
                        this.props.nextTutorialStep();
                      }
                    }}
                    className={classes.addIconDetail}
                  />
                  <Star
                    onClick={() => {
                      this.set_unsetfav(this.state.detail);

                      if (this.props.tutorialStep !== 3) {
                        // todo write add to favorites method
                      }
                    }}
                    className={classes.favoritesIcon}
                    style={{
                      color: this.state.fav == "1" ? "#FFFF00" : "#f6f6f6"
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={5}>
            <div className={classes.cardHeaderDetail}>
              <Typography
                variant="body1"
                className={classes.cardTextHeaderDetail}
              >
                Product
              </Typography>
              <Typography
                variant="body1"
                className={classes.cardTextHeaderDetail}
              >
                Information
              </Typography>
            </div>
            <div className={classes.detailCardTextContainer}>
              <Typography variant="body2" className={classes.detailCardText}>
                {ReactHtmlParser(this.state.detail.description)}
              </Typography>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
    const CategoryView = (
      <GridContainer
        justify="center"
        className={classNames(classes.globalContainer, {
          "categoryDrawer-exit":
            this.state.drawerView === "Global" ||
            this.state.drawerView === "Detail",
          "categoryDrawer-enter":
            this.state.drawerView !== "Global" &&
            this.state.drawerView !== "Detail"
        })}
      >
        <div className={classes.xScrollContainer}>
          {this.state.categories.map((obj, index) => (
            <Card
              className={classes.xScrollCard}
              style={{ backgroundImage: `url(${obj.image})` }}
              key={index}
              onClick={() => {
                this.subcategories(obj);
                // this.setState({
                //   globalDisplay: obj.contents,
                //   drawerView: 'Global'
                // });
                if (this.props.tutorialStep === 2) {
                  this.props.nextTutorialStep();
                }
              }}
            >
              <CardHeader className={classes.cardHeader}>
                <Typography variant="body1" className={classes.cardTextHeader}>
                  {obj.name}
                </Typography>
              </CardHeader>
            </Card>
          ))}
        </div>
      </GridContainer>
    );
    drawerState = (
      <div
        className={classNames(classes.globalDrawerContainer, {
          smallHeight: this.state.drawerView !== "Detail",
          largeHeight: this.state.drawerView === "Detail"
        })}
      >
        {GlobalDisplay}
        {DetailDisplay}
        {CategoryView}
      </div>
    );
    if (this.props.bottom && this.state.drawerView !== "Detail") {
      searchState = (
        <div
          className={classNames(classes.searchContainer, {
            shiftUp: this.props.search,
            shiftDown: !this.props.search && !this.state.firstAnimation,
            shiftHold: !this.props.search && this.state.firstAnimation
          })}
        >
          <GridContainer justify="center">
            <Close
              className={classNames(classes.searchCloseIcon, {
                fadeIn:
                  this.props.search &&
                  this.props.bottom &&
                  this.state.drawerView !== "Detail",
                hidden:
                  !this.props.search ||
                  !this.props.bottom ||
                  this.state.drawerView === "Detail"
              })}
              onClick={() => {
                this.props.updateSearchShow(!this.props.search);
              }}
            />
            <GridItem xs={1} />
            <GridItem xs={5} className={"fadeIn"}>
              <GridContainer
                justify="flex-start"
                className={classes.searchInputContainer}
              >
                <GridItem xs={1}>
                  <Magnify className={classes.searchInputIcon} />
                </GridItem>
                <GridItem xs={11}>
                  <TextField
                    id="standard-dense"
                    label="Search"
                    className={classes.inputSearch}
                    value={this.state.searchValue}
                    onChange={this.updateSearch}
                    onKeyPress={this.search}
                    fullWidth={true}
                    margin="dense"
                    type="text"
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem
              xs={5}
              className={classNames(classes.filterDropdown, "fadeIn")}
            >
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel htmlFor="filter" className={classes.selectLabel}>
                  Sort By
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.filterValue}
                  onChange={this.updateFilter}
                  inputProps={{
                    name: "filter",
                    id: "filter"
                  }}
                >
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="Alphabet"
                  >
                    A - Z By Name
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="AlphabetReverse"
                  >
                    Z - A By Name
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="Sci"
                  >
                    A - Z By Scientific Name
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="SciReverse"
                  >
                    Z - A By Scientific Name
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      searchState = <div />;
    }
    return (
      <div>
        {searchState}
        <Divider
          variant="middle"
          className={classNames(classes.divider, {
            fadeIn: this.props.search && this.state.drawerView !== "Detail",
            hidden: !this.props.search || this.state.drawerView === "Detail"
          })}
        />
        <div
          className={classes.fabContainerXScroll}
          style={{
            height: this.props.search ? "70%" : "100%"
          }}
        >
          <Fab
            color="primary"
            aria-label="Back"
            className={classNames(classes.fab, {
              topPosition: this.state.drawerView === "Detail",
              bottomPosition: this.state.drawerView !== "Detail"
            })}
            onClick={() => {
              this.handleBack();
            }}
          >
            <img src={downChevron} alt="back arrow" className={classes.back} />
          </Fab>
          <Fab
            color="primary"
            aria-label="Search"
            onClick={() => {
              this.setState({ firstAnimation: false });
              this.props.updateSearchShow(!this.props.search);
            }}
            className={classNames(classes.searchFabXScroll, {
              hidden: this.state.drawerView === "Detail"
            })}
          >
            <Magnify className={classes.searchIcon} />
          </Fab>
          <Fab
            color="primary"
            aria-label="Favorites"
            onClick={() => {
              this.favcontents();
              // this.setState({
              //   drawerView: ''
              // });
              // setTimeout(() => {
              //   this.setState({
              //     globalDisplay: favoritesContents,
              //     drawerView: 'Global'
              //   });
              // }, 400)
            }}
            className={classes.favoritesFabXScroll}
          >
            <Star className={classes.favFabIcon} />
          </Fab>
        </div>
        {drawerState}
      </div>
    );
  }
}

const style = {
  // main menu
  containGlobal: {
    width: "100vh",
    overflow: "hidden",
    opacity: 1
  },
  globalDrawerContainer: {
    transition: "all 0.9s"
  },
  globalContainer: {
    display: "inline-block",
    width: "100vw",
    marginLeft: "0.8vh",
    transition: "all 0.9s"
  },
  Card: {
    height: "22vh",
    marginTop: "8vh",
    marginBottom: "3vh",
    textAlign: "center",
    display: "inline-block",
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  },
  cardHeaderMain: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 800,
    fontSize: "1.2em",
    padding: "1vh",
    textAlign: "center",
    transform: "translateY(-2vh)",
    zIndex: 21
  },
  cardTextHeaderMain: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 300,
    marginTop: "1vh",
    marginBottom: "1vh",
    margin: 0,
    padding: 0,
    zIndex: 22
  },
  // category views
  xScrollContainer: {
    transition: "all 0.9s",
    position: "fixed",
    bottom: 0,
    left: "9vw",
    paddingLeft: "5vw",
    width: "85vw",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  xScroll: {
    transition: "all 0.9s"
  },
  xScrollCard: {
    display: "inline-block",
    height: "22vh",
    width: "24vw",
    marginRight: "2vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    "&:before": {
      background: "rgba(0, 0, 0, 0.2)"
    },
    "&:before,&:after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  cardHeader: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 800,
    fontSize: "1.2em",
    padding: "1vh",
    textAlign: "center",
    transform: "translateY(-2vh)",
    zIndex: 21
  },
  cardTextHeader: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 300,
    marginTop: "1vh",
    marginBottom: "1vh",
    padding: 0,
    zIndex: 22
  },
  cardTextHeaderDetail: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 300,
    marginTop: "1vh",
    marginBottom: "1vh",
    padding: 0,
    zIndex: 22,
    transform: "translateY(-4.5vh)"
  },
  cardText: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 200,
    marginTop: "1vh",
    padding: 0,
    zIndex: 23
  },
  favoritesIcon: {
    color: "#fff",
    position: "absolute",
    right: "1vw",
    bottom: "1vh",
    width: "4vw",
    height: "4vh",
    zIndex: 24
  },
  addIcon: {
    color: "#fff",
    position: "absolute",
    left: "9.5vw",
    bottom: "0.5vh",
    width: "5vw",
    height: "5vh",
    zIndex: 24
  },
  infoIcon: {
    color: "#fff",
    position: "absolute",
    left: "1vw",
    bottom: "1vh",
    width: "4vw",
    height: "4vh",
    zIndex: 24
  },
  // detail view
  detailContainer: {
    overflow: "hidden",
    position: "sticky",
    transition: "all 0.9s"
  },
  detailGrid: {
    position: "absolute",
    top: "10vh",
    left: "5vw",
    width: "96vw",
    height: "56vh"
  },
  iconContainer: {
    background: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "6vh",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  iconContainDetail: {
    background: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "6vh",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  productImg: {
    height: "40vh",
    opacity: 1
  },
  cardHeaderDetail: {
    transform: "translateY(-1vh)"
  },
  detailCard: {
    display: "inline-block",
    height: "43vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "translateY(-8.5vh)",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    "&:before": {
      background: "rgba(0, 0, 0, 0.2)"
    },
    "&:before,&:after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  detailCardTwo: {
    height: "39vh",
    transform: "translateY(-8vh)",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    paddingLeft: "4vw",
    paddingRight: "4vw"
  },
  detailCardText: {
    zIndex: 42,
    color: "black"
  },
  detailCardTextContainer: {
    overflowY: "scroll",
    paddingLeft: "2vw",
    height: "36vh",
    marginBottom: "1vh",
    textAlign: "left",
    transform: "translateY(-2vh)"
  },
  addIconDetail: {
    color: "#fff",
    position: "absolute",
    left: "16vw",
    bottom: "0.5vh",
    width: "5vw",
    height: "5vh",
    zIndex: 24
  },
  detailImage: {
    width: "100%"
  },
  // fab container
  fabContainerXScroll: {
    width: "10vw",
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 40,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  fab: {
    transition: "all 1s",
    position: "fixed",
    left: "2vw",
    color: "#fff",
    backgroundColor: "#ff0000",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      color: "#fff",
      backgroundColor: "#ff0000"
    }
  },
  back: {
    width: "4vw",
    color: "#fff"
  },
  searchFabXScroll: {
    position: "fixed",
    left: "2vw",
    bottom: "13vh",
    color: "#fff",
    backgroundColor: "#ff0000",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      color: "#fff",
      backgroundColor: "#ff0000"
    }
  },
  searchIcon: {
    color: "#fff",
    width: "4vw",
    height: "4vh",
    zIndex: 24
  },
  favoritesFabXScroll: {
    position: "fixed",
    left: "2vw",
    bottom: "3vh",
    color: "#fff",
    backgroundColor: "#ff0000",
    "&:hover": {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      color: "#fff",
      backgroundColor: "#ff0000"
    }
  },
  favFabIcon: {
    color: "#fff",
    width: "4vw",
    height: "4vh",
    zIndex: 24
  },
  /* search bar */
  divider: {
    marginLeft: 0
  },
  searchContainer: {
    transition: "all 0.9s",
    zIndex: 10,
    width: "100vw",
    lineHeight: "10vh",
    paddingTop: "2vh",
    backgroundColor: "#fff"
  },
  searchCloseIcon: {
    position: "absolute",
    top: "4.8vh",
    left: "3vw",
    zIndex: 101,
    width: "4vw",
    height: "auto",
    color: "#060606",
    "&:hover": {
      color: "#ff0000"
    }
  },
  searchInputContainer: {
    width: "100%"
  },
  searchInputIcon: {
    marginTop: "4vh"
  },
  filterDropdown: {
    marginTop: "0.6vh",
    textAlign: "left"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(DrawerMenus));
