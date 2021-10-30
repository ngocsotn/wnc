import { Box, Button, Typography } from '@material-ui/core';
import { AccessTime, Delete, Edit, PermIdentityRounded, RemoveRedEye } from '@material-ui/icons';
import React from 'react';
import { getCreatedTime } from '../../utils/getCreatedTime';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './ProductItemV2.styles';
import storeIcon from '../../assets/images/store.svg';
import { Link } from 'react-router-dom';
function ProductItemV2({
  who = 'bidder',
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
          {who === 'bidder' && (
            <Typography variant="h4" color="primary" className={classes.status}>
              {status}
            </Typography>
          )}
        </div>
      )}

      <div className={classes.middle}>
        <img src={imgSrc} alt={title} />
        <div className={classes.info}>
          <Link to="/detail/1" className={classes.xizot}>
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
                Giá hiện tại: <b>{currentPrice}VND</b>
              </Typography>
              <Typography variant="body1">
                Ra giá cao nhất:{' '}
                <b>
                  @{currentBidder} ({currentBidderPoint})
                </b>
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
      <div className={classes.bottom}>
        {who === 'bidder' && (
          <Button variant="contained" color="primary" size="small">
            Đánh giá
          </Button>
        )}

        {who === 'seller' && (
          <>
            <Button variant="contained" color="primary" startIcon={<RemoveRedEye />} size="small">
              Xem kết quả
            </Button>
            <Button variant="contained" color="primary" size="small">
              <Edit />
            </Button>
            <Button variant="outlined" color="secondary" size="small">
              <Delete />
            </Button>
          </>
        )}
        {who === 'user-save' && (
          <>
            <Button variant="outlined" color="secondary" size="small" startIcon={<Delete />}>
              Xóa khỏi danh sách
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductItemV2;
