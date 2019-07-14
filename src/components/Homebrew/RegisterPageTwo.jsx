import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
// @material-ui/icons
import Grid from '@material-ui/core/Grid';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Card from "../Card/Card.jsx";
import StepHeader from './StepHeader.jsx'
import { connect } from 'react-redux';
import { updateRegisterPage, updateRegisterData } from '../../actions/registerController'
import RegisterPageOne from './RegisterPageOne.jsx'
import RegisterPageThree from './RegisterPageThree.jsx'
import transition from "../../assets/img/transition.svg";
import '../../animate.css'
import "../../transition.css"

function mapStateToProps(state) {
  return {
    step: state.registerReducer.step,
    steps: state.registerReducer.steps,
    securityCode: state.registerReducer.securityCode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRegisterPage: (step, steps) => dispatch(updateRegisterPage(step, steps)),
    updateRegisterData: data => dispatch(updateRegisterData(data))
  };
}

class RegisterPageTwo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      transfer: false,
      num1: '',
      num2: '',
      num3: '',
      num4: '',
    }
    this.handleNum = this.handleNum.bind(this);
    this.updateNum1 = this.updateNum1.bind(this);
    this.updateNum2 = this.updateNum2.bind(this);
    this.updateNum3 = this.updateNum3.bind(this);
    this.updateNum4 = this.updateNum4.bind(this);
  }
  componentDidMount () {
    setTimeout(() => {document.getElementById('num1').focus()}, 100);
  }
  handleNum(event) {
    event.preventDefault()
  }
  updateNum1(event) {
    if (event.keyCode !== 8) {
      this.setState({
        num1: event.key
      });
      document.getElementById('num2').focus()
    }
  }
  updateNum2(event) {
    if (event.keyCode !== 8) {
      this.setState({
        num2: event.key
      });
      document.getElementById('num3').focus()
    } else {
      this.setState({
        num1: ''
      });
      document.getElementById('num1').focus()
    }
  }
  updateNum3(event) {
    if (event.keyCode !== 8) {
      this.setState({
        num3: event.key
      });
      document.getElementById('num4').focus()
    } else {
      this.setState({
        num2: ''
      });
      document.getElementById('num2').focus()
    }
  }
  updateNum4(event) {
    if (event.keyCode !== 8) {
      this.setState({
        num4: event.key,
        transfer: true
      });
      this.props.updateRegisterData({
        securityCode: `${this.state.num1}${this.state.num2}${this.state.num3}${this.state.num4}`
      })
      setTimeout(() => {
        this.props.updateRegisterPage(
          2,
          [{ stepName: 'Register', header: 'Registration', active: false, completed: true, bodyContent: <RegisterPageOne /> },
            { stepName: 'Activate', header: 'Registration', active: false, completed: true, bodyContent: <RegisterPageTwo /> },
            { stepName: 'Profile', header: 'Registration', active: true, completed: false, bodyContent: <RegisterPageThree /> }]
        );
      }, 2200);
    } else {
      this.setState({
        num3: ''
      });
      document.getElementById('num3').focus()
    }
  }
  render () {
    const { classes } = this.props;
    var transfer
    if (this.state.transfer) {
      transfer = (
        <div>
          <img src={transition} alt='transition' className={classNames('transition', classes.regTransition)} />
        </div>
      );
    } else {
      transfer = <div></div>
    }
    return (
      <Card className={classNames(classes.rootCard, 'fadeIn')}>
        <StepHeader step={this.props.step} steps={this.props.steps} location='reg' />
        {transfer}
        <GridContainer className={classes.textCenter} justify='center'>
          <GridItem xs={12}>
            <h3 className={classes.code}>Enter your Verification code</h3>
          </GridItem>
          <GridItem xs={12}>
            <Grid container spacing={32} alignItems="center">
              {/* <Grid item xs={2}>
              </Grid> */}
              <Grid item xs={3}>
                <input
                  id="num1"
                  className={classes.authInput}
                  value={this.state.num1}
                  onKeyUp={this.updateNum1}
                  onChange={this.handleNum}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  id="num2"
                  className={classes.authInput}
                  value={this.state.num2}
                  onKeyUp={this.updateNum2}
                  onChange={this.handleNum}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  id="num3"
                  className={classes.authInput}
                  value={this.state.num3}
                  onKeyUp={this.updateNum3}
                  onChange={this.handleNum}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  id="num4"
                  className={classes.authInput}
                  value={this.state.num4}
                  onKeyUp={this.updateNum4}
                  onChange={this.handleNum}
                />
              </Grid>
              {/* <Grid item xs={2}>
              </Grid> */}
            </Grid>
          </GridItem>
        </GridContainer>
      </Card>
    )
  }
}

const style = {
  rootCard: {
    marginTop: '40px',
    paddingBottom: '20px',
  },
  code: {
    marginTop: '6vh',
    fontFamily: 'Montserrat, sans-serif',
    color: '#252525 !important',
    fontWeight: 400,
  },
  authInput: {
    lineHeight: '14vh',
    fontSize: '2em',
    height: '8vh',
    width: '8vw',
    marginTop: '4vh',
    marginBottom: '4vh',
    border: '1px #252525 solid',
    borderRadius: '5px',
    textAlign: 'center',
  },
  textCenter: {
    fontFamily: 'Montserrat, sans-serif',
    textAlign: "center",
    height: '100%',
    overflow: 'hidden',
  },
  regTransition: {
    top: '9vh',
    left: '18.8vw',
    width: '25vw',
    zIndex: 1
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterPageTwo));
