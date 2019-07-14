import {
  container,
  description,
  cardTitle
} from "../../material-kit-pro-react.jsx";

const signupPageStyle = theme => ({
  description,
  container: {
    ...container,
    zIndex: "4",
   // position: 'absolute',
    top: '0',
    fontFamily: 'Montserrat, sans-serif',
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "10px"
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
    paddingTop: '30px',
    "&:before": {
      background: "rgba(0, 0, 0, 0.4)"
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
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    backgroundColor: '#252525',
    textAlign: "center",
    boxShadow: '2px 4px 8px rgba(0, 0, 0, .5)',
  },
  cardTitle: {
    ...cardTitle,
    fontFamily: 'Montserrat, sans-serif',
    color: '#fff !important',
    fontWeight: 600,
    textAlign: 'center',
  },
  logo: {
    position: 'absolute',
    top: '-8vh',
    left: '18vw',
    height: '16vh',
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  input: {
    opacity: '1 !important',
  },
  inputIconsColor: {
    color: "#495057"
  },
  textCenter: {
    fontFamily: 'Montserrat, sans-serif',
    textAlign: "center"
  },
  iconButtons: {
    marginRight: "3px !important",
    marginLeft: "3px !important"
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block",
    "&,& *,& *:hover,& *:focus": {
      color: "#FFFFFF !important"
    }
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
    "&,& *,& *:hover,& *:focus": {
      color: "#FFFFFF !important"
    }
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  buttonLogin: {
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#fff',
    backgroundColor: '#ff0000',
    border: 'none',
    fontSize: '1em',
    marginBottom: '2vh',
    marginTop: '7vh',
    '&:hover': {
      background: '#ff0000',
      color: '#ffffff',
    }
  },
  buttonCancel: {
    fontFamily: 'Montserrat, sans-serif !important',
    color: '#000',
    backgroundColor: '#ffffff',
    border: '1px solid',
    fontSize: '1em',
    marginBottom: '2vh',
    marginLeft: '3vh',
    marginTop: '7vh',
    '&:hover': {
      background: '#E8E8E8',
      color: '#000',
    }
  },
  button: {
    fontFamily: 'Montserrat, sans-serif',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    paddingLeft: '1vw',
    marginBottom: '2vh',
    marginTop: '2vh',
    width: '100%',
    background: 'none',
    border: 'none',
    '&:hover': {
      outline: 'none',
    }
  },
  last: {
    marginBottom: '5vh',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    width: '100%',
    background: 'none',
    border: 'none',
    fontFamily: 'Montserrat',
  },
  footer: {
    position: "absolute",
    width: "100%",
    background: "transparent",
    bottom: "0",
    color: "#fff",
    zIndex: "2"
  },
  gridItem: {
    marginTop: '2vh'
  }
});

export default signupPageStyle;
