import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import Info from "@material-ui/icons/InfoOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from '@material-ui/core/Grid';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import ButtonMaterial from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateRegisterPage, updateRegisterData } from '../../actions/registerController'
import { handleNavigation } from '../../actions/navigationController';
import Card from "../Card/Card.jsx";
import StepHeader from './StepHeader.jsx'
import RegisterPageTwo from './RegisterPageTwo.jsx'
import RegisterPageThree from './RegisterPageThree.jsx'
import '../../animate.css'
import "../../transition.css"

function mapStateToProps(state) {
  return {
    step: state.registerReducer.step,
    steps: state.registerReducer.steps,
    email: state.registerReducer.email,
    phone: state.registerReducer.phone,
    password: state.registerReducer.password
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRegisterPage: (step, steps) => dispatch(updateRegisterPage(step, steps)),
    updateRegisterData: data => dispatch(updateRegisterData(data)),
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}

const error_show = {
  fontSize: '15px',
  textAlign: 'left',
  color :'red'
};

class RegisterPageOne extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPass: false,
      tooltip: false,
      email_error : '',
      phone_error : '',
      password_error : '',
      email_id: '',
      mobile : '',
      pass : ''
    }
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.check_email = this.check_email.bind(this);
    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
  }
  updatePassword(event) {
    this.setState({pass:event.target.value})
    this.props.updateRegisterData({
      password: event.target.value
    });
    var password_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    // console.log(this.props.password);
    // console.log(password_reg.test(this.props.password));
    // if(password_reg.test(this.props.password)==true){
    //   this.setState({password_error : ''})
    // }
  }
  updatePhone(event) {
    this.setState({mobile:event.target.value})
    this.props.updateRegisterData({
      phone: event.target.value
    });
    // var phone_reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // if(phone_reg.test(this.props.phone) == true){
    //   this.setState({phone_error : ''})
    // }
  }
  updateEmail(event) {
    this.setState({email_id:event.target.value})
    this.props.updateRegisterData({
      email: event.target.value
    });
    // var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // if(email_reg.test(this.props.email) == true){
    //   this.setState({email_error : ''})
    // }
  }
  handleTooltipOpen(event) {
    event.preventDefault();
    this.setState({
      tooltip: !this.state.tooltip
    });
  }

  check_email(){
    console.log(this.props);
      var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var phone_reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      var password_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if(email_reg.test(this.state.email_id) == true && phone_reg.test(this.state.mobile) == true && password_reg.test(this.state.pass)){
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body : '{"action":"isEmailAvailable","params":{"customerEmail":"'+this.props.email+'","token":"dapyhnthgrf0ar02tq5qog2unuin61p7"}}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.success !== false) {
          this.next();
        }else{
          this.setState({email_error : 'Email already exist'});
        }
      })
      .catch(error => {
        this.setState({email_error : 'Please try again later'});
        //error invalid user
      });
    }else{
      console.log('error');
      console.log(password_reg.test(this.props.password));
      if(password_reg.test(this.state.pass)==false){
        this.setState({password_error : 'Invalid Password'})
      }else{
        this.setState({password_error : ''})
      }
      if(phone_reg.test(this.state.mobile) == false){
        this.setState({phone_error : 'Invalid Phone number'})
      }else{
        this.setState({phone_error : ''})
      }
      if(email_reg.test(this.state.email_id) == false){
        this.setState({email_error : 'Invalid email'})
      }else{
        this.setState({email_error : ''})
      }
    }
  }

  next() {
    var steps = [{ stepName: 'Register', header: 'Registration', active: false, completed: true, bodyContent: <RegisterPageOne /> },
      { stepName: 'Activate', header: 'Registration', active: true, completed: false, bodyContent: <RegisterPageTwo /> },
      { stepName: 'Profile', header: 'Registration', active: false, completed: false, bodyContent: <RegisterPageThree /> }]
    this.props.updateRegisterPage(1, steps)
  }
  render () {
    const { classes } = this.props;
    var pass,
      TooltipModal
    if (this.state.showPass) {
      pass = (
        <Grid container spacing={16} alignItems="flex-end">
          <Grid item xs={1}>
            <Icon className={classes.inputIconsColor}>
              lock-outline
            </Icon>
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="* Password"
              id="password"
              className={classes.input}
              value={this.state.pass}
              onChange={this.updatePassword}
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </Grid>
          <Grid item xs={1}>
            <VisibilityOff className={classes.inputIconsColor} onClick={() => this.setState({ showPass: false })}/>
          </Grid>
          <p style = {error_show}>{this.state.password_error}</p>
        </Grid>
      );
    } else {
      pass = (
        <Grid container spacing={16} alignItems="flex-end">
          <Grid item xs={1}>
            <Icon className={classes.inputIconsColor}>
              lock-outline
            </Icon>
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="* Password"
              id="password"
              className={classes.input}
              value={this.state.pass}
              onChange={this.updatePassword}
              fullWidth={true}
              margin="dense"
              type='password'
            />
          </Grid>
          <Grid item xs={1}>
            <Visibility className={classes.inputIconsColor} onClick={() => this.setState({ showPass: true })}/>
          </Grid>
          <p style = {error_show}>{this.state.password_error}</p>
        </Grid>
      );
    }
    if (this.state.tooltip) {
      TooltipModal = (
        <div className={classes.tooltipModal}>
          <Typography variant='body2'>
            * Password requires 8 characters, 1 uppercase,
          </Typography>
          <Typography variant='body2'>
            1 lowercase, 1 number and no spaces
          </Typography>
        </div>
      );
    } else {
      TooltipModal = <div></div>
    }
    return (
      <Card className={classNames(classes.rootCard, 'fadeIn')}>
        <StepHeader step={this.props.step} steps={this.props.steps} location='reg'/>
        <form className={classes.form}>
          <GridContainer justify='center' className={classes.formContainer}>
            <GridItem xs={10} className={classes.gridItem}>
              <Grid container spacing={16} alignItems="flex-end">
                <Grid item xs={1}>
                  <Email className={classes.inputIconsColor} />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    label="* Email"
                    id="email"
                    className={classes.input}
                    value={this.state.email_id}
                    onChange={this.updateEmail}
                    fullWidth={true}
                    margin="dense"
                    type='email'
                  />
                </Grid>
                <p style = {error_show}>{this.state.email_error}</p>
              </Grid>
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
              <Grid container spacing={16} alignItems="flex-end">
                <Grid item xs={1}>
                  <Phone className={classes.inputIconsColor} />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    label="* Phone"
                    id="phone"
                    className={classes.input}
                    value={this.state.mobile}
                    onChange={this.updatePhone}
                    fullWidth={true}
                    margin="dense"
                    type='phone'
                  />
                </Grid>
                <p style = {error_show}>{this.state.phone_error}</p>
              </Grid>
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
              {pass}
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
            </GridItem>
          </GridContainer>
          {TooltipModal}
          <Typography variant='body1' className={classes.code}>We'll text you an activation code to verify your account</Typography>
          <button onClick={this.handleTooltipOpen} className={classes.infoButton}>
            <Info className={classes.infoIconColor} />
          </button>
          <div className={classes.textCenter}>
            <ButtonMaterial
              className={classes.buttonLogin}
              variant="outlined" size="large"
              onClick={() => {
                this.check_email()
              }}
              >
              Send
            </ButtonMaterial>
            <button className={classes.button} onClick={() => this.props.handleNavigation('login')}>
              Already have an account?
            </button>
          </div>
        </form>
      </Card>
      )
    }
}

const style = {
  rootCard: {
    marginTop: '4vh',
  },
  form: {
    textAlign: 'center',
    margin: "0",
  },
  buttonLogin: {
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    fontSize: '1em',
    marginBottom: '4vh',
    marginTop: '2vh',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  button: {
    fontFamily: 'Montserrat, sans-serif',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    paddingLeft: '1vw',
    marginBottom: '6vh',
    width: '100%',
    background: 'none',
    border: 'none',
    '&:hover': {
      outline: 'none',
    }
  },
  underline: {
    borderBottom: '1px solid #ff0000',
  },
  gridItem: {
    marginTop: '1vh'
  },
  code: {
    marginTop: '8vh',
    fontFamily: 'Montserrat, sans-serif',
    color: '#252525 !important',
    fontWeight: 400,
  },
  tooltipModal: {
    opacity: 0.8,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    position: 'relative',
    top: 0,
    left:'25%',
    width: '41.5vw',
  },
  infoButton: {
    position: 'absolute',
    right: '1.5vw',
    top: '38.8vh',
    background: 'none',
    border: 'none',
    '&:hover': {
      outline: 'none',
    },
    
  },
  input: {
    color: '#252525',
    fontWeight: 400,
    lineHeight: 1.42857,
    fontSize: '14px',
    margin: '15px 0 7px'
  },
  inputIconsColor: {
    color: "#252525",
    opacity: 0.7
  },
  infoIconColor: {
    color: "#252525",
    opacity: 0.7
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterPageOne));
