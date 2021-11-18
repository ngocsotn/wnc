import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: '#ddd',
    padding: theme.spacing(2, 4),
  },
  input: {
    maxWidth: '40rem',
    display: 'block',
  },
	pointArea: {
		padding: theme.spacing(4, 4),
		fontWeight: 700
	}
}));
