import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sellerGetProductGetByPage } from '../../../slices/seller.slice';
import { tradeSelSellerPaging } from '../../../slices/trade.slice';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
// import useStyles from './ProductProcessingPanel.styles';

function ProductHasBidderPanel() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.trade.data);
  const total_page = useSelector((state) => state.trade.total_page);
  const count = useSelector((state) => state.trade.count);
  const loading = useSelector((state) => state.trade.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        tradeSelSellerPaging({
          page,
          limit,
          status: '',
          order_type: 'DESC',
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);

  return (
    <div>
      {loading ? (
        <RequestLoading />
      ) : (
        (data?.length > 0 &&
          data.map((item, index) => (
            <ProductItemV2
              productId={item.product?.product_id}
              key={index}
              who="seller"
              seller={item.product?.seller?.name}
              sellerPoint={item.product?.seller?.point}
              title={item.product?.name}
              status="Đang đấu giá"
              imgSrc={item.product?.images?.length > 0 && item.product?.images[0]?.url}
              totalBid={item.product?.bid_count}
              dateCreated={item.product?.create_at}
              dateEnd={item.product?.expire_at}
              currentPrice={item.product?.hidden_price}
              currentBidder={item.product?.bidder?.name}
              currentBidderPoint={item.product?.bidder?.point}
              sell_status="hasBidder"
            />
          ))) || <Typography>Không có sản phẩm nào</Typography>
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

export default ProductHasBidderPanel;
