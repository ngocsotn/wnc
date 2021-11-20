import { Box, IconButton, Typography } from '@material-ui/core';
import { AccessTime, Add, Gavel, PermIdentityRounded } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreatedTime } from '../../utils/getCreatedTime';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './ProductItem.styles';
import { formatMoney } from '../../utils/formatMoney';
import { useDispatch } from 'react-redux';
import { favoriteCheck, favoriteCreateNew } from '../../slices/favorite.slice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

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
  buyPrice,
  showFavorite = false,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentType = useSelector((state) => state.search.type);
  const order_type = useSelector((state) => state.search.order_type);
  const order_by = useSelector((state) => state.search.order_by);
  const status_search = useSelector((state) => state.search.status);

  const addToFavoriteHandler = async () => {
    if (!isAuthenticated) {
      history.push({
        pathname: '/login',
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    try {
      await dispatch(
        favoriteCreateNew({
          product_id: +productId,
        })
      ).unwrap();
      toast.success('Thêm vào danh sách yêu thích thành công');
      setAddedFavorite(true);
    } catch (error) {
      toast.error(error);
      setAddedFavorite(false);
    }
  };

  const [addedFavorite, setAddedFavorite] = useState(false);
  const hasInMyListHandler = useCallback(
    async ({ productId }) => {
      try {
        const response = await dispatch(
          favoriteCheck({
            product_id: +productId,
          })
        ).unwrap();
        if (response?.id) {
          setAddedFavorite(true);
        }
      } catch (error) {
        setAddedFavorite(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (showFavorite && isAuthenticated) {
      hasInMyListHandler({ productId });
    }
  }, [showFavorite, productId, isAuthenticated, hasInMyListHandler]);

  return (
    <div className={classes.root}>
      {!addedFavorite && showFavorite && (
        <div className={classes.hoverTop}>
          <IconButton className={classes.addToWashList} onClick={addToFavoriteHandler}>
            <Add />
            <Typography variant="caption" component="p">
              Thêm ưu thích
            </Typography>
          </IconButton>
        </div>
      )}

      {categoryName ? (
        <Link
          to={`/search?q=""&type=${currentType}&order_type=${order_type}&order_by=${order_by}&sub_category_id=${categoryId}&status=${status_search}`}
          className={classes.category}>
          {categoryName}
        </Link>
      ) : (
        <></>
      )}

      <Link to={`/detail/${productId}`}>
        <div className={classes.top}>
          <div className={classes.image}>
            <img src={imgSrc} alt={title} />
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
              <AccessTime fontSize="small" style={{ marginRight: 5 }} />{' '}
              {getCreatedTime(dateCreated)}
            </Typography>
            <div className={classes.total}>
              <PermIdentityRounded />
              <Typography variant="caption" className={classes.max}>
                <b>{totalBid || 0}</b>
              </Typography>
            </div>
          </Box>
          <Typography variant="subtitle2" className={classes.currentPrice}>
            Giá hiện tại : <b>{formatMoney(currentPrice)}đ</b>
          </Typography>

          {buyPrice ? (
            <Typography variant="subtitle2" className={classes.buyPrice}>
              Mua ngay: <b>{formatMoney(buyPrice)}đ</b>
            </Typography>
          ) : (
            <></>
          )}

          <div className={classes.actions}>
            <Typography variant="subtitle2" className={classes.max}>
              Cao nhất:{' '}
              <b>{currentBidder ? `@${currentBidder} (${currentBidderPoint})` : 'Chưa có'}</b>
            </Typography>
            <div style={{ alignSelf: 'flex-end' }}>
              <IconButton color="primary" className={classes.bid}>
                <Gavel color="primary" />
              </IconButton>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
