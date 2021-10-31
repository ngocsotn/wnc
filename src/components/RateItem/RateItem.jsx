import { Box, Typography, Button } from '@material-ui/core';
import { AccessTime, PermIdentityRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreatedTime } from '../../utils/getCreatedTime';
import TimeLeft from '../TimeLeft/TimeLeft';
import useStyles from './RateItem.styles';
function RateItem({
  productId,
  title,
  imgSrc,
  totalBid,
  dateEnd,
  currentPrice,
  currentBidder,
  currentBidderPoint,
  dateCreated,
  rateUser,
  ratePoint,
  rateDate,
  rateContent,
}) {
  const classes = useStyles();
  const [viewDescription, setViewDescription] = useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.productInfo}>
          <img src={imgSrc} alt={title} />
          <div className={classes.info}>
            <Link to={`/detail/${productId}`} className={classes.xizot}>
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
            </Link>
            <Button startIcon={<PermIdentityRounded />} className={classes.buttonIcon}>
              <b>{totalBid || 0}</b>
            </Button>
            <Button startIcon={<AccessTime />} className={classes.buttonIcon}>
              <i>{getCreatedTime(dateCreated)}</i>
            </Button>

            <Box className={classes.state}>
              <Typography variant="body1">
                Giá hiện tại: <b>{currentPrice}VND</b>
              </Typography>
              <Typography variant="body1">
                Ra giá cao nhất:{' '}
                <b>
                  @{currentBidder} ({currentBidderPoint})
                </b>
              </Typography>
              <TimeLeft timeEnd={dateEnd} style={{ marginTop: 10 }} />
            </Box>
          </div>
        </div>
        <div className={classes.rateInfo}>
          <Typography variant="body2" component="p" className={classes.text}>
            Người đánh giá: <b>@{rateUser}</b>
          </Typography>
          <Typography variant="body2" component="p" className={classes.text}>
            Điểm đánh giá:{' '}
            <b style={{ color: Number(ratePoint) > 0 ? 'green' : 'red', fontSize: 18 }}>
              {ratePoint}
            </b>
          </Typography>
          <Button startIcon={<AccessTime />} className={classes.buttonIcon}>
            <i>{getCreatedTime(rateDate)}</i>
          </Button>
          <Box marginTop={2}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => setViewDescription((prev) => !prev)}>
              {!viewDescription ? 'Xem nội dung' : 'Đóng nội dung'}
            </Button>
          </Box>
        </div>
      </div>
      {viewDescription && (
        <div className={classes.des}>
          <Typography variant="body2" component="p" className={classes.title}>
            {rateContent}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default RateItem;
