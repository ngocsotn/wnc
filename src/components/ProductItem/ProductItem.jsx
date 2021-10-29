import { IconButton, Typography } from '@material-ui/core';
import { Gavel, PermIdentityRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './ProductItem.styles';
function ProductItem({
  id,
  title,
  categoryName,
  categoryId,
  imgSrc,
  dateCreated,
  timeEnd,
  totalBid,
  currentPrice,
  buyNow,
  currentUser,
  currentUserRate,
}) {
  const classes = useStyles();
  return (
    <Link to={`/detail/${id}`} className={classes.root}>
      <div className={classes.top}>
        <div className={classes.image}>
          <img src={imgSrc} alt={title} />
        </div>
        {categoryName ? (
          <Link to={`/category/${categoryId}`} className={classes.category}>
            {categoryName}
          </Link>
        ) : (
          <></>
        )}
        <div className={classes.total}>
          <PermIdentityRounded />
          <Typography variant="caption" className={classes.max}>
            <b>{totalBid || 0}</b>
          </Typography>
        </div>
        <div className={classes.time}>
          <TimeLeft timeEnd={timeEnd} />
        </div>
      </div>
      <div className={classes.info}>
        <Typography variant="body1" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.created}>
          Ngày đăng: {dateCreated}
        </Typography>
        <Typography variant="body1" className={classes.currentPrice}>
          Giá hiện tại : <b>{currentPrice} VND</b>
        </Typography>
        {buyNow ? (
          <Typography variant="body1" className={classes.buyNow}>
            Mua ngay: <b>{buyNow} VND</b>
          </Typography>
        ) : (
          <></>
        )}

        <div className={classes.actions}>
          {currentUser ? (
            <Typography variant="body1" className={classes.max}>
              Cao nhất:{' '}
              <b>
                @{currentUser} ({currentUserRate})
              </b>
            </Typography>
          ) : (
            <div></div>
          )}
          <div style={{ alignSelf: 'flex-end' }}>
            <IconButton color="primary" className={classes.bid}>
              <Gavel color="primary" />
            </IconButton>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
