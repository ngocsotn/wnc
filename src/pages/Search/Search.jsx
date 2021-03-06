import { Box, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ProductItem from '../../components/ProductItem/ProductItem';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { searchActions, searchProductByPage } from '../../slices/search.slice';
import useStyles from './Search.styles';
import Section from '../../components/Section/Section';
import RequestLoading from '../../components/UI/RequestLoading/RequestLoading';
import { uiActions } from '../../slices/ui.slice';
function Search(props) {
  const limit = 10;
  const classes = useStyles();
  const history = useHistory();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const urlQuery = params.get('q');
  const urlType = params.get('type');
  const urlOrderBy = params.get('order_by');
  const urlOrderType = params.get('order_type');
  const urlSubCategoryId = params.get('sub_category_id');
  const urlStatus = params.get('status');

  const listCategory = useSelector((state) => state.category.allData);

  const query = useSelector((state) => state.search.query);
  const type = useSelector((state) => state.search.type);
  const order_type = useSelector((state) => state.search.order_type);
  const order_by = useSelector((state) => state.search.order_by);
  const sub_category_id = useSelector((state) => state.search.sub_category_id);
  const status = useSelector((state) => state.search.status);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.search.data);
  const total_page = useSelector((state) => state.search.total_page);
  const count = useSelector((state) => state.search.count);
  const loading = useSelector((state) => state.search.loading);

  const changeSubCategoryHandler = (e) => {
    history.push(
      `/search?q=${query}&type=${type}&order_type=${order_type}&order_by=${order_by}&sub_category_id=${e.target.value}&status=${status}`
    );
  };
  const changeStatusHandler = (e) => {
    history.push(
      `/search?q=${query}&type=${type}&order_type=${order_type}&order_by=${order_by}&sub_category_id=${sub_category_id}&status=${e.target.value}`
    );
  };

  const changeOrderTypeHandler = (e) => {
    history.push(
      `/search?q=${query}&type=${type}&order_type=${e.target.value}&order_by=${order_by}&sub_category_id=${sub_category_id}&status=${status}`
    );
  };

  const changeOrderByHandler = (e) => {
    console.log(e.target.value);
    history.push(
      `/search?q=${query}&type=${type}&order_type=${order_type}&order_by=${e.target.value}&sub_category_id=${sub_category_id}&status=${status}`
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchActions.setQuery({
        query: urlQuery,
        type: urlType,
        order_by: urlOrderBy,
        order_type: urlOrderType,
        sub_category_id: urlSubCategoryId,
        status: urlStatus,
      })
    );

    dispatch(
      searchProductByPage({
        sub_category_id: urlSubCategoryId,
        order_by: urlOrderBy,
        order_type: urlOrderType,
        keyword: urlType === 'name' ? urlQuery : '',
        limit,
        page,
        is_self: 0,
        is_expire: '""',
        status: urlStatus,
      })
    ).unwrap();
  }, [
    urlQuery,
    urlType,
    urlOrderBy,
    urlOrderType,
    urlStatus,
    urlSubCategoryId,
    dispatch,
    page,
    limit,
  ]);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(uiActions.setCategoryModal(false));
  }, [dispatch, urlSubCategoryId]);
  return (
    <Section>
      <SectionTitle title="Xem s???n ph???m theo danh m???c/T??? kh??a" />

      {query !== '""' && query !== "''" && (
        <Typography align="center" style={{ marginBottom: 10 }}>
          K???t qu??? t??m ki???m cho: <b>{query}</b>
        </Typography>
      )}

      <div className={classes.filter_warp}>
        <div className={classes.filter_item}>
          <Typography component="span">Lo???i:</Typography>
          <select value={sub_category_id} onChange={changeSubCategoryHandler}>
            <option value="">T???t c???</option>
            {listCategory?.length > 0 &&
              listCategory.map((cat, index) => (
                <optgroup label={cat.name} key={cat.category_id}>
                  {cat?.data?.length > 0 &&
                    cat.data.map((subCat, index) => (
                      <option value={subCat.sub_category_id} key={subCat.sub_category_id}>
                        {subCat.name}
                      </option>
                    ))}
                </optgroup>
              ))}
          </select>
        </div>

        <div className={classes.filter_item}>
          <Typography component="span">Ti??u ch??:</Typography>
          <select value={status} onChange={changeStatusHandler}>
            <option value="on">C??n h???n</option>
            <option value="off">H???t h???n</option>
          </select>
        </div>

        <div className={classes.filter_item}>
          <Typography component="span">S???p theo:</Typography>
          <select value={order_by} onChange={changeOrderByHandler}>
            <option value="expire_at">Th???i gian k???t th??c</option>
            <option value="hidden_price">Gi?? c???</option>
          </select>
        </div>

        <div className={classes.filter_item}>
          <Typography component="span">C??ch s???p:</Typography>
          <select value={order_type} onChange={changeOrderTypeHandler}>
            <option value="ASC">T??ng d???n</option>
            <option value="DESC">Gi???m d???n</option>
          </select>
        </div>
      </div>
      {loading ? (
        <RequestLoading />
      ) : data.length > 0 ? (
        <Grid container spacing={3}>
          {data.map((product, index) => (
            <Grid item xs={4} md={3} key={index}>
              <ProductItem
                productId={product.product_id}
                title={product.name}
                imgSrc={
                  (product.images?.length > 0 && product.images[0].url) ||
                  process.env.REACT_APP_BASE_IMAGE
                }
                categoryName={product.sub_category?.name}
                categoryId={product.sub_category?.sub_category_id}
                dateCreated={product.create_at}
                dateEnd={product.expire_at}
                totalBid={product.bid_count}
                currentPrice={product.hidden_price}
                currentBidder={product.bidder?.name || null}
                currentBidderPoint={product.bidder?.point || 0}
                buyPrice={product.buy_price}
                showFavorite={true}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          maxWidth="40rem"
          margin="0 auto"
          textAlign="center"
          padding={2}
          borderRadius={3}
          boxShadow={3}>
          <Typography color="primary" variant="caption">
            Kh??ng c?? s???n ph???m t????ng ???ng
          </Typography>
        </Box>
      )}
      <div className={classes.pagination}>
        {count > 0 && (
          <Pagination
            count={total_page}
            variant="outlined"
            color="primary"
            shape="rounded"
            onChange={pageChangeHandler}
          />
        )}
      </div>
    </Section>
  );
}

export default Search;
