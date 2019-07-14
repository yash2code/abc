import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import Grid from '@material-ui/core/Grid';
import ButtonMaterial from '@material-ui/core/Button';
import Card from "./components/Card/Card.jsx";
import CardBody from "./components/Card/CardBody.jsx";
import CardHeader from "./components/Card/CardHeader.jsx";
import TextField from '@material-ui/core/TextField';
import { updateButtons } from './actions/buttonController';
import { handleNavigation } from './actions/navigationController';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import image from "./assets/img/loginBGFinal.jpg";

import loginPageStyle from "./assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

const error_show = {
  fontSize: '15px',
  textAlign: 'center',
  color :'red',
  marginLeft: '80px'
};
function mapStateToProps(state) {
  // for when we set up login redux
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    updateButtons: data => dispatch(updateButtons(data)),
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      toRegister: false,
      toForgetPassword: false,
      toBuild: false,
      showPass: false,
      error_login : false,
      email:'',
      password:'',
      email_error : '',
      password_error : '',
    }
    this.props.updateButtons({ menu: false });
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateEmail(evt){
    this.setState({email: evt.target.value});
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(this.state.email) == true){
      this.setState({email_error : ''});
    }
  };

  updatePassword(evt){
    this.setState({password: evt.target.value});
    if(this.state.password !==''){
      this.setState({password_error : ''});
    }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body : '{"action":"getToken"}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.success == true) {
          localStorage.setItem('token', response.token);
        }
      })
      .catch(error => {
        this.setState({toBuild: false });
        //error invalid user
      });
  }

  render() {
    var url,
      pass
    const { classes } = this.props;
    if (this.state.toRegister) {
      url = <Redirect to='/register' />
    }

    if(this.state.toForgetPassword){
      url = <Redirect to='/forget_password' />
    }
    if (this.state.toBuild) {
      // url = <Redirect to='/dashboard/false' />
      // return <Redirect to='/dashboard'/>
      console.log(this.state.email);
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.state.email) == true && this.state.password !== "") { 
      fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body : '{"action":"userLogin","params":{"username":"'+this.state.email+'","password":"'+this.state.password+'","token":"dapyhnthgrf0ar02tq5qog2unuin61p7"}}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.DATA);
        if(response.success == true) {
          localStorage.setItem('userId', response.DATA.id);
          localStorage.setItem('logged', true);
          localStorage.setItem('email',response.DATA.email);
          localStorage.setItem('firstname',response.DATA.firstname);
          localStorage.setItem('lastname',response.DATA.lastname);
          localStorage.setItem('telephone',response.DATA.addresses[0]['telephone']);
          localStorage.setItem('postcode',response.DATA.addresses[0]['postcode']);
          localStorage.setItem('city',response.DATA.addresses[0]['city']);
          localStorage.setItem('street',response.DATA.addresses[0]['street'][0]);
          localStorage.setItem('region',response.DATA.addresses[0]['region']['region_code']);
          this.setState({toBuild: false });
          console.log('before redirect');
          redirect: window.location.replace("/dashboard") ;
        }else{
          this.setState({error_login: true });
          this.setState({toBuild: false });
        }
      })
      .catch(error => {
        this.setState({toBuild: false });
        //error invalid user
      });
    }else{
      if(reg.test(this.state.email) == false){
          this.setState({email_error:'Invalid Email Id'});
      }
      if(this.state.password == ""){
          this.setState({password_error:'Password is required'});
      }
      this.setState({toBuild: false });
    }
      // return <Redirect to='/dashboard'/>
    }
    if (this.state.showPass) {
      pass = (
        <Grid container spacing={16} alignItems="flex-end">
          <Grid item xs={2}>
            <Icon className={classes.inputIconsColor}>
              lock-outline
            </Icon>
          </Grid>
          <Grid item xs={9}>
            <TextField
              label="* Password"
              id="password"
              className={classes.input}
              value={this.state.password}
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
          <Grid item xs={2}>
            <Icon className={classes.inputIconsColor}>
              lock-outline
            </Icon>
          </Grid>
          <Grid item xs={9}>
            <TextField
              label="* Password"
              id="password"
              className={classes.input}
              value={this.state.password}
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
    return (
      <div>
        {url}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={6}>
                <Card className={'fadeIn'}>
                  {/* <form className={classes.form} onSubmit={e => { alert('kalsjdf'); e.preventDefault(); }}> */}
                    <CardHeader
                      signup
                      className={classes.cardHeader}
                    >
                      <h2 className={classes.cardTitle}>Welcome - Sign In</h2>
                    </CardHeader>
                    <p style = {error_show} className = {this.state.error_login  ? '':"hidden"}>Invalid user</p>
                    <CardBody signup>
                      <GridContainer justify='center' className={classes.formContainer}>
                        <GridItem xs={10} className={classes.gridItem}>
                          <Grid container spacing={16} alignItems="flex-end">
                            <Grid item xs={2}>
                              <Email className={classes.inputIconsColor} />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                label="* Email"
                                id="email"
                                className={classes.input}
                                value={this.state.email}
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
                          {pass}
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <div className={classes.textCenter}>
                      <ButtonMaterial className={classes.buttonLogin} variant="outlined" size="large" onClick={() => this.setState({toBuild: true})}>
                        Sign in
                      </ButtonMaterial>
                      <button className={classes.button} onClick={() => this.props.handleNavigation('forget_password')}>
                        Forgot your password?
                      </button>
                      <button className={classes.last} onClick={() => this.props.handleNavigation('register')}>
                        Register new account
                      </button>
                    </div>
                  {/* </form> */}
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
