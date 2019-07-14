import {
  container
} from "../../material-kit-pro-react.jsx";

const signupPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    position: 'relative',
    top: '40px',
    fontFamily: 'Montserrat, sans-serif',
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "10px"
    }
  },
  pageHeader: {
    backgroundSize: "cover",
    backgroundPosition: "top center",
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
    // paddingTop: '35vh',
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
  }
});

export default signupPageStyle;
