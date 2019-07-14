import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { resetTutorial, startTutorial, nextTutorialStep } from '../../actions/tutorialController';
import { resetGuides, updateBackground } from '../../actions/dashboardController';
import { updateButtons } from '../../actions/buttonController';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ButtonMaterial from '@material-ui/core/Button';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import BGImage from '../../assets/img/dashboardBGFinal.jpg'

function mapStateToProps(state) {
  return {
    step: state.tutorialReducer.step,
    tutorialSteps: state.tutorialReducer.tutorialSteps,
    splash: state.tutorialReducer.splash,
    backgroundSource: state.dashboardReducer.backgroundSource
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetTutorial: () => dispatch(resetTutorial()),
    startTutorial: () => dispatch(startTutorial()),
    nextTutorialStep: () => dispatch(nextTutorialStep()),
    resetGuides: () => dispatch(resetGuides()),
    updateButtons: data => dispatch(updateButtons(data)),
    updateBackground: source => dispatch(updateBackground(source))
  };
}

class Tutorial extends Component {
  render () {
    const { classes } = this.props;
    var next, leftImagePos, rightImagePos, view, BG
    if (this.props.backgroundSource !== '') {
      BG = this.props.backgroundSource
    } else {
      BG = BGImage
    }
    if ( this.props.step === 6 || this.props.step === 5 || this.props.step === 4 ) {
      next = (
        <GridItem xs={5}>
          <ButtonMaterial
            variant='outlined'
            size='large'
            className={classes.nextButton}
            onClick={() => {
              if (this.props.step === 6) {
                this.props.resetTutorial();
                this.props.updateBackground('');
              } else if (this.props.step === 5) {
                this.props.resetGuides();
                this.props.updateButtons({ menu: true });
                this.props.nextTutorialStep();
              } else {
                this.props.nextTutorialStep();
              }
            }}
          >
            {(this.props.step === 6) ? 'Complete Tutorial' : 'Next Step'}
          </ButtonMaterial>
        </GridItem>
      );
    } else {
      next = <div></div>
    }
    if (( this.props.step !== 0 && this.props.step !== 1 ) || this.props.splash) {
      leftImagePos = 100 + '%'
      rightImagePos = 100 + '%'
    } else {
      leftImagePos = (100 - this.props.tutorialSteps[this.props.step].left) + '%'
      rightImagePos = (100 - this.props.tutorialSteps[this.props.step].right) + '%'
    }
    const tutorialView = (
      <div key='tutorialView'>
        <GridContainer justify='center' className={classes.buttonContainer}>
          {next}
          <GridItem xs={5}>
            <ButtonMaterial
              variant='outlined'
              size='large'
              className={classes.skipButton}
              onClick={() => {
                this.props.resetTutorial();
                this.props.updateBackground('');
                if (this.props.step === 6) {
                  this.props.startTutorial();
                }
              }}
            >
              {(this.props.step === 6) ? 'Restart Tutorial' : 'Skip Tutorial'}
            </ButtonMaterial>
          </GridItem>
        </GridContainer>
        {this.props.tutorialSteps[this.props.step].textBoxes.map((obj, i) =>
            <Typography
              variant='body1'
              key={obj.text}
              className={classNames(classes.text, 'fadeIn')}
              style={{
                left: obj.textXPos + '%',
                top: obj.textYPos + '%',
                textAlign: obj.justify,
                width: obj.width + 'vw'
              }}
            >
              {obj.text}
            </Typography>
          )
        }
        <div className={classes.leftCover}
          key='leftCover'
          style={{
            right: (100 - this.props.tutorialSteps[this.props.step].left) + '%',
            top: (this.props.tutorialSteps[this.props.step].top - 2) + '%',
            bottom: (this.props.tutorialSteps[this.props.step].bottom - 2) + '%'
          }}
        ></div>
        <div className={classes.leftImageCover}
          style={{
            right: leftImagePos
          }}
          key='leftimageCover'
        >
          <img src={BG} alt='bg' className={classes.leftImage} key='leftimage'/>
        </div>
        <div className={classes.topCover}
          style={{
            bottom: (100.9 - this.props.tutorialSteps[this.props.step].top) + '%'
          }}
        ></div>
        <div className={classes.topImageCover}
          style={{
            bottom: (100.9 - this.props.tutorialSteps[this.props.step].top) + '%'
          }}
        >
          <img src={BG} alt='bg' className={classes.topImage}/>
        </div>
        <div className={classes.rightCover}
          style={{
            left: (100 - this.props.tutorialSteps[this.props.step].right) + '%',
            top: (this.props.tutorialSteps[this.props.step].top - 2) + '%',
            bottom: (this.props.tutorialSteps[this.props.step].bottom - 2) + '%'
          }}
        ></div>
        <div className={classes.rightImageCover}
          style={{
            left: rightImagePos
          }}
        >
          <img src={BG} alt='bg' className={classes.rightImage}/>
        </div>
        <div className={classes.bottomCover}
          style={{
            top: (100.9099 - this.props.tutorialSteps[this.props.step].bottom) + '%'
          }}
        ></div>
        <div className={classes.bottomImageCover}
          style={{
            top: (100.9099 - this.props.tutorialSteps[this.props.step].bottom) + '%'
          }}
        >
          <img src={BG} alt='bg' className={classes.bottomImage}/>
        </div>
      </div>
    );
    const tutorialSplash = (
      <div className={'fadeIn'}>
        <div className={classes.splashCover}></div>
        <img src={BG} alt='bgTwo' className={classes.splashImage} key='splashcover'/>
        <div className={classes.splashText}>
          <Typography variant='h6' className={classes.textSplash}>
            Welcome to the Backyard Builder Tutorial.
          </Typography>
          <Typography variant='h6' className={classes.textSplash}>
             Let's walk through designing your dream landscape together.
          </Typography>
        </div>
        <div className={classes.splashButtonContainer}>
          <ButtonMaterial
            variant='outlined'
            size='large'
            className={classes.startButton}
            onClick={() => {
              this.props.nextTutorialStep();
              if (this.props.backgroundSource !== '') {
                this.props.nextTutorialStep();
              }
            }}
          >
            Start Tutorial
          </ButtonMaterial>
          <Typography
            variant='body2'
            className={classes.skipAllButton}
            onClick={() => this.props.resetTutorial()}
          >
            Skip Tutorial
          </Typography>
        </div>
      </div>
    );
    if (this.props.splash) {
      view = tutorialSplash
    } else {
      view = tutorialView
    }
    return (
      <div className={classes.root}>
        {view}
      </div>
    );
  }
}

const style = {
  buttonContainer: {
    position: 'absolute',
    left: '20vw',
    top: 0,
    right: '20vw',
    margin: 0,
    width: '60vw',
    height: '12vh',
    overflow: 'hidden',
  },
  leftCover: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7,
    left: 0,
    zIndex: 38,
    transition: 'all 1s',
    margin: 0,
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
  leftImageCover: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    bottom: 0,
    transition: 'all 1s',
    zIndex: 37,
  },
  leftImage: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: 0,
    top: 0
  },
  topCover: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    transition: 'all 1s',
    margin: 0,
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
  topImageCover: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    transition: 'all 1s',
    zIndex: 39,
  },
  topImage: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rightCover: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7,
    right: 0,
    zIndex: 38,
    transition: 'all 1s',
    margin: 0,
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
  rightImageCover: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    right: 0,
    bottom: 0,
    transition: 'all 1s',
    zIndex: 37,
  },
  rightImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
  },
  bottomCover: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    transition: 'all 1s',
    margin: 0,
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
  bottomImageCover: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
    left: 0,
    right: 0,
    transition: 'all 1s',
    zIndex: 39,
  },
  bottomImage: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  nextButton: {
    marginTop: '4vh',
    textAlign: 'center',
    zIndex: 41,
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  skipButton: {
    marginTop: '4vh',
    textAlign: 'center',
    zIndex: 41,
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    borderColor: '#fff',
    '&:hover': {
      background: '#fff',
    }
  },
  text: {
    position: 'absolute',
    zIndex: 41,
    color: '#fff',
    height: 'auto',
  },
  splashCover: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 40,
  },
  splashImage: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 39,
  },
  splashText: {
    position: 'absolute',
    textAlign: 'center',
    color: '#fff',
    zIndex: 41,
    width: '44vw',
    top: '34vh',
    left: '28vw',
  },
  textSplash: {
    color: '#fff',
  },
  splashButtonContainer: {
    textAlign: 'center',
    position: 'absolute',
    width: '30vw',
    bottom: '34vh',
    left: '35vw',
    "@media (max-width:767px)": {
      bottom:5
    }
  },
  startButton: {
    textAlign: 'center',
    zIndex: 41,
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#ff0000',
    }
  },
  skipAllButton: {
    marginTop: '4vh',
    textAlign: 'center',
    zIndex: 41,
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    border: 'none',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    position: 'relative',
    '&:hover': {
      color: '#ff0000',
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Tutorial));
