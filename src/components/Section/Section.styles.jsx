import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7, 0, 5),
    background: (props) => (props.background ? props.background : '#fff'),
  },
}));
