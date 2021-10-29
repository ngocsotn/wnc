import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  show: {
    maxHeight: 'calc(100vh - 250px)',
    opacity: 1,
    pointerEvents: 'all',
  },
  hide: {
    maxHeight: '0',
    opacity: 0,
    pointerEvents: 'none',
  },
  menuIcon: {
    display: 'flex',
    flexWrap: 'no-wrap',
    cursor: 'pointer',
    color: '#333',
    background: '#fff',
    padding: theme.spacing(2, 3),
    '& p': { fontWeight: 'bold' },
  },
  father: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
    background: '#fff',
    boxShadow: '-1px 0px 5px rgb(0 0 0 / 30%)',
    transition: 'all .3s',
    zIndex: 9999,

    '& > li': {
      padding: theme.spacing(1.5, 4),
      display: 'block',
      minWidth: 275,
      cursor: 'pointer',
      '&:hover > $child': {
        opacity: 1,
        pointerEvents: 'all',
      },
      '&:not(:last-child)': {
        borderBottom: '1px solid #ddd',
      },
    },
  },
  child: {
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity .5s',
    minWidth: 600,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translateX(100%)',
    background: '#fff',
    zIndex: 9999,
    boxShadow: '13px 8px 36px rgb(0 0 0 / 7%)',
    padding: theme.spacing(2),
    maxHeight: 'calc(100vh - 250px)',
    minHeight: 400,
    overflow: 'auto',
  },
  cateItem: {
    textDecoration: 'none',
    padding: theme.spacing(0.5, 2),
    '& a': {
      textDecoration: 'none',
      color: '#333',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));
