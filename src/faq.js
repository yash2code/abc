import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import ButtonMaterial from '@material-ui/core/Button';
import GridContainer from "./components/Grid/GridContainer.jsx";
import GridItem from "./components/Grid/GridItem.jsx";
import Card from "./components/Card/Card.jsx";
import CardBody from "./components/Card/CardBody.jsx";
import CardHeader from "./components/Card/CardHeader.jsx";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { cardTitle } from "./assets/jss/material-kit-pro-react.jsx";
import { updateButtons } from './actions/buttonController';

import leftChevron from './assets/img/chevron-left.svg';
import BG from './assets/img/helpBGFinal.jpg';
import './animate.css';

function mapStateToProps(state) {
  return {
    // for when faq redux is added
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class FAQ extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: 'panel1',
      askQuestion: false,
      name: '',
      email: '',
      question: '',
    }
    this.props.updateButtons({ menu: true });
    if (this.props.match.params.ask === 'true') {
      this.state.askQuestion = true
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }
  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  updateQuestion(event) {
    this.setState({
      question: event.target.value
    });
  }

  render () {
    const { classes } = this.props;
    var card;
    const accordianView = (
      <Card className={classNames(classes.cardOne, 'fadeIn')}>
        <CardHeader signup className={classes.cardHeader}>
          <GridContainer justify='center'>
            <GridItem xs={4}>
              <h4 className={classes.cardTitle}>F.A.Q.</h4>
            </GridItem>
          </GridContainer>
        </CardHeader>
        <div className={classes.accordian}>
          <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#ff0000' }}/>}>
              <Typography className={classes.heading}>Question 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#ff0000' }}/>}>
              <Typography className={classes.heading}>Question 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                diam eros in elit. Pellentesque convallis laoreet laoreet.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#ff0000' }}/>}>
              <Typography className={classes.heading}>Question 3</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#ff0000' }}/>}>
              <Typography className={classes.heading}>Question 4</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={this.state.expanded === 'panel5'} onChange={this.handleChange('panel5')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#ff0000' }}/>}>
              <Typography className={classes.heading}>Question 5</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <ButtonMaterial variant="contained" size='large' className={classes.buttonAsk} onClick={() => this.setState({ askQuestion: true })}>
          Ask a Question
        </ButtonMaterial>
      </Card>
    );

    const questionView = (
      <Card className={classNames(classes.cardTwo, 'fadeInTwo')}>
        <CardHeader signup className={classes.cardHeader}>
          <GridContainer justify='center'>
            <GridItem xs={4}>
              <h4 className={classes.cardTitle}>Ask a Question</h4>
            </GridItem>
          </GridContainer>
        </CardHeader>
        <Fab color='primary' aria-label='Back' className={classes.back} onClick={() => {
          this.setState({ askQuestion: false })
        }}>
          <img src={leftChevron} alt='backArrow' className={classes.backIcon}/>
        </Fab>
        <CardBody className={classes.questionContainer}>
          <GridContainer justify='center' className={classes.formContainer}>
            <GridItem xs={10}>
              <Typography variant='body1'>
                Have a question you'd like to ask one of our designers?
              </Typography>
              <Typography variant='body1'>
                Fill out the form below and we will respond shortly.
              </Typography>
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
              <TextField
                label="* Name"
                id="name"
                className={classes.input}
                value={this.state.name}
                onChange={this.updateName}
                fullWidth={true}
                margin="dense"
              />
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
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
            </GridItem>
            <GridItem xs={10} className={classes.gridItem}>
              <TextField
                label="* Question"
                id="question"
                multiline
                rowsMax="4"
                className={classes.input}
                value={this.state.question}
                onChange={this.updateQuestion}
                fullWidth={true}
                margin="normal"
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <ButtonMaterial variant="contained" size='large' className={classes.buttonAsk} onClick={() => this.setState({ askQuestion: false })}>
          Send
        </ButtonMaterial>
      </Card>
    );

    if (this.state.askQuestion) {
      card = questionView;
    } else {
      card = accordianView;
    }

    return (
      <div className="main">
        <div className={classNames(classes.bg, 'fadeInTwo')}></div>
        {card}
      </div>
    );
  }
}

const styles = {
  main: {
    textAlign: 'center',
  },
  bg: {
    backgroundImage: 'url(' + BG + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    overflow: 'hidden',
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  cardOne: {
    width: '66vw',
    marginLeft: '17vw',
    marginTop: '20vh',
    textAlign: 'center',
    display: 'inline-block',
    zIndex: 2,
    "@media (max-width: 767px)": {
      width: '90%',
      marginLeft: '5%',
    }
  },
  cardTwo: {
    width: '66vw',
    marginLeft: '17vw',
    marginTop: '22vh',
    textAlign: 'center',
    display: 'inline-block',
    zIndex: 2,
  },
  cardHeader: {
    fontFamily: '"Montserrat", sans-serif',
    width: "auto",
    fontWeight: 800,
    fontSize: '1.1em',
    padding: '1vh',
    backgroundColor: '#252525',
    textAlign: "center",
    color: '#fff',
    boxShadow: '2px 4px 8px rgba(0, 0, 0, .5)',
  },
  cardTitle: {
    ...cardTitle,
    fontFamily: 'Montserrat, sans-serif',
    color: '#fff !important',
    fontWeight: 600,
  },
  cardTitle2: {
    ...cardTitle,
    paddingTop: '7px',
    fontFamily: 'Montserrat, sans-serif',
    color: '#fff !important',
    fontWeight: 400,
  },
  accordian: {
    display: 'inline-block',
    textAlign: 'center',
    width: '50vw',
    marginTop: '4vh',
    "@media (max-width:767px)": {
      width: '90%',
    }
  },
  heading: {
    fontSize: '1em',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '1em',
    color: 'secondary',
  },
  questionContainer: {
    width: '86%',
    float: 'right',
  },
  formContainer: {
    marginTop: '10vh',
  },
  back: {
    backgroundColor: '#ff0000',
    color: '#fff',
    position: 'absolute',
    left: '4vw',
    top: '8vh',
    '&:hover': {
      backgroundColor: '#ff0000',
      color: '#fff',
    }
  },
  backIcon: {
    width: '80%',
  },
  buttonAsk: {
    marginTop: '4vh',
    marginBottom: '4vh',
    marginLeft: '1vw',
    backgroundColor: '#ff0000',
    color: '#fff',
    width: 'auto',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  logoOne: {
    height: '16vh',
    position: 'absolute',
    top: '-7vh',
    left: '20vw',
  },
  logoTwo: {
    height: '16vh',
    position: 'absolute',
    top: '-7vh',
    left: '20vw',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FAQ));
