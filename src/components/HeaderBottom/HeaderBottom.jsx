import { Box, Toolbar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Category from '../Category/Category';
import useStyles from './HeaderBottom.styles';
function HeaderBottom() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Toolbar className={classes.root}>
      <Box display="flex" alignItems="center">
        <Category />
        <ul className={classes.nav}>
          <li>
            <NavLink to="/" exact activeClassName={classes.active}>
              Trang chủ
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/account" activeClassName={classes.active}>
                  Tài khoản của tôi
                </NavLink>
              </li>
              <li>
                <NavLink to="/account/mylist" activeClassName={classes.active}>
                  Xem sau
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </Box>
      <ul className={classes.nav}>
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" activeClassName={classes.active}>
              Đăng nhập
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/logout" activeClassName={classes.active}>
              Đăng xuất
            </NavLink>
          </li>
        )}
      </ul>
    </Toolbar>
  );
}

export default HeaderBottom;
