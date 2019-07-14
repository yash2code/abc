import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from "./components/Card/Card.jsx";
import classNames from "classnames";
import ButtonMaterial from '@material-ui/core/Button';
import { handleNavigation } from './actions/navigationController';
import BG from './assets/img/404BGFinal.jpg';

function mapStateToProps(state) {
  return {
    // for if 404 redux is added
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNavigation: route => dispatch(handleNavigation(route))
  };
}

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="main">
        <div className={classNames(classes.bg, 'fadeInTwo')}></div>
        <Card className={classes.card}>
          <Typography variant='body1' className={classes.text}>404 Page not found</Typography>
          <ButtonMaterial
            variant='outlined'
            size='large'
            className={classes.button}
            onClick={() => this.props.handleNavigation('register')}
          >
            Back
          </ButtonMaterial>
        </Card>
      </div>
    );
  }
}

const styles = {
  main: {
    textAlign: 'center',
  },
  button: {
    marginTop: '4vh',
    marginBottom: '2vh',
    backgroundColor: '#ff0000',
    color: '#fff',
    width: '50%',
    marginLeft: '25%',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  bg: {
    backgroundImage: 'url(' + BG + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1
  },
  card: {
    position: 'absolute',
    height: '24vh',
    width: '33vw',
    left: '33vw',
    top: '20vh',
    zIndex: 4,
    "@media (max-width:767px)": {
      width: '90%',
      left: '5%',
    }
  },
  text: {
    textAlign: 'center',
    color: '#000',
    zIndex: 4,
    marginTop: '5vh'
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
