import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { bidSelfHistory } from '../../../slices/bid.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
import useStyles from './AutionPanel.styles';
function AuctionPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.bid.data);
  const total_page = useSelector((state) => state.bid.total_page);
  const count = useSelector((state) => state.bid.count);
  const loading = useSelector((state) => state.bid.loading);
  const user = useSelector((state) => state.auth.user);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        bidSelfHistory({
          limit,
          page: page,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);
  return (
    <div className={classes.root}>
      <PanelTitle title="Lịch sử đấu giá" />
      {loading ? (
        <RequestLoading />
      ) : (
        data?.length > 0 &&
        data.map((item, index) => (
          <ProductItemV2
            key={index}
            // who="user-save"
            productId={item.product?.product_id}
            seller={item.product?.seller?.name}
            title={item.product?.name}
            status={
              parseInt(
                moment
                  .duration(moment(item.product?.expire_at, 'DD/MM/YYYY HH:mm:ss').diff(moment()))
                  .asSeconds()
              ) > 0
                ? 'continue'
                : 'expired'
            }
            imgSrc={
              item.product?.images?.length > 0
                ? item.product.images[0].url
                : process.env.REACT_APP_BASE_IMAGE
            }
            totalBid={item.product?.bid_count}
            dateCreated={item.product?.create_at}
            dateEnd={item.product?.expire_at}
            currentPrice={item.product?.price}
            currentBidder={item.product?.bidder?.name}
            currentBidderPoint={item.product?.bidder?.point}
            primary={+user?.id === +item.product?.bidder?.id}
          />
        ))
      )}
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

export default AuctionPanel;
