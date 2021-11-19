import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sellerGetProductGetByPage } from '../../../slices/seller.slice';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
// import useStyles from './ProductProcessingPanel.styles';

function ProductExpiredPanel() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 10;
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.seller.data);
  const total_page = useSelector((state) => state.seller.total_page);
  const count = useSelector((state) => state.seller.count);
  const loading = useSelector((state) => state.seller.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        sellerGetProductGetByPage({
          limit,
          page: page,
          order_by: 'expire_at',
          order_type: 'DESC',
          is_self: 1,
          is_expire: '',
          status: 'off',
          sub_category_id: '',
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
              key={index}
              who="seller"
              seller={item.seller?.name}
              sellerPoint={item.seller?.point}
              title={item.name}
              status="Đang đấu giá"
              imgSrc={item.images?.length > 0 && item.images[0]?.url}
              totalBid={item.bid_count}
              dateCreated={item.create_at}
              dateEnd={item.expire_at}
              currentPrice={item.hidden_price}
              currentBidder={item.bidder?.name}
              currentBidderPoint={item.bidder?.point}
              sell_status="end"
              productId={item.product_id}
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

export default ProductExpiredPanel;
