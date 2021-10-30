import { alpha, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '&  .slick-slider': {
      overflow: 'hidden',
    },

    '&  .slick-list': {
      margin: '0 -16px',
    },
  },
  slider: {
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-100%)',
    zIndex: 10,
    background: alpha('#000', 0.5),

    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.5),
    },
  },
  iconArrow: {
    color: 'white',
    textAlign: 'center',
  },
  arrowNext: {
    right: theme.spacing(2),
  },
  arrowPrev: {
    left: theme.spacing(2),
  },
  productItem: {
    padding: '15px 16px',
  },
}));
