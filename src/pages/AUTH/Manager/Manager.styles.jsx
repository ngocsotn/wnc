import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: '20vh',
  },
  mainContent: {
    display: 'flex',
  },
  panel: {
    flex: 1,
    marginLeft: theme.spacing(5),
    background: '#ddd',
    minHeight: 400,

    border: '1px solid #ddd',
  },
}));
