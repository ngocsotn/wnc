import React from 'react';
import { NavLink } from 'react-router-dom';
import userIcon from '../../assets/images/user.png';
import watchListIcon from '../../assets/images/purchase.png';
import auctionIcon from '../../assets/images/diamond.png';
import productIcon from '../../assets/images/product.png';
import notiIcon from '../../assets/images/noti.png';
import passwordIcon from '../../assets/images/shield.svg';
import heartIcon from '../../assets/images/heart.svg';
import useStyles from './ProfileSideBar.styles';
import { useSelector } from 'react-redux';

function ProfileSideBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
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
          to="/account/mylist"
          className={classes.link}
          activeClassName={classes.active}>
          <img src={heartIcon} alt="" />
          Danh sách yêu thích
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/account/rate" className={classes.link} activeClassName={classes.active}>
          <img src={userIcon} alt="" />
          Lịch sử đánh giá
        </NavLink>
      </li>

      {user?.role === 'bidder' && (
        <li>
          <NavLink
            exact
            to="/account/auction"
            className={classes.link}
            activeClassName={classes.active}>
            <img src={auctionIcon} alt="" />
            Lịch sử đấu giá
          </NavLink>
        </li>
      )}

      {user?.role === 'seller' && (
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
      )}

      {user?.role === 'admin' && (
        <>
          <li>
            <NavLink
              exact
              to="/admin/user-manager"
              className={classes.link}
              activeClassName={classes.active}>
              <img src={userIcon} alt="" />
              Quản lí user
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/admin/product-manager"
              className={classes.link}
              activeClassName={classes.active}>
              <img src={productIcon} alt="" />
              Quản lí sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/admin/category-manager"
              className={classes.link}
              activeClassName={classes.active}>
              <img src={watchListIcon} alt="" />
              Quản lí danh mục
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/admin/subcategory-manager"
              className={classes.link}
              activeClassName={classes.active}>
              <img src={watchListIcon} alt="" />
              Quản lí danh mục con
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/admin/request-promotion"
              className={classes.link}
              activeClassName={classes.active}>
              <img src={notiIcon} alt="" />
              Quản lí yêu cầu lên seller
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default ProfileSideBar;
