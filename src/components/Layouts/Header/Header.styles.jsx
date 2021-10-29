import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  headerTop: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  logo: {
    fontWeight: 'bold',
  },
}));
