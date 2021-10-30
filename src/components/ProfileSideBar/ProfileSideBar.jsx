import { Typography } from '@material-ui/core';
import React from 'react';
import { Nav, NavLink } from 'react-router-dom';
import userIcon from '../../assets/images/user.png';
import watchListIcon from '../../assets/images/purchase.png';
import auctionIcon from '../../assets/images/diamond.png';
import productIcon from '../../assets/images/product.png';
import notiIcon from '../../assets/images/noti.png';
import passwordIcon from '../../assets/images/shield.svg';
import useStyles from './ProfileSideBar.styles';

function ProfileSideBar() {
  const classes = useStyles();
  return (
    <ul>
      <li>
        <NavLink
          exact
          to="/account/profile"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={userIcon} alt="" />
          Tài khoản của tôi
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/account/password"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={passwordIcon} alt="" />
          Đổi mật khẩu
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/account/product"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={productIcon} alt="" />
          Quản lí sản phẩm
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/account/auction"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={auctionIcon} alt="" />
          Quản lí đấu giá
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/account/mylist"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={watchListIcon} alt="" />
          Danh sách của tôi
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/account/notification"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={notiIcon} alt="" />
          Thông báo
        </NavLink>
      </li>
    </ul>
  );
}

export default ProfileSideBar;
