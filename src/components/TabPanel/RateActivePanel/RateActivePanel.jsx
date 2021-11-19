import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { rateSelfActivePaging } from '../../../slices/rate-active.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import RateItem from '../../RateItem/RateItem';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
import useStyles from './RateActivePanel.styles';
function RateActivePanel() {
  const limit = 10;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const data = useSelector((state) => state.rateAction.data);
  const count = useSelector((state) => state.rateAction.count);
  const total_page = useSelector((state) => state.rateAction.total_page);
  const loading = useSelector((state) => state.rateAction.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        rateSelfActivePaging({
          limit,
          page: page + 1,
          oder_type: null,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);
  return (
    <div className={classes.root}>
      <PanelTitle title="Lịch sử đánh giá người khác" />
      <div>
        {loading && data.length === 0 ? (
          <RequestLoading />
        ) : (
          data?.length > 0 &&
          data.map((item, index) => (
            <RateItem
              title={item.product.name}
              seller={item.product.seller.name}
              sellerPoint={item.product.seller.point}
              status={item.product.status === 'off' ? 'done' : 'no'} //on hoặc off
              imgSrc={
                item.product.images.length > 0
                  ? item.product.images[0].url
                  : process.env.REACT_APP_BASE_IMAGE
              }
              totalBid={item.product.bid_count}
              dateCreated={item.product.create_at}
              dateEnd={item.product.expire_at}
              currentPrice={item.product.hidden_price}
              currentBidder={item.product.bidder.name}
              currentBidderPoint={item.product.bidder.point}
              rateUser={item.user_1.name}
              ratePoint={item.point === 1 ? '+1' : '-1'}
              rateDate={item.create_at}
              rateContent={item.comment}
            />
          ))
        )}
      </div>
      {count > 0 && (
        <Pagination
          count={total_page}
          variant="outlined"
          color="primary"
          onChange={pageChangeHandler}
        />
      )}
    </div>
  );
}

export default RateActivePanel;
