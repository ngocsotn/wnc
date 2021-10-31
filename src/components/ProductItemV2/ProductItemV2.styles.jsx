import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: '#fff',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    marginBottom: theme.spacing(1),
    borderBottom: '1px solid #737373',
  },
  status: {
    fontSize: 14,
    fontWeight: 6000,
  },
  middle: {
    display: 'flex',
    padding: theme.spacing(2, 0, 0),

    '& img': {
      width: 150,
      height: 'auto',
      maxHeight: '100%',
      marginRight: theme.spacing(2),
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: '#333',
    maxWidth: 'calc(100% - 70px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  created: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    fontStyle: 'italic',

    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  state: {
    '& b': {
      color: theme.palette.primary.main,
    },
  },
  bottom: {
    textAlign: 'right',
    '& button': {
      marginLeft: theme.spacing(1),
    },
  },
  bottomContent: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: '1px solid #ddd',
  },
  xizot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  total: {
    color: theme.palette.primary.main,
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    '& p': {
      lineHeight: 0,
      paddingLeft: 5,
      fontWeight: 'bold',
    },
  },
}));
