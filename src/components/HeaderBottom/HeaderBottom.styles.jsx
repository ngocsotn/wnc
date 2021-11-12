import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    justifyContent: 'space-between',
    boxShadow: '0 0px 5px rgba(0 ,0, 0, .3)',
    minHeight: 'auto',
  },
  nav: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& li': {
      display: 'block',
      marginLeft: theme.spacing(2),
      '& a': {
        color: '#fff',
        textDecoration: 'none',
        opacity: 0.7,
      },
    },
  },
  active: {
    opacity: '1 !important',
  },
}));
