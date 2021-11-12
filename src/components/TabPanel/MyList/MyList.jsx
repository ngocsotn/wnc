import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { favoriteSelfPaging } from '../../../slices/favorite.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import useStyles from './MyList.styles';
import RequestLoading from '../../UI/RequestLoading/RequestLoading';
import moment from 'moment';
function MyList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const data = useSelector((state) => state.favorite.data);
  const total_page = useSelector((state) => state.favorite.total_page);
  const loading = useSelector((state) => state.favorite.loading);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        favoriteSelfPaging({
          limit,
          page: page + 1,
          order_type: null,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, dispatch]);
  return (
    <div className={classes.root}>
      <PanelTitle title="Danh sách yêu thích" />
      {loading && data.length === 0 ? (
        <RequestLoading />
      ) : (
        data?.length > 0 &&
        data.map((item, index) => (
          <ProductItemV2
            key={index}
            who="user-save"
            productId={item.product?.product_id}
            seller={item.product?.seller?.name}
            sellerPoint={item.product?.seller?.point}
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
            imgSrc={item.product?.images?.length > 0 && item.product.images[0].url}
            totalBid={item.product?.bid_count}
            dateCreated={item.product?.create_at}
            dateEnd={item.product?.expire_at}
            currentPrice={item.product?.price}
            currentBidder={item.product?.bidder?.name}
            currentBidderPoint={item.product?.bidder?.point}
          />
        ))
      )}
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

export default MyList;
