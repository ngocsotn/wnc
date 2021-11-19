import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2, 4),
    maxWidth: '40rem',
    margin: '100px auto 70px',
  },
  input: {},
  description: {
    margin: theme.spacing(2, 0),
    '& .ql-editor': {
      height: 300,
    },
  },
}));
