import {
  cardTitle,
} from "../../material-kit-pro-react.jsx";
const profilePageStyle = {
  main: {
    textAlign: 'center',
    paddingTop: '50px',
    "@media (max-width: 767px)": {
      paddingTop: '90px',
    }
  },
  pageHeader: {
    color: "#fff",
    border: "0",
    margin: "0",
    display: "flex!important",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    zIndex: -1,
    paddingTop: '35vh',
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
  editCard: {
    textAlign: 'center',
    display: 'inline-block',
    width: '66vw',
    marginLeft: '6vw',
    marginTop: '10vh',
    verticalAlign: 'middle',
  },
  viewCard: {
    textAlign: 'center',
    display: 'inline-block',
    width: '66vw',
    marginLeft: '6vw',
    marginTop: '10vh',
    verticalAlign: 'middle',
  },
  passwordCard: {
    textAlign: 'center',
    display: 'inline-block',
    width: '66vw',
    marginLeft: '6vw',
    marginTop: '24vh',
    verticalAlign: 'middle',
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
  heading: {
    fontSize: '1em',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  gridItem: {
    marginTop: '1vh'
  },
  input: {
    color: '#252525',
    fontWeight: 400,
  },
  inputView: {
    color: '#252525',
    fontWeight: 400,
  },
  inputIconsColor: {
    color: "#252525",
    opacity: 0.7
  },
  showIcon: {
    marginTop: '5vh',
  },
  cardTitle: {
    ...cardTitle,
    fontFamily: 'Montserrat, sans-serif',
    color: '#fff !important',
    fontWeight: 600,
    textAlign: 'center',
    marginLeft: '4vw',
  },
  logoOne: {
    height: '16vh',
    position: 'absolute',
    top: '-7vh',
    left: '38vw',
  },
  logoTwo: {
    height: '16vh',
    position: 'absolute',
    top: '-7vh',
    left: '38vw',
  },
  cardTitle2: {
    ...cardTitle,
    paddingTop: '6px',
    fontFamily: 'Montserrat, sans-serif',
    color: '#fff !important',
    fontWeight: 400,
  },form: {
    margin: "0",
  },
  selectFormControl: {
    color: '#252525',
    textAlign: 'left',
    fontWeight: 400,
    paddingTop: '0.75vh',
  },
  selectFormControlView: {
    color: '#252525',
    textAlign: 'left',
    fontWeight: 400,
    paddingTop: '0.75vh',
  },
  formContainer: {
    marginTop: '3vh',
  },
  buttonEdit: {
    marginTop: '4vh',
    marginBottom: '6vh',
    backgroundColor: '#ff0000',
    color: '#fff',
    width: 'auto',
  },
  buttonReset: {
    marginTop: '4vh',
    marginBottom: '6vh',
    width: 'auto',
  },
  buttonCancel: {
    marginTop: '4vh',
    marginBottom: '6vh',
    width: 'auto',
  },
  buttonCancelEdit: {
    marginTop: '4vh',
    marginBottom: '6vh',
    width: 'auto',
  },
  buttonSaveEdit: {
    marginTop: '4vh',
    marginBottom: '6vh',
    backgroundColor: '#ff0000',
    color: '#fff',
    width: 'auto',
  },
  accountContainer: {
    marginTop: '5vh',
  },
  accountLabel: {
    padding: '1vh',
    textAlign: 'left',
    fontSize: '1.2em',
  },
  accountItem: {
    padding: '1vh',
    textAlign: 'right',
    fontSize: '1.2em',
  },
  accountGrey: {
    backgroundColor: '#f6f6f6',
  },
  passwordContainer: {
    marginTop: '8vh',
    marginBottom: '6vh',
  },
  iconContainer: {
    position: 'absolute',
    top: '4vh',
    right: '7vw',
  },
  infoButton: {
    marginLeft: '2vw',
    background: 'none',
    border: 'none',
    '&:hover': {
      outline: 'none',
    }
  },
  tooltipModal: {
    position: 'absolute',
    left: '18vw',
    top: '36vh',
  },
};

export default profilePageStyle;
