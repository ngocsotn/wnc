import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2, 4),
    margin: '100px auto 70px',
    maxWidth: '90%',
  },
  input: {},
  description: {
    margin: theme.spacing(2, 0),
    '& .ql-editor': {
      height: 300,
    },
  },
}));
