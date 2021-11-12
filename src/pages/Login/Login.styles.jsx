import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '100px 0',
    position: 'relative',
    zIndex: 1,
    '&::before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  },
  form: {
    width: '27rem',
    maxWidth: 'calc(100% - 20px)',
    margin: '0 auto 0',
    padding: theme.spacing(5, 7),
    borderRadius: 10,
    background: '#fff',
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2),
    },
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: '#333',
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    borderRadius: theme.shape.borderRadius,
    '& .MuiFilledInput-underline:after': {
      display: 'none',
    },
  },

  inputLabel: {
    fontSize: 13,
    '&.Mui-focused': {
      color: '#000',
    },
    '&.Mui-error': {
      color: 'red',
    },
  },
  textHelper: {
    marginTop: theme.spacing(1.5),
    color: '#333',
    '& > a': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },

  errorMessage: {
    fontSize: 11,
    color: 'red',
    fontWeight: 'normal',
  },
  resError: {
    fontSize: 11,
    color: 'red',
    fontWeight: 'normal',
    marginBottom: theme.spacing(1),
  },
}));
