import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSpec } from '../../actions/modalController';
import { updateButtons } from '../../actions/buttonController';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Fab from '@material-ui/core/Fab';
import leftChevron from '../../assets/img/chevron-left.svg'
// todo create a method for converting actual canvas data to spec chart
function mapStateToProps(state) {
  console.log(state.drawerReducer);
  return {
    spec: state.modalReducer.spec,
    show: state.drawerReducer.show
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSpec: spec => dispatch(updateSpec(spec)),
    updateButtons: data => dispatch(updateButtons(data))
  };
}

class SpecificationModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      alternatingColor: ['#fff', '#f6f6f6'],
    }
    this.props.updateButtons({ menu: false });
  }
  render () {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.root, 'fadeIn')}>
        <GridContainer justify='center' className={classes.headerContainer}>
          <GridItem xs={11}>
            <GridContainer justify='flex-start'>
              <GridItem xs={6}>
                <Typography variant="body1" className={classes.header}>
                  Name
                </Typography>
              </GridItem>
              <GridItem xs={3} className={classes.sciHeader}>
                <Typography variant="body1" className={classes.header}>
                  Scientific
                </Typography>
              </GridItem>
              <GridItem xs={2} className={classes.quantityHeader}>
                <Typography variant="body1" className={classes.headerQuantity}>
                  Qty.
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer justify='center' className={classes.lineItemContainer}>
          {console.log(this.props.show)}
          {this.props.show.map((obj, i) =>
            <GridItem
              xs={11}
              key={i}
              className={classes.lineItem}
              style={{ backgroundColor: this.state.alternatingColor[i % this.state.alternatingColor.length] }}
            >
              <GridContainer justify='flex-start' className={classes.lineItem}>
                <GridItem xs={6}>
                  <Typography variant="body2" className={classes.item}>
                    {obj.name}
                  </Typography>
                </GridItem>
                <GridItem xs={3}>
                  <Typography variant="body2" className={classes.itemSci}>
                    {obj.botnical_name}
                  </Typography>
                </GridItem>
                <GridItem xs={2}>
                  <Typography variant="body2" className={classes.itemQuantity}>
                    1
                  </Typography>
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
        </GridContainer>
        <Fab
          color='primary'
          aria-label='Back'
          className={classes.fab}
          onClick={() => {
            this.props.updateButtons({ menu: true })
            this.props.updateSpec(false)
          }}
        >
          <img
            src={leftChevron}
            alt='back arrow'
            className={classes.back}
          />
        </Fab>
      </div>
    );
  }
}

const style = {
  root: {
    zIndex: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '33vw',
    height: '100vh',
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#ff0000',
    margin: 0
  },
  header: {
    marginTop: '3vh',
    marginBottom: '2vh',
    fontWeight: 600,
    maxHeight: '14vh',
    color: '#fff',
    textAlign: 'left',
  },
  headerQuantity: {
    marginTop: '3vh',
    marginBottom: '2vh',
    fontWeight: 600,
    maxHeight: '14vh',
    color: '#fff',
    textAlign: 'center',
  },
  lineItemContainer: {
    margin: 0,
    width: '100%',
    marginTop: '5vh',
    maxHeight: '72vh',
    overflowY: 'scroll',
  },
  lineItem: {
    maxHeight: '12vh',
    overflow: 'hidden',
  },
  quantityHeader: {
    paddingLeft: '3.8vw',
  },
  sciHeader: {
    transform: 'translateX(-0.4vw)',
  },
  item: {
    maxHeight: '12vh',
    paddingTop: '1.8vh',
    paddingBottom: '1vh',
    paddingLeft: '0.5vw',
    textAlign: 'left',
    fontSize: '0.6em',
  },
  itemSci: {
    maxHeight: '12vh',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    transform: 'translateX(-0.1vw)',
    textAlign: 'left',
    fontSize: '0.5em',
  },
  itemQuantity: {
    maxHeight: '12vh',
    paddingTop: '1.8vh',
    paddingBottom: '1vh',
    fontSize: '0.7em',
    transform: 'translateX(2.5vw)',
  },
  fab: {
    marginTop: '4vh',
    color: '#fff',
    backgroundColor: '#ff0000',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#ff0000',
    }
  },
  back: {
    width: '80%',
    height: '80%',
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(SpecificationModal));
