import React, { Component } from 'react';
import Navbar from './navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { resetNavigation } from './actions/navigationController';
import home from './home.js';
import login from './login.js';
import register from './register.js';
import profile from './profile.js';
import designs from './designs.js';
import dashboard from './dashboard.js';
import forget_password from './forget_password.js';
import faq from './faq.js';
import NoMatch from './404.js';
import './animate.css';

function mapStateToProps(state) {
  return {
    toHome: state.navigationReducer.toHome,
    toLogin: state.navigationReducer.toLogin,
    toRegister: state.navigationReducer.toRegister,
    toDash: state.navigationReducer.toDash,
    toProfile: state.navigationReducer.toProfile,
    toDesigns: state.navigationReducer.toDesigns,
    toFaq: state.navigationReducer.toFaq,
    toAsk: state.navigationReducer.toAsk,
    toForgetPassword : state.navigationReducer.toForgetPassword,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetNavigation: () => dispatch(resetNavigation())
  }
}

class App extends Component {
  componentWillReceiveProps(props) {
    setTimeout(100, this.props.resetNavigation())
  }
  render() {
    var url
    if (this.props.toLogin === true) {
      url = <Redirect to='/login' />
    }
    if (this.props.toRegister === true) {
      url = <Redirect to='/register' />
    }
    if (this.props.toDash === true) {
      url = <Redirect to='/dashboard' />
    }
    if (this.props.toProfile === true) {
      url = <Redirect to='/profile' />
    }
    if (this.props.toDesigns === true) {
      url = <Redirect to='/designs' />
    }
    if (this.props.toFaq === true) {
      url = <Redirect to='/faq/false' />
    }
    if (this.props.toAsk === true) {
      url = <Redirect to='/faq/true' />
    }
    if(this.props.toForgetPassword === true){
      url = <Redirect to='/forget_password' />
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <div>
              <Navbar />
              {url}
              <Switch>
                  <Route exact path="/" component={home}/>
                  <Route exact path="/login" component={login}/>
                  <Route exact path="/register" component={register}/>
                  <Route exact path="/profile" component={profile}/>
                  <Route exact path="/designs" component={designs}/>
                  <Route exact path="/dashboard" component={dashboard}/>
                  <Route exact path="/faq/:ask" component={faq}/>
                  <Route exact path="/forget_password" component={forget_password}/>
                  <Route exact component={NoMatch}/>
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Montserrat", sans-serif',
    color: 'primary',
  },
  overrides: {
    MuiSelect: {
      select: {
        textAlign: 'left',
        '&:focus': {
          backgroundColor: '#fff',
        }
      },
    },
    MuiTooltip: {
      tooltipPlacementLeft: {
        backgroundColor: '#fff',
        border: '1px solid #ff0000',
        color: '#000',
        fontWeight: 'bold',
      },
    },
    MuiDrawer: {
      paper: {
        overflowX: 'scroll',
        overflowY: 'visible',
        "@media (max-width: 767px)": {
          width: '80% !important',
        },
      },
    },
    MuiButton: {
      root: {
        fontFamily: '"Montserrat", sans-serif',
      },
    },
    MuiStepLabel: {
      label: {
        color: '#fff !important',
      }
    },
    MuiStepIcon: {
      root: {
        color: '#b0b0b0',
        width: 'auto',
        height: '4vh',
        zIndex: 3,
      },
      active: {
        color: '#ff0000 !important',
        zIndex: 3,
      },
      completed: {
        color: '#ff0000 !important',
        zIndex: 3,
      },
      text: {
        color: 'white',
        fill: 'inherit'
      }
    },
    MuiStep: {
      root: {
        "@media (max-width: 767px)": {
          width:'100% !important',
          padding: '5px 0px !important',
        }
      },
    },
    MuiDivider: {
      root: {
        position: 'absolute',
        left: 0,
        height: '2px',
        width: '100vw',
      },
    },
  },
  palette: {
    primary: { main: '#ffffff' },
    secondary: { main: '#252525' },
    tertiary: { main: '#ff0000' },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
