import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  actionHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonAdd: {
    color: '#3f51b5',
    borderColor: '#3f51b5',
  },
  categoryTitle: {
    padding: theme.spacing(0, 0, 0, 5),
  },
  selectCategory: {
    margin: theme.spacing(0, 0, 0, 1),
  },
  selectWrap: {
    justifycontent: 'space-around',
  },
  topWrapOptions: {
    display: 'flex',
    justifyContent: 'left',
    paddingTop: theme.spacing(5),
  },
  actionIcon: {
    cursor: 'pointer',
    transition: 'all .5s',
    margin: theme.spacing(0, 1),
    '&:hover': {
      opacity: 0.6,
    },
  },
}));
