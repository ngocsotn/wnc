import { makeStyles } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  sliderCustomArrowPrev: {
    cursor: 'pointer',
    position: 'absolute',
    top: '45%',
    left: 0,
    zIndex: 10,
  },

  sliderCustomArrowNext: {
    cursor: 'pointer',
    position: 'absolute',
    top: '45%',
    right: 0,
    zIndex: 10,
  },
}));

const CustomArrowPrev = (props) => {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <div className={classes.sliderCustomArrowPrev} onClick={onClick}>
      <ArrowBackIos />
    </div>
  );
};

export default CustomArrowPrev;
