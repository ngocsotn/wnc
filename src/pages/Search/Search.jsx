import { Box, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import ProductItem from '../../components/ProductItem/ProductItem';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { searchActions, searchProductByPage } from '../../slices/search.slice';
import useStyles from './Search.styles';
import queryString from 'query-string';
import Section from '../../components/Section/Section';
import { toast } from 'react-toastify';
import RequestLoading from '../../components/UI/RequestLoading/RequestLoading';
function Search(props) {
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

  const [limit, setLimit] = useState(10);
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
  }, [urlQuery, urlType, urlOrderBy, urlOrderType, urlStatus, urlSubCategoryId, dispatch]);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        searchProductByPage({
          sub_category_id: sub_category_id,
          order_by,
          order_type,
          keyword: type === 'name' ? query : '',
          limit,
          page,
          is_self: 0,
          is_expire: '',
          status: status,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }, [limit, page, order_type, order_by, type, query, dispatch, status, sub_category_id]);
  return (
    <Section>
      <SectionTitle title="Xem sản phẩm theo danh mục/Từ khóa" />

      <Typography align="center" style={{ marginBottom: 10 }}>
        Kết quả tìm kiếm cho: <b>{query}</b>
      </Typography>
      <div className={classes.filter_warp}>
        <div className={classes.filter_item}>
          <Typography component="span">Loại:</Typography>
          <select value={sub_category_id} onChange={changeSubCategoryHandler}>
            <option value="">Tất cả</option>
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
          <Typography component="span">Tiêu chí:</Typography>
          <select value={status} onChange={changeStatusHandler}>
            <option value="on">Còn hạn</option>
            <option value="off">Hết hạn</option>
          </select>
        </div>

        <div className={classes.filter_item}>
          <Typography component="span">Sắp theo:</Typography>
          <select value={order_by} onChange={changeOrderByHandler}>
            <option value="expire_at">Thời gian kết thúc</option>
            <option value="price">Giá cả</option>
          </select>
        </div>

        <div className={classes.filter_item}>
          <Typography component="span">Cách sắp:</Typography>
          <select value={order_type} onChange={changeOrderTypeHandler}>
            <option value="ASC">Tăng dần</option>
            <option value="DESC">Giảm dần</option>
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
            Không có sản phẩm tương ứng
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
