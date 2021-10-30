import { alpha, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    opacity: 1 + '!important',
    boxShadow: '0px 2px 8px rgba(0,0,0,.4)',
    overflow: 'hidden',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    '& p': {
      wordBreak: 'break-word',
    },
    '&:hover img': {
      transform: 'scale(1.3)',
    },
  },
  image: {
    position: 'relative',
    width: '100%',
    paddingTop: '75%',
    overflow: 'hidden',
    '& img': {
      transition: 'all .5s',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  top: {
    position: 'relative',
  },
  time: {
    zIndex: 2,
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
  },

  category: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    background: theme.palette.primary.main,
    padding: theme.spacing(0.5, 1.25),
    boxShadow: '0px 2px 8px rgba(0,0,0,.4)',

    cursor: 'pointer',
    fontSize: 13,
    color: '#fff',
    zIndex: 1,
    '&:after': {
      content: '""',
      top: 0,
      right: -11,
      borderWidth: 12,
      borderStyle: 'solid',
      borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent `,
      position: 'absolute',
    },
  },
  total: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.secondary.main,
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 2px 8px rgba(0,0,0,.4)',

    display: 'flex',
    alignItems: 'center',
    '& p': {
      lineHeight: 0,
      paddingLeft: 5,
      fontWeight: 'bold',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: theme.spacing(1),
  },
  created: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: theme.spacing(1),
  },
  info: {
    padding: theme.spacing(2),
  },
  max: {
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    '&:hover img': {
      transform: 'scale(1) !important',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bid: {
    background: alpha(theme.palette.primary.main, 0.2),
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
  },
}));
