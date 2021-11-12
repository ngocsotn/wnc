import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { rateSelfPaging } from '../../../slices/rate.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import RateItem from '../../RateItem/RateItem';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
import useStyles from './RatePanel.styles';
function RatePanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const data = useSelector((state) => state.rate.data);
  const total_page = useSelector((state) => state.rate.total_page);
  const loading = useSelector((state) => state.rate.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        rateSelfPaging({
          limit,
          page: page + 1,
          order_by: null,
          oder_type: null,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);
  return (
    <div className={classes.root}>
      <PanelTitle title="Lịch sử đánh giá" />
      <div>
        {loading && data.length === 0 ? (
          <RequestLoading />
        ) : (
          data?.length > 0 &&
          data.map((item, index) => (
            <RateItem
              title="Đồng hồ rolex"
              seller="ngocsotn"
              sellerPoint={2}
              status="done"
              imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
              totalBid="5"
              dateCreated="31/10/2021 4:30:00"
              dateEnd="1/11/2021 12:00:00"
              currentPrice="5000"
              currentBidder="xizot"
              currentBidderPoint={9}
              rateUser="xizot"
              ratePoint="+1"
              rateDate="20/11/2021"
              rateContent="Sản phẩm tốt"
            />
          ))
        )}
      </div>
      {total_page > 1 && (
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

export default RatePanel;
