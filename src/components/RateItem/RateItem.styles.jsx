import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 2px 8px rgba(0,0,0,.3)',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  productInfo: {
    display: 'flex',

    '& img': {
      width: 150,
      height: 'auto',
      objectFit: 'cover',
      maxHeight: 200,
    },
  },
  rateInfo: {
    width: 350,
    padding: theme.spacing(2),
    borderLeft: '1px solid #ddd',
  },
  info: {
    padding: theme.spacing(2),
  },
  buttonIcon: {
    fontSize: 13,
    padding: 0,
    pointerEvents: 'none',
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  des: {
    borderTop: '1px solid #ddd',
    padding: theme.spacing(2),
  },
}));
