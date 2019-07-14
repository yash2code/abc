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
  color :'red'
};

const done_button = {
    marginright: '8vh',
}

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

class ForgetPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      toRegister: false,
      toBuild: false,
      showPass: false,
      error_login : false,
      email:'',
      email_error : '',
    }
    this.props.updateButtons({ menu: false });
    this.updateEmail = this.updateEmail.bind(this);
  }

  updateEmail(evt){
    this.setState({email: evt.target.value});
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(this.state.email) == true){
      this.setState({email_error : ''});
    }
  };
  
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    var url,
      pass
    const { classes } = this.props;
    if (this.state.toRegister) {
      url = <Redirect to='/register' />
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
          body : '{"action":"isEmailAvailable","params":{"customerEmail":"'+this.state.email+'","token":"dapyhnthgrf0ar02tq5qog2unuin61p7"}}',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response.success) {
          console.log('email exist')
          this.setState({email_error : 'Email does not exist'}
          );
                // fetch(`https://dev.moonvalleynurseries.com/magentoapi.php`,{
                //     method: 'POST',
                //     headers: {
                //     'Content-Type': 'application/json',
                //     },
                //     body : '{"action":"isEmailAvailable","params":{"customerEmail":"'+this.state.email+'","token":"dapyhnthgrf0ar02tq5qog2unuin61p7"}}',
                // })
                // .then((response) => response.json())
                // .then((response) => {
                //     console.log(response,'in sucess');
                //     if(response.success === false){
                //         console.log('in');
                //     }else{
                //         console.log('out');
                //     }
                // })
                // .catch(error => {
                // this.setState({toBuild: false });
                // //error invalid user
                // });
        }else{
            this.setState({email_error : null},() => window.location.reload());
            this.setState({toBuild: false });
        }
      })
      .catch(error => {
        this.setState({toBuild: false });
        //error invalid user
      });
    }else{
      if(reg.test(this.state.email) == false){
          this.setState({email_error:'Invalid User Email'});
      }
      this.setState({toBuild: false });
    }
      // return <Redirect to='/dashboard'/>
    }
    return (
      <div>
        {url}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={6}>
                <Card className={'fadeIn'}>
                  <form className={classes.form}>
                    <CardHeader
                      signup
                      className={classes.cardHeader}
                    >
                      <h2 className={classes.cardTitle}>Forget Password</h2>
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
                      </GridContainer>
                    </CardBody>
                    <div className={classes.textCenter}>
                      <ButtonMaterial className={classes.buttonLogin}  variant="outlined"  onClick={() => this.setState({toBuild: true})}>
                        Done
                      </ButtonMaterial>
                      <ButtonMaterial className={classes.buttonCancel} variant="outlined" onClick={() => this.props.handleNavigation('login')}>
                        Cancel
                      </ButtonMaterial>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(ForgetPassword));
