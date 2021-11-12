import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from '../../HeaderSearch/HeaderSearch';
import HeaderBottom from '../../HeaderBottom/HeaderBottom';
import useStyles from './Header.styles';

function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar color="inherit" position="relative">
        <Toolbar className={classes.headerTop}>
          <Link to="/">
            <Typography variant="h5" className={classes.logo}>
              <Typography variant="h5" component="span" color="primary">
                Ez
              </Typography>
              Bid
            </Typography>
          </Link>
          <HeaderSearch />
          <div></div>
        </Toolbar>
        <HeaderBottom />
      </AppBar>
    </div>
  );
}

export default Header;
