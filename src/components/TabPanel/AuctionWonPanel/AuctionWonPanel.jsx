import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAuctionWon } from '../../../slices/auction-won.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
import useStyles from './AuctionWonPanel.styles';

function AuctionWonPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.auctionWon.data);
  const total_page = useSelector((state) => state.auctionWon.total_page);
  const count = useSelector((state) => state.auctionWon.count);
  const loading = useSelector((state) => state.auctionWon.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        getAuctionWon({
          limit,
          page: page,
          oder_type: '',
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);

  return (
    <div className={classes.root}>
      <PanelTitle title="Danh sách đấu giá thắng" />
      {loading ? (
        <RequestLoading />
      ) : (
        data?.length > 0 &&
        data.map((item, index) => (
          <ProductItemV2
            key={index}
            who="bidder"
            productId={item.product?.product_id}
            seller={item.product?.seller?.name}
            sellerPoint={item.product?.seller?.point}
            title={item.product?.name}
            status="done"
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
            sellerId={item.product?.seller_id}
            isRate={item.is_rate}
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

export default AuctionWonPanel;
