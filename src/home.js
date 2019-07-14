import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ButtonMaterial from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import { updateButtons } from './actions/buttonController';
import './home.css';
import logo from "./assets/img/LogoMVN.svg";
import video from "./assets/img/BackyardBuilderBG2.mp4";
var url

function mapStateToProps(state) {
  // wont load without both mapStateToProps & mapDispatchToProps for some strange reason
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toRegister: false
    }
    this.props.updateButtons({ menu: false });
  }

  componentDidMount() {
    var vid = document.getElementById("vid");
    vid.playbackRate = 0.7;
  }

  render () {
    const { classes } = this.props;
    console.log(classes);
    if (this.state.toRegister) {
      url = <Redirect to='/login' />
    }
    return (
      <div className={classes.pageHeader}>
        {url}
        <div className={this.state.backClass} className={classes.homeVideoCont}>
          <img src={logo} className={classes.logo} alt='logo' />
          <Typography variant='h4' className={classes.logoHeader}>
            Backyard Builder
          </Typography>
          <div className={classes.startButton}>
            <ButtonMaterial className={'buttonStart'} size="large" onClick={() => this.setState({toRegister: true})}>
              Start Designing
            </ButtonMaterial>
          </div>
        </div>
        <div className={classes.videoContainer}>
          <video autoPlay muted loop id={'vid'} className={classes.video}>
            <source src={video} type="video/mp4"/>
            Your browser doesn't support the video tag
          </video>
        </div>
      </div>
    );
  }
}

const style = {
  pageHeader: {
    border: "0",
    margin: "0",
    display: "flex!important",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    overflow: 'hidden',
    zIndex: -1,
    paddingTop: '35vh',
  },
  button: {
    margin: 0,
    width: '60%',
    color: '#ffffff',
    borderColor: '#ffffff'
  },
  startButton: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 50,
  },
 video: {
    zIndex: 11,
    height: '210vh',
    width: '340vh',
    overflow: 'hidden',
    top: '0vh',
    left: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  videoContainer: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.3)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "12",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  homeVideoCont: {
    width: '100%',
    position:'absolute',
    height: '100%',
    zIndex: 15,
    textAlign: 'center',
    top: 0,
    marginTop: 15
  },
  logo: {
    // zIndex: 13,
     width: '40vw',
    // position: 'absolute',
    // overflow: 'hidden',
    // top: '10vh',
    // left: '33vw',
    "@media (max-width: 767px)": {
          width: '280px !important',
          // left: '50%',
          // marginLeft: '-140px',
    }
  },
  logoHeader: {
  //   zIndex: 13,
  //   width: '40vw',
    textAlign: 'center',
  //   position: 'absolute',
  //   overflow: 'hidden',
  //   top: '32vh',
  //   left: '40vw',
    color: '#fff',
    fontFamily: 'Lato, sans-serif',
    fontWeight: 'bold',
    "@media (max-width: 767px)" : {
      fontSize: '20px !important',
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
