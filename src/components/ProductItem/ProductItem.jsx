import { Box, IconButton, Typography } from '@material-ui/core';
import { AccessTime, Add, Gavel, PermIdentityRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCreatedTime } from '../../utils/getCreatedTime';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './ProductItem.styles';
function ProductItem({
  productId,
  title,
  categoryName,
  categoryId,
  seller,
  sellerPoint,
  status,
  imgSrc,
  totalBid,
  dateCreated,
  dateEnd,
  currentPrice,
  currentBidder,
  currentBidderPoint,
  buyNow,
}) {
  const classes = useStyles();
  return (
    <Link to={`/detail/${productId}`} className={classes.root}>
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
        <div className={classes.hoverTop}>
          <IconButton className={classes.addToWashList}>
            <Add />
            <Typography variant="caption" component="p">
              Add To Watch List
            </Typography>
          </IconButton>
        </div>
        <div className={classes.time}>
          <TimeLeft timeEnd={dateEnd} />
        </div>
      </div>
      <div className={classes.info}>
        <Typography variant="body1" className={classes.title} color="primary">
          {title}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="body2" className={classes.created}>
            <AccessTime fontSize="small" style={{ marginRight: 5 }} /> {getCreatedTime(dateCreated)}
          </Typography>
          <div className={classes.total}>
            <PermIdentityRounded />
            <Typography variant="caption" className={classes.max}>
              <b>{totalBid || 0}</b>
            </Typography>
          </div>
        </Box>
        <Typography variant="subtitle2" className={classes.currentPrice}>
          Giá hiện tại : <b>{currentPrice} VND</b>
        </Typography>

        {buyNow ? (
          <Typography variant="subtitle2" className={classes.buyNow}>
            Mua ngay: <b>{buyNow} VND</b>
          </Typography>
        ) : (
          <></>
        )}

        <div className={classes.actions}>
          {currentBidder ? (
            <Typography variant="subtitle2" className={classes.max}>
              Cao nhất:{' '}
              <b>
                @{currentBidder} ({currentBidderPoint})
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