import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { handleNavigation } from './actions/navigationController';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import logo from "./assets/img/LogoMVN.svg";
import Tutorial from './components/Homebrew/Tutorial.jsx';
import { startTutorial, resetTutorial, nextTutorialStep } from './actions/tutorialController';
import { updateBackground } from './actions/dashboardController';

function mapStateToProps(state) {
  return {
    menu: state.buttonReducer.menu,
    step: state.tutorialReducer.step,
    isRunning: state.tutorialReducer.isRunning,
    splash: state.tutorialReducer.splash,
    backgroundSource: state.dashboardReducer.backgroundSource
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNavigation: route => dispatch(handleNavigation(route)),
    startTutorial: () => dispatch(startTutorial()),
    nextTutorialStep: () => dispatch(nextTutorialStep()),
    resetTutorial: () => dispatch(resetTutorial()),
    updateBackground: src => dispatch(updateBackground(src)),
  };
}

class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      left: false
    };
    this.togglePane = this.togglePane.bind(this);
  }

  togglePane () {
    var bool = !this.state.left
    this.setState({
      left: bool
    })
  }

  render(){
    const { classes } = this.props;
    var toggle, tutorial
    if (!this.props.menu) {
      toggle = <div></div>
    } else {
      toggle = (
        <div>
          <img src={logo} alt='logo' className={classNames(classes.logo, 'fab')} />
          <Fab
            className={classNames(classes.menuButton, 'fab', {'hidden': ( this.props.splash && this.props.isRunning ) })}
            onClick={() => {
              if (this.props.step !== 6) {
                this.togglePane();
              }
            }}
            aria-label="Menu"
          >
            <MenuIcon/>
          </Fab>
        </div>
      );
    }
    if (this.props.isRunning) {
      tutorial = <Tutorial />
    } else {
      tutorial = <div></div>
    }
    return (
      <div className={classes.root}>
        {tutorial}
        {toggle}
        <Drawer open={this.state.left} onClose={this.togglePane} className={classes.drawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.togglePane}
          >
            <List className={classes.list}>
              {['New Design', 'My Designs', 'My Profile', 'Tutorial', 'FAQ', 'Questions', 'About'].map((text, index) => (
                <ListItem button key={text} onClick={() => {
                    if (text === 'Tutorial') {
                      this.props.handleNavigation('New Design');
                      this.props.updateBackground('');
                      this.props.startTutorial();
                    } else {
                      this.props.resetTutorial();
                      this.props.handleNavigation(text);
                    }
                  }}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <div className={classNames(classes.resetContainer, { 'hidden': this.props.backgroundSource === '' })}>
              <Fab
                className={classes.resetFab}
                onClick={() => {
                  this.props.updateBackground('');
                }}
              >
                <Close className={classes.resetIcon} />
              </Fab>
              <Typography variant='body1' className={classes.resetText}>
                Reset Design
              </Typography>
            </div>
            <Typography variant='body1' className={classes.versionNumber}>
              Backyard Builder v2.0
            </Typography>
            <Typography variant='body1' className={classes.legal}>
              © 1995 - 2019 Moon Valley Nurseries
            </Typography>
            <Typography variant='body1'  className={classes.legalTwo}>
              All Rights Reserved
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  drawer: {
    width: '26vw',
    overflow: 'hidden',
    flexShrink: 0,
    zIndex: 4,
    
  },
  list: {
    marginTop: '26vh',
    marginLeft: '4vw',
    width: '26vw',
    "@media (max-width: 767px)": {
      width: '100% !important',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    zIndex: 5,
    left: '210px',
    top: '24px',
    position: 'absolute',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#ff0000',
    color: '#fff',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    },
    "@media (max-width: 767px)": {
      top: '50px',
      left:'30px',
    },
  },
  content: {
    textAlign: 'center',
    width: '18vw',
  },
  logo: {
    zIndex: 5,
    position: 'absolute',
    top: '3vh',
    left: '2vw',
    width: '15vw',
    height: 'auto',
    "@media (max-width: 767px)": {
      width: '70%',
      left:'80px',
    },
  },
  resetContainer: {
    width: '80%',
    marginLeft: '6.1vw',
    marginTop: '16%',
    lineHeight: '4vh',
  },
  resetText: {
    float: 'right',
    width: '60%',
    marginRight: '22%',
    lineHeight: '4.5vh',
  },
  resetFab: {
    backgroundColor: '#ff0000',
    color: '#fff',
    height: '4vh',
    width: '4vh',
    minHeight: '0',
    padding: 0,
    margin: 0,
    '&:hover': {
      color: '#ff0000',
      backgroundColor: '#fff',
    }
  },
  resetIcon: {
    color: '#fff',
    width: '60%',
    '&:hover': {
      color: '#ff0000 !important',
      backgroundColor: '#fff',
    }
  },
  versionNumber: {
    position: 'absolute',
    left: '4vw',
    bottom: '8vh',
    fontSize: '0.7em',
    opacity: 0.7,
  },
  legal: {
    position: 'absolute',
    left: '4vw',
    bottom: '4vh',
    fontSize: '0.7em',
    opacity: 0.7,
  },
  legalTwo: {
    position: 'absolute',
    left: '4vw',
    bottom: '2vh',
    fontSize: '0.7em',
    opacity: 0.7,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
