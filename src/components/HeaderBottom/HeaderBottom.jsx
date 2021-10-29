import { Box, Toolbar, Tooltip } from '@material-ui/core';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Category from '../Category/Category';
import useStyles from './HeaderBottom.styles';
function HeaderBottom() {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <Box display="flex" alignItems="center">
        <Category />
        <ul className={classes.nav}>
          <li>
            <NavLink to="/" exact activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName={classes.active}>
              About
            </NavLink>
          </li>
        </ul>
      </Box>
      <ul className={classes.nav}>
        <li>
          <NavLink to="/login" activeClassName={classes.active}>
            Sign In
          </NavLink>
        </li>
      </ul>
    </Toolbar>
  );
}

export default HeaderBottom;
