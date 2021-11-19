import { Box, Toolbar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Category from '../Category/Category';
import useStyles from './HeaderBottom.styles';
function HeaderBottom() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

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
                <NavLink to="/account/profile" activeClassName={classes.active}>
                  Chức năng
                </NavLink>
              </li>
              <li>
                <NavLink to="/account/mylist" activeClassName={classes.active}>
                  Danh sách yêu thích
                </NavLink>
              </li>
              {user?.role === 'bidder' && (
                <li>
                  <NavLink to="/request" activeClassName={classes.active}>
                    Nâng cấp tài khoản
                  </NavLink>
                </li>
              )}
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
