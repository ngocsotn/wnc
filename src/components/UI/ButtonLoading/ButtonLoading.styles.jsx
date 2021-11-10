import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    '&.Mui-disabled': {
      background: '#ddd',
      cursort: 'not-allowed',
    },
  },
  buttonLoading: {
    opacity: ' 0.7 !important',
    minHeight: 42,
    minWidth: 150,
  },
}));
