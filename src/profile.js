/* eslint-disable */
import React from "react";
import { connect } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Grid from '@material-ui/core/Grid';
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Settings from "@material-ui/icons/Settings";
import Face from "@material-ui/icons/Face";
import CreditCard from "@material-ui/icons/CreditCard";
import Add from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
import Info from "@material-ui/icons/InfoOutlined";
// core components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonMaterial from '@material-ui/core/Button';
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import HeaderLinks from "./components/Header/HeaderLinks.jsx";
import NavPills from "./components/NavPills/NavPills.jsx";
import Card from "./components/Card/Card.jsx";
import CardBody from "./components/Card/CardBody.jsx";
import CardHeader from "./components/Card/CardHeader.jsx";
import Badge from "./components/Badge/Badge.jsx";
import Muted from "./components/Typography/Muted.jsx";
import Parallax from "./components/Parallax/Parallax.jsx";
import Clearfix from "./components/Clearfix/Clearfix.jsx";
import Button from "./components/CustomButtons/Button.jsx";
import CustomInput from './components/CustomInput/CustomInput.jsx';
import InputAdornment from "@material-ui/core/InputAdornment";
import { updateButtons } from './actions/buttonController';

import profilePageStyle from "./assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import BG from "./assets/img/profileBGFinal.jpg";
import logo from "./assets/img/LogoMVN.svg";
import './animate.css';

function mapStateToProps(state) {
  return {
    // for when profile redux is added
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateButtons: data => dispatch(updateButtons(data))
  };
}

const error_show = {
  fontSize: '15px',
  textAlign: 'center',
  color :'red'
};
const tooltipModalTemp = {
  top: '36vh',
    left: '42vw',
    position: 'absolute'
};

const iconContainerTemp = {
  top: '10vh',
  right: '7vw',
  position: 'absolute'
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountEdit: 'view',
      email: localStorage.getItem('email'),
      first: localStorage.getItem('firstname'),
      last: localStorage.getItem('lastname'),
      phone: localStorage.getItem('telephone'),
      address1: localStorage.getItem('street'),
      address2: '',
      state: localStorage.getItem('region'),
      city: localStorage.getItem('city'),
      zip: localStorage.getItem('postcode'),
      showPass: false,
      pass: '',
      passNew: '',
      passNewConfirm: '',
      tooltip: false,
      first_error : '',
      last_error : '',
      address1_error : '',
      address2_error : '',
      zip_error : '',
      city_error : '',
      state_error : '',
      success : false,
      success_profile :false,
    }
    this.props.updateButtons({ menu: true });
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFirst = this.updateFirst.bind(this);
    this.updateLast = this.updateLast.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress1 = this.updateAddress1.bind(this);
    this.updateAddress2 = this.updateAddress2.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordNew = this.updatePasswordNew.bind(this);
    this.updatePasswordNewConfirm = this.updatePasswordNewConfirm.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  componentWillUnmount(){
    fetch(`https://dev.moonvalleynurseries.com/test_blob/designImage.php`, {
        method: 'POST',
        body: 'asdasd',
      })
      .then(res => res.json())
      .then(res => {
          console.warn(res);
          if(res.success == true) {
            this.setState({ imageUrl : res.DATA.imageUrl });
          }
        // this.setState({ 
        //   uploading: false,
        //   images
        // });
      });
  }
  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  updateFirst(event) {
    this.setState({
      first: event.target.value
    });
  }
  updateLast(event) {
    this.setState({
      last: event.target.value
    });
  }
  updatePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }
  updateAddress1(event) {
    this.setState({
      address1: event.target.value
    });
  }
  updateAddress2(event) {
    this.setState({
      address2: event.target.value
    });
  }
  updateZip(event) {
    this.setState({
      zip: event.target.value
    });
  }
  updateCity(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleState(event) {
    this.setState({
      state: event.target.value
    });
  }
  updatePassword(event) {
    this.setState({
      pass: event.target.value
    });
  }
  updatePasswordNew(event) {
    this.setState({
      passNew: event.target.value
    });
  }
  updatePasswordNewConfirm(event) {
    this.setState({
      passNewConfirm: event.target.value
    });
  }
  resetPassword(){
    var password_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(password_reg.test(this.state.pass) && password_reg.test(this.state.passNew) && password_reg.test(this.state.passNewConfirm) && this.state.passNew == this.state.passNewConfirm){
      fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body : '{"action":"updatePassword","params":{"customer_id":"'+localStorage.getItem('userId')+'", "currentPassword":"'+this.state.pass+'","newPassword": "'+this.state.passNew+'","token" :"'+localStorage.getItem('token')+'"}}',
        })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.success == true) {
           this.setState({success : true});
           setTimeout(()=>{ this.setState({accountEdit:'view'})}, 3000);
          }else{
            this.setState({accountEdit:'reset'})
            this.setState({old_pass_error : res.message})
          }
      });
  }else{
  console.log('error');
      if(password_reg.test(this.state.pass) == false){
        this.setState({old_pass_error : 'Invalid Password'})
      }
      if(password_reg.test(this.state.passNew) == false){
        this.setState({new_pass_error: 'Invalid Password'})
      }
      if(password_reg.test(this.state.passNewConfirm) == false){
        this.setState({new_pass_confirm_error : 'Invalid Password'})
      }
      if(this.state.passNew != this.state.passNewConfirm && password_reg.test(this.state.passNew) && password_reg.test(this.state.passNewConfirm)){
        this.setState({new_pass_confirm_error : 'Password mismatch'})
      }
    }
  }

  updateProfile(){
    if(this.state.first !== "" && this.state.last !== "" && this.state.address1 !== "" && this.state.address2 !== "" && this.state.zip !== "" && this.state.city !== "" && this.state.state !== ""){
      fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body : '{"action":"updateUser","params":{"email":"'+this.state.email+'","id":"'+localStorage.getItem('userId')+'","firstname":"'+this.state.first+'","lastname":"'+this.state.last+'","region":"'+this.state.state+'","regionId":"12","postcode":"'+this.state.zip+'","street":"'+this.state.address1+'","city":"'+this.state.city+'","telephone":"'+this.state.phone+'","countryId":"US","address_id":"131","token":"'+localStorage.getItem('token')+'"}}',
        })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.success !== false) {
            localStorage.setItem('email',this.state.email);
            localStorage.setItem('firstname',this.state.first);
            localStorage.setItem('lastname',this.state.last);
            localStorage.setItem('telephone',this.state.email);
            localStorage.setItem('postcode',this.state.zip);
            localStorage.setItem('city',this.state.city);
            localStorage.setItem('street',this.state.address1);
            localStorage.setItem('region',this.state.state);
            this.setState({success_profile : true});
            setTimeout(()=>{ this.setState({accountEdit:'view'})}, 3000);
          }else{
            this.setState({accountEdit:'edit'})
          }
      });
  }else{
  console.log('error');
      if(this.state.first == ""){
        this.setState({first_error : 'First Name is required'})
      }
      if(this.state.last == ""){
        this.setState({last_error : 'Last Name is required'})
      }
      if(this.state.address1 == ""){
        this.setState({address1_error : 'Address1 is required'})
      }
      if(this.state.address2 == ""){
        this.setState({address2_error : 'Address2 is required'})
      }
      if(this.state.zip == ""){
        this.setState({zip_error : 'Zip is required'})
      }
      if(this.state.city == ""){
        this.setState({city_error : 'City is required'})
      }
      if(this.state.state == ""){
        this.setState({state_error : 'State is required'})
      }
    }
  }
  render() {
    var Account,
      pass,
      passNew,
      passNewConfirm,
      icon,
      tooltipModal
    const { classes, ...rest } = this.props;
    const AccountEdit = (
      <Card className={classNames(classes.editCard, 'fadeIn')}>
        <CardHeader className={classes.cardHeader}>
          <h2 className={classes.cardTitle}>My Profile</h2>
          <p style = {error_show} className = {this.state.success_profile  ? '':"hidden"}>Profile Updated Successfully</p>
        </CardHeader>
        <form>
          <GridContainer justify='center' className={classes.formContainer}>
            <GridItem xs={10} className={classes.gridItem}>
              <TextField
                id="standard-dense"
                label="* Email"
                className={classes.input}
                value={this.state.email}
                onChange={this.updateEmail}
                fullWidth={true}
                margin="dense"
                type='text'
              />
               <p style = {error_show}>{this.state.first_error}</p>
            </GridItem>
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                id="standard-dense"
                label="* First Name"
                className={classes.input}
                value={this.state.first}
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
                value={this.state.last}
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
                value={this.state.address1}
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
                value={this.state.address2}
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
                  value={this.state.state}
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
                <p style = {error_show}>{this.state.state_error}</p>
              </FormControl>
            </GridItem>
            <GridItem xs={5} className={classes.gridItem}>
              <TextField
                label="* City"
                id="city"
                className={classes.input}
                value={this.state.city}
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
                value={this.state.zip}
                onChange={this.updateZip}
                fullWidth={true}
                margin="dense"
                type='text'
              />
               <p style = {error_show}>{this.state.zip_error}</p>
            </GridItem>
            <GridItem xs={5}></GridItem>
              <GridItem xs={5}>
                <ButtonMaterial className={classes.buttonSaveEdit} size="large" onClick={this.updateProfile}>
                  Save
                </ButtonMaterial>
              </GridItem>
            <GridItem xs={5}>
              <ButtonMaterial className={classes.buttonCancelEdit} variant="outlined" size="large" onClick={() => this.setState({accountEdit: 'view'})}>
                Cancel
              </ButtonMaterial>
            </GridItem>
          </GridContainer>
        </form>
      </Card>
    );
    const AccountView = (
      <Card className={classNames(classes.viewCard, 'fadeInTwo')}>
        <CardHeader className={classes.cardHeader}>
          <h2 className={classes.cardTitle}>My Profile</h2>
        </CardHeader>
        <GridContainer justify='center' className={classes.formContainer}>
          <GridItem xs={10} className={classes.gridItem}>
            <TextField
              disabled
              id="standard-dense"
              label="* Email"
              className={classes.inputView}
              value={this.state.email}
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={5} className={classes.gridItem}>
            <TextField
              id="standard-dense"
              label="* First Name"
              className={classes.inputView}
              value={this.state.first}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={5} className={classes.gridItem}>
            <TextField
              label="* Last Name"
              id="last"
              className={classes.inputView}
              value={this.state.last}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={10} className={classes.gridItem}>
            <TextField
              label="* Address line 1"
              id="address1"
              className={classes.inputView}
              value={this.state.address1}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={10} className={classes.gridItem}>
            <TextField
              label="* Address line 2"
              id="address2"
              className={classes.inputView}
              value={this.state.address2}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={5} className={classes.gridItem}>
            <FormControl
              fullWidth
              className={classes.selectFormControlView}>
              <InputLabel
                htmlFor="state"
                className={classes.selectLabel}>
                * State
              </InputLabel>
              <Select
                disabled
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.state}
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
          </GridItem>
          <GridItem xs={5} className={classes.gridItem}>
            <TextField
              label="* City"
              id="city"
              className={classes.inputView}
              value={this.state.city}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={5} className={classes.gridItem}>
            <TextField
              label="* Postal Code"
              id="post"
              className={classes.inputView}
              value={this.state.zip}
              disabled
              fullWidth={true}
              margin="dense"
              type='text'
            />
          </GridItem>
          <GridItem xs={5}></GridItem>
          <GridItem xs={5}>
            <ButtonMaterial className={classes.buttonEdit} variant="outlined" size="large" onClick={() => this.setState({accountEdit: 'edit'})}>
              Edit Profile
            </ButtonMaterial>
          </GridItem>
          <GridItem xs={5}>
            <ButtonMaterial className={classes.buttonReset} variant="outlined" size="large" onClick={() => this.setState({accountEdit: 'reset'})}>
              Reset Password
            </ButtonMaterial>
          </GridItem>
        </GridContainer>
      </Card>
    );
    if (this.state.showPass) {
      pass = (
        <GridItem xs={10}>
          <TextField
            label="* Old Password"
            id="password"
            className={classes.input}
            value={this.state.pass}
            onChange={this.updatePassword}
            fullWidth={true}
            margin="dense"
            type='text'
          />
          <p style = {error_show}>{this.state.old_pass_error}</p>
        </GridItem>
      );
      passNew = (
        <GridItem xs={10}>
          <TextField
            label="* New Password"
            id="passwordNew"
            className={classes.input}
            value={this.state.passNew}
            onChange={this.updatePasswordNew}
            fullWidth={true}
            margin="dense"
            type='text'
          />
          <p style = {error_show}>{this.state.new_pass_error}</p>
        </GridItem>
      );
      passNewConfirm = (
        <GridItem xs={12}>
          <GridContainer justify='center'>
            <GridItem xs={10}>
              <TextField
                label="* New Password Confirmation"
                id="passwordCon"
                className={classes.input}
                value={this.state.passNewConfirm}
                onChange={this.updatePasswordNewConfirm}
                fullWidth={true}
                margin="dense"
                type='text'
              />
              <p style = {error_show}>{this.state.new_pass_confirm_error}</p>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
      icon = <VisibilityOff className={classNames(classes.inputIconsColor, classes.showIcon)} onClick={() => this.setState({ showPass: false })}/>
    } else {
      pass = (
        <GridItem xs={10}>
          <TextField
            label="* Old Password"
            id="password"
            className={classes.input}
            value={this.state.pass}
            onChange={this.updatePassword}
            fullWidth={true}
            margin="dense"
            type='password'
          />
          <p style = {error_show}>{this.state.old_pass_error}</p>
        </GridItem>
      );
      passNew = (
        <GridItem xs={10}>
          <TextField
            label="* New Password"
            id="passwordNew"
            className={classes.input}
            value={this.state.passNew}
            onChange={this.updatePasswordNew}
            fullWidth={true}
            margin="dense"
            type='password'
          />
          <p style = {error_show}>{this.state.new_pass_error}</p>
        </GridItem>
      );
      passNewConfirm = (
        // <GridItem xs={12}>
        //   <GridContainer justify='center'>
            <GridItem xs={10}>
              <TextField
                label="* Confirm Password"
                id="passwordCon"
                className={classes.input}
                value={this.state.passNewConfirm}
                onChange={this.updatePasswordNewConfirm}
                fullWidth={true}
                margin="dense"
                type='password'
              />
              <p style = {error_show}>{this.state.new_pass_confirm_error}</p>
            </GridItem>
        //   </GridContainer>
        // </GridItem>
      );
      icon = <Visibility className={classNames(classes.inputIconsColor, classes.showIcon)} onClick={() => this.setState({ showPass: true })}/>
    }
    if (this.state.tooltip) {
      tooltipModal = (
        <div style={tooltipModalTemp}>
          <Typography variant='body2'>
            * Password requires 8 characters, 1 uppercase,
          </Typography>
          <Typography variant='body2'>
            1 lowercase, 1 number and no spaces
          </Typography>
        </div>
      );
    } else {
      tooltipModal = <div></div>
    }
    var PasswordView = (
      <Card className={classNames(classes.passwordCard, 'fadeIn')}>
        <CardHeader className={classes.cardHeader}>
          <h2 className={classes.cardTitle}>Reset Password</h2>
          <p style = {error_show} className = {this.state.success  ? '':"hidden"}>Password Reset Successfully</p>
        </CardHeader>
        <div style={iconContainerTemp}>
          {icon}
          <button onClick={() => this.setState({ tooltip: !this.state.tooltip })} className={classes.infoButton}>
            <Info className={classes.infoIconColor} />
          </button>
        </div>
        <GridContainer justify='center' className={classes.passwordContainer}>
          {pass}
          {passNew}
          {passNewConfirm}
        </GridContainer>
        {tooltipModal}
        <GridContainer justify='center'>
          <GridItem xs={5}>
            <ButtonMaterial className={classes.buttonEdit} variant="outlined" size="large" onClick={this.resetPassword}>
              Reset
            </ButtonMaterial>
          </GridItem>
          <GridItem xs={5}>
            <ButtonMaterial className={classes.buttonCancel} variant="outlined" size="large" onClick={() => this.setState({accountEdit: 'view'})}>
              Cancel
            </ButtonMaterial>
          </GridItem>
        </GridContainer>
      </Card>
    );
    if (this.state.accountEdit === 'edit') {
      Account = AccountEdit
    } else if (this.state.accountEdit === 'view') {
      Account = AccountView
    } else {
      Account = PasswordView
    }
    return (
      <div className={classes.background}>
        <div
          className={classNames(classes.pageHeader, 'fadeInTwo')}
          style={{
            backgroundImage: "url(" + BG + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        ></div>
        <div className={classes.main}>
          {Account}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(profilePageStyle)(ProfilePage));
