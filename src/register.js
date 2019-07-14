import React, { Component } from 'react';
import { updateButtons } from './actions/buttonController';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import registerPageStyle from "./assets/jss/material-kit-pro-react/views/registerPageStyle.jsx";
import image from "./assets/img/registerBGFinal.jpg";
import RegisterPageOne from './components/Homebrew/RegisterPageOne.jsx';
import RegisterPageTwo from './components/Homebrew/RegisterPageTwo.jsx';
import RegisterPageThree from './components/Homebrew/RegisterPageThree.jsx';
import { connect } from 'react-redux';
import { updateRegisterPage, updateRegisterData } from './actions/registerController';
import './animate.css';
import './transition.css';

function mapStateToProps(state) {
  return {
    step: state.registerReducer.step,
    steps: state.registerReducer.steps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRegisterPage: (step, steps) => dispatch(updateRegisterPage(step, steps)),
    updateRegisterData: data => dispatch(updateRegisterData(data)),
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toLogin: false,
      toBuild: false,
      transfer: false
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    var steps = [{ stepName: 'Register', header: 'Registration', active: true, completed: false, bodyContent: <RegisterPageOne /> },
      { stepName: 'Activate', header: 'Registration', active: false, completed: false, bodyContent: <RegisterPageTwo /> },
      { stepName: 'Profile', header: 'Registration', active: false, completed: false, bodyContent: <RegisterPageThree /> }]
    this.props.updateRegisterPage(0, steps)
    this.props.updateButtons({ menu: false });
  }
  render() {
    var content
    const { classes } = this.props;
    if (this.props.steps.length !== 0) {
      content = this.props.steps[this.props.step].bodyContent
      console.log(content);
    } else {
      content = 'please provide an array'
    }
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{ backgroundImage: "url(" + image + ")" }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={8}>
                {content}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(registerPageStyle)(Register));
