import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  input: {
    display: 'block',
    width: 'calc(100% - 40px)',
    padding: theme.spacing(0, 1),
  },
  search: {
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #dddd',
    borderRadius: 9999999,
    overflow: 'hidden',
    height: 40,
    width: 600,
    '& select, & input, & button': {
      height: 40,
      outline: 'none',
      border: 'none',
    },
    '& select': {
      borderRight: '1px solid #ddd',
      minWidth: 150,
      padding: theme.spacing(0, 2),
    },
    '& form': {
      flex: 1,
      position: 'relative',
      display: 'block',
    },
    '& input': {
      width: '100%',
    },
    '& button': {
      width: 40,
      height: 40,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
      padding: 0,
      borderRadius: '50%',
      minWidth: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& span': {
        lineHeight: 0,
      },
    },
  },
}));
