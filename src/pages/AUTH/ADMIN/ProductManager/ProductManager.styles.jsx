import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  actionIcon: {
    cursor: 'pointer',
    transition: 'all .5s',
    margin: theme.spacing(0, 1),
    '&:hover': {
      opacity: 0.6,
    },
  },
}));
