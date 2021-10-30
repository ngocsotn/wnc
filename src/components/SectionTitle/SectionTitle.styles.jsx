import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '2.125rem',
    fontWeight: 'bolder',
    letterSpacing: 1.1,
  },
  icon: {
    position: 'relative',
    pointerEvents: 'none',
    color: theme.palette.primary.main,
    '&:after': {
      content: "''",
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(100%, -50%)',
      height: 2,
      background: '#cecece',
      width: 200,
      borderRadius: 9999,
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translate(-100%, -50%)',
      height: 2,
      background: '#cecece',
      width: 200,
      borderRadius: 9999,
    },
  },
}));
