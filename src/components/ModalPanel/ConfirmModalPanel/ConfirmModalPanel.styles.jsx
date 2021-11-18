import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2, 4),
    maxWidth: '25rem',
    margin: '100px auto 70px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));
