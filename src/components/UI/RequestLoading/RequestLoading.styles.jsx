import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '2em',
    '& span': {
      width: ' 0.3em',
      height: '1em',
      backgroundColor: theme.palette.primary.main,
    },
    '& span:nth-of-type(1)': {
      animation: '$grow 1s -0.45s ease-in-out infinite',
    },

    '& span:nth-of-type(2)': {
      animation: '$grow 1s -0.3s ease-in-out infinite',
    },

    '& span:nth-of-type(3)': {
      animation: '$grow 1s -0.15s ease-in-out infinite',
    },
    '& span:nth-of-type(4)': {
      animation: '$grow 1s ease-in-out infinite',
    },
  },
  '@keyframes grow': {
    '0% , 100%': {
      transform: 'scaleY(1)',
    },
    '50%': {
      transform: 'scaleY(2)',
    },
  },
}));
