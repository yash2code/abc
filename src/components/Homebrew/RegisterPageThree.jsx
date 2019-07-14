import React, { Component } from 'react';
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import Card from "../Card/Card.jsx";
import StepHeader from './StepHeader.jsx'
// @material-ui/icons
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import ButtonMaterial from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateRegisterPage, updateRegisterData } from '../../actions/registerController';
import { handleNavigation } from '../../actions/navigationController';
import { startTutorial } from '../../actions/tutorialController';
import '../../animate.css';
import '../../transition.css';

function mapStateToProps(state) {
  return {
    step: state.registerReducer.step,
    steps: state.registerReducer.steps,
    first: state.registerReducer.first,
    last: state.registerReducer.last,
    address1: state.registerReducer.address1,
    address2: state.registerReducer.address2,
    zip: state.registerReducer.zip,
    city: state.registerReducer.city,
    state: state.registerReducer.state,
    email:state.registerReducer.email,
    password:state.registerReducer.password,
    phone:state.registerReducer.phone,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRegisterPage: (step, steps) => dispatch(updateRegisterPage(step, steps)),
    updateRegisterData: data => dispatch(updateRegisterData(data)),
    handleNavigation: route => dispatch(handleNavigation(route)),
    startTutorial: () => dispatch(startTutorial())
  };
}

const error_show = {
  fontSize: '15px',
  textAlign: 'left',
  color :'red'
};

class RegisterPageThree extends Component {
  constructor (props) {
    super(props);
    this.state = {
      first_error : '',
      last_error : '',
      address1_error : '',
      address2_error : '',
      zip_error : '',
      city_error : '',
      state_error : '',
      fname: '',
      lname : '',
      address_1 : '',
      address_2 : '',
      zip_code : '',
      state_name : '',
      city_name : '',
    }
    this.updateFirst = this.updateFirst.bind(this);
    this.updateLast = this.updateLast.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress1 = this.updateAddress1.bind(this);
    this.updateAddress2 = this.updateAddress2.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.register = this.register.bind(this);
  }
  updateFirst(event) {
    this.setState({fname:event.target.value})
    this.props.updateRegisterData({
      first: event.target.value
    });
    if(this.props.first !== ""){
      this.setState({first_error : ''})
    }
  }
  updateLast(event) {
    this.setState({lname:event.target.value})
    this.props.updateRegisterData({
      last: event.target.value
    });
    if(this.props.last !== ""){
      this.setState({last_error : ''})
    }
  }
  updatePhone(event) {
    this.props.updateRegisterData({
      phone: event.target.value
    });
  }
  updateAddress1(event) {
    this.setState({address_1:event.target.value})
    this.props.updateRegisterData({
      address1: event.target.value
    });
    if(this.props.address1 !== ""){
      this.setState({address1_error : ''})
    }
  }
  updateAddress2(event) {
    this.setState({address_2:event.target.value})
    this.props.updateRegisterData({
      address2: event.target.value
    });
    if(this.props.address2 !== ""){
      this.setState({address2_error : ''})
    }
  }
  updateZip(event) {
    this.setState({zip_code:event.target.value})
    this.props.updateRegisterData({
      zip: event.target.value
    });
    if(this.props.zip !== ""){
      this.setState({zip_error : ''})
    }
  }
  updateCity(event) {
    this.setState({city_name:event.target.value})
    this.props.updateRegisterData({
      city: event.target.value
    });
    if(this.props.city !== ""){
      this.setState({city_error : ''})
    }
  }
  handleState(event) {
    this.setState({state_name:event.target.value})
    this.props.updateRegisterData({
      state: event.target.value
    });
    if(this.props.state == ""){
      this.setState({state_error : ''})
    }
  }
  register(){
      if(this.state.fname !== "" && this.state.lname !== "" && this.state.address_1 !== "" && this.state.address_2 !== "" && this.state.zip_code !== "" && this.state.city_name !== "" && this.state.state_name !== ""){
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body : '{"action":"userRegister","params":{"email":"'+this.props.email+'","firstname":"'+this.props.first+'","lastname":"'+this.props.last+'","region":"'+this.props.state+'","regionId":"12","postcode":"'+this.props.zip+'", "street":"'+this.props.address1+'","city":"'+this.props.city+'","telephone":"'+this.props.phone+'","countryId":"US","password":"'+this.props.password+'","token":"dapyhnthgrf0ar02tq5qog2unuin61p7"}}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.success == true) {
          this.props.handleNavigation('login');
          // setTimeout(500, this.props.startTutorial());
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
      if(this.state.fname == ""){
        this.setState({first_error : 'First Name is required'})
      }
      if(this.state.lname == ""){
        this.setState({last_error : 'Last Name is required'})
      }
      if(this.state.address_1 == ""){
        this.setState({address1_error : 'Address1 is required'})
      }
      if(this.state.address_2 == ""){
        this.setState({address2_error : 'Address2 is required'})
      }
      if(this.state.zip_code == ""){
        this.setState({zip_error : 'Zip is required'})
      }
      if(this.state.city_name == ""){
        this.setState({city_error : 'City is required'})
      }
      if(this.state.state_name == ""){
        this.setState({state_error : 'State is required'})
      }
    }  
  }
  render () {
    const { classes } = this.props;
    return (
      <Card className={classNames(classes.rootCard, 'fadeIn')}>
        <StepHeader step={this.props.step} steps={this.props.steps} location='reg' />
        <form className={classes.form}>
          <GridContainer justify='center' className={classes.formContainer}>
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                id="standard-dense"
                label="* First Name"
                className={classes.input}
                value={this.state.fname}
                onChange={this.updateFirst}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.first_error}</p>
            </GridItem>
            
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                label="* Last Name"
                id="last"
                className={classes.input}
                value={this.state.lname}
                onChange={this.updateLast}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.last_error}</p>
            </GridItem>
            
            <GridItem xs={10} className={classes.gridItem}>
              <TextField
                label="* Address line 1"
                id="address1"
                className={classes.input}
                value={this.state.address_1}
                onChange={this.updateAddress1}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.address1_error}</p>
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
              <TextField
                label="* Address line 2"
                id="address2"
                className={classes.input}
                value={this.state.address_2}
                onChange={this.updateAddress2}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.address2_error}</p>
            </GridItem>
            
            <GridItem xs={5} className={classes.gridItem}>
              <FormControl
                fullWidth
                className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="state"
                  className={classes.selectLabel}>
                  * State
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.state_name}
                  onChange={this.handleState}
                  inputProps={{
                    name: "state",
                    id: "state"
                  }}>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="AZ">
                    Arizona
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="CA">
                    California
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="TX">
                    Texas
                  </MenuItem>
                </Select>
              </FormControl>
              <p style = {error_show}>{this.state.state_error}</p>
            </GridItem>
            
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                label="* City"
                id="city"
                className={classes.input}
                value={this.state.city_name}
                onChange={this.updateCity}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.city_error}</p>
            </GridItem>
            
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                label="* Postal Code"
                id="post"
                className={classes.input}
                value={this.state.zip_code}
                onChange={this.updateZip}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.zip_error}</p>
            </GridItem>
            
            <GridItem xs={5}></GridItem>
          </GridContainer>
          <div className={classes.textCenter}>
            <ButtonMaterial
              className={classes.buttonLogin}
              variant="outlined"
              size="large"
              onClick={() => {
                this.register();
                // this.props.handleNavigation('New Design');
                // setTimeout(500, this.props.startTutorial());
              }}
            >
              Done
            </ButtonMaterial>
          </div>
        </form>
      </Card>
    )
  }
}

const style = {
  textCenter: {
    textAlign: 'center',
  },
  formContainer: {
    height: '62vh',
    textAlign: 'center',
    "@media (min-width: 360px) and (max-width: 414px)": {
      height: '128vh',
    }
  },
  buttonLogin: {
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    fontSize: '1em',
    marginBottom: '4vh',
    marginTop: '5vh',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  button: {
    textAlign: 'center',
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
    marginTop: '2vh'
  },
  input: {
    color: '#252525',
    fontWeight: 400,
    lineHeight: 1.42857,
    fontSize: '14px',
    margin: '12px 0 4px'
  },
  inputIconsColor: {
    color: "#252525",
    opacity: 0.7
  },
  form: {
    margin: "0",
  },
  selectFormControl: {
    color: '#252525',
    textAling: 'left',
    fontWeight: 400,
    lineHeight: 1.42857,
    fontSize: '14px',
    margin: '12px 0 7px'
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterPageThree));
