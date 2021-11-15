import { Box, Button, Typography } from '@material-ui/core';
import { AccessTime, Delete, Edit, PermIdentityRounded, RemoveRedEye } from '@material-ui/icons';
import React from 'react';
import { getCreatedTime } from '../../utils/getCreatedTime';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './ProductItemV2.styles';
import storeIcon from '../../assets/images/store.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../slices/ui.slice';
import { formatMoney } from '../../utils/formatMoney';
import { toast } from 'react-toastify';
import { favoriteDelete } from '../../slices/favorite.slice';

function ProductItemV2({
  who = 'bidder',
  productId,
  title,
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
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const openModalEditHandler = () => {
    dispatch(uiActions.openModal('openUpdate'));
  };
  const openModalRateHandler = () => {
    dispatch(uiActions.openModal('openUpdate'));
  };

  const deleteFromFavoriteHandler = async (product_id) => {
		try {
      await dispatch(
        favoriteDelete({
          product_id: productId
        })
      ).unwrap();
      toast.success('Xóa khỏi yêu thích thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={classes.root}>
      {who !== 'seller' && (
        <div className={classes.top}>
          <Box display="flex" alignItems="center">
            <img src={storeIcon} alt="store" style={{ marginRight: 5 }} />
            <Typography variant="caption">
              <b>
                @{seller} ({sellerPoint})
              </b>
            </Typography>
          </Box>
          <Typography variant="h4" className={classes.status}>
            {status === 'done'
              ? 'Thành công'
              : status === 'failed'
              ? 'Thất bại'
              : status === 'denied'
              ? 'Bị từ chối'
              : status === 'expired'
              ? 'Đã kết thúc'
              : 'Đang diễn ra'}
          </Typography>
        </div>
      )}

      <div className={classes.middle}>
        <img src={imgSrc || process.env.REACT_APP_BASE_IMAGE} alt={title} />
        <div className={classes.info}>
          <Link to={`/detail/${productId}`} className={classes.xizot}>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            <div className={classes.total}>
              <PermIdentityRounded />
              <Typography variant="caption" className={classes.max}>
                <b>{totalBid || 0}</b>
              </Typography>
            </div>
          </Link>
          <Typography variant="body2" className={classes.created}>
            <AccessTime fontSize="small" style={{ marginRight: 5 }} /> {getCreatedTime(dateCreated)}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <div>
              <TimeLeft timeEnd={dateEnd} />
            </div>
            <Box textAlign="right" className={classes.state}>
              <Typography variant="body1">
                Giá hiện tại: <b>{formatMoney(currentPrice)}đ</b>
              </Typography>
              {currentBidder && (
                <Typography variant="body1">
                  Ra giá cao nhất:{' '}
                  <b>
                    @{currentBidder} ({currentBidderPoint})
                  </b>
                </Typography>
              )}
            </Box>
          </Box>
        </div>
      </div>
      <div className={classes.bottom}>
        {who === 'bidder' && status === 'done' && (
          <div className={classes.bottomContent}>
            <Button variant="contained" color="primary" size="small" onClick={openModalRateHandler}>
              Đánh giá
            </Button>
          </div>
        )}

        {who === 'seller' && (
          <div className={classes.bottomContent}>
            <Button variant="contained" color="primary" startIcon={<RemoveRedEye />} size="small">
              Xem kết quả
            </Button>
            <Button variant="contained" size="small" onClick={openModalEditHandler}>
              <Edit />
            </Button>
          </div>
        )}
        {who === 'user-save' && (
          <div className={classes.bottomContent}>
            <Button
              onClick={() => deleteFromFavoriteHandler(productId)}
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<Delete />}>
              Xóa khỏi danh sách
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItemV2;
