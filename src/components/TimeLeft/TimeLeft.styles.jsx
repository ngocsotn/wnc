import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
    color: '#606060',
    width: '100%',
    padding: theme.spacing(1, 2),
    background: '#fff',
    maxWidth: 500,
    margin: '0 auto',
  },
  section: {
    textAlign: 'center',
    margin: theme.spacing(0, 1),
  },
  num: { fontWeight: 'bold', fontSize: 18 },
  label: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1.1,
  },
  relative: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
