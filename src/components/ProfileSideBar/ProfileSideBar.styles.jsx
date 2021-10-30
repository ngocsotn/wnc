import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {},
  link: {
    marginBottom: theme.spacing(2),
    transition: 'all .5s',

    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 25,
      height: 25,
      marginRight: theme.spacing(1),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  active: {
    color: theme.palette.primary.main,
  },
}));
