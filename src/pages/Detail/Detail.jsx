import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccessTime, Add, Block, Gavel } from '@material-ui/icons';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import CustomArrowNext from '../../components/CustomArrowNext/CustomArrowNext';
import CustomArrowPrev from '../../components/CustomArrowPrev/CustomArrowPrev';
import useStyles from './Detail.styles';
import TimeLeft from '../../components/TimeLeft/TimeLeft';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Section from '../../components/Section/Section';
import { getCreatedTime } from '../../utils/getCreatedTime';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { productGetById, productGetByPage } from '../../slices/product.slice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import RequestLoading from '../../components/UI/RequestLoading/RequestLoading';
import { useInput } from '../../hooks/use-input';
import { number } from '../../schemas/common.schema';
import { bidHistoryPaging, bidBlockUser } from '../../slices/bid.slice';
import { favoriteCheck, favoriteCreateNew } from '../../slices/favorite.slice';
import { formatMoney } from '../../utils/formatMoney';
import socketIOClient from 'socket.io-client';
import { uiActions } from '../../slices/ui.slice';
import { Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const getLoading = useSelector((state) => state.product.getLoading);
  const loading = useSelector((state) => state.product.loading);
  const bidRequesting = useSelector((state) => state.bid.bidRequesting);
  const [listSuggest, setListSuggest] = useState([]);
  const [addedFavorite, setAddedFavorite] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const count = useSelector((state) => state.bid.count);
  const data = useSelector((state) => state.bid.data);

  const [seller, setSeller] = useState(null);

  const settings1 = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <CustomArrowNext />,
      prevArrow: <CustomArrowPrev />,
    }),
    []
  );
  const settings2 = useMemo(
    () => ({
      dots: false,
      infinite: productDetail.images?.length > 5,
      speed: 500,
      arrows: false,
      slidesToShow: 5,
    }),
    [productDetail]
  );

  const {
    enteredInput: price,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    isTouched: priceIsTouched,
  } = useInput(number, productDetail.hidden_price + productDetail.step_price || 2000);

  const csPriceIsValid = +price >= productDetail.hidden_price + productDetail.step_price;
  const csPriceHasError = priceIsTouched && !csPriceIsValid;

  const getProductByIdHandler = useCallback(
    async (id) => {
      try {
        const response = await dispatch(productGetById({ id })).unwrap();
        setProductDetail(response);
        setSeller(response.seller_id);
      } catch (error) {
        toast(error);
      }
    },
    [dispatch]
  );

  const openConfirmModal = async () => {
    dispatch(
      uiActions.setConfirm({
        type: 'bid',
        product_id: +id,
        price: +price,
      })
    );

    dispatch(uiActions.openModal('openConfirm'));
  };
  const openBuyPriceConfirmModal = async () => {
    dispatch(
      uiActions.setConfirm({
        type: 'buy',
        product_id: +id,
      })
    );

    dispatch(uiActions.openModal('openConfirm'));
  };

  const blockBidderHandler = async (bidder) => {
    try {
      await dispatch(
        bidBlockUser({
          product_id: +id,
          user_id: bidder.user_id,
        })
      ).unwrap();
      toast.success('Đã từ chối ra giá của người dùng ' + bidder.name);
    } catch (error) {
      toast.error(error);
    }
  };

  const addToFavoriteHandler = async (id) => {
    try {
      await dispatch(
        favoriteCreateNew({
          product_id: +id,
        })
      ).unwrap();
      setAddedFavorite(true);

      toast.success('Thêm vào danh sách yêu thích thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  const checkFavoriteHandler = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          favoriteCheck({
            product_id: +id,
          })
        ).unwrap();
        if (response?.user_id) {
          setAddedFavorite(true);
        }
      } catch (error) {}
    },
    [dispatch]
  );

  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BASE_URL);
    socket.on('broadcast-channel', (data) => {
      // chỉ fetch lại api khi và chỉ khi đang xem sản phẩm là sản phẩm vừa có update
      if (+data === +id) {
        // console.log(data);
        getProductByIdHandler(id);
        try {
          dispatch(
            bidHistoryPaging({
              page: page + 1,
              limit,
              product_id: +id,
            })
          ).unwrap();
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      }
    });
  }, [id, getProductByIdHandler, limit, page, dispatch]);

  useEffect(() => {
    try {
      dispatch(
        bidHistoryPaging({
          page: page + 1,
          limit,
          product_id: +id,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }, [limit, page, dispatch, id]);

  useEffect(() => {
    const getSuggestionHandler = async () => {
      try {
        const response = await dispatch(
          productGetByPage({
            sub_category_id: +productDetail.sub_category_id,
            limit: 5,
            page: 1,
            order_by: '',
            order_type: '',
            keyword: '',
            is_self: 0,
            is_expire: 0, // chưa hết hạn
            status: 'on', // còn mở
          })
        ).unwrap();
        setListSuggest(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSuggestionHandler();
  }, [productDetail, dispatch]);

  useEffect(() => {
    getProductByIdHandler(id);
    if (isAuthenticated) {
      checkFavoriteHandler(id);
    }
  }, [id, getProductByIdHandler, checkFavoriteHandler, isAuthenticated]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      {bidRequesting && (
        <RequestLoading
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,.3)',
          }}
        />
      )}

      {getLoading && !productDetail.product_id ? (
        <RequestLoading />
      ) : (
        <>
          <Section>
            <div className={classes.top}>
              <div className={classes.productImage}>
                <Slider
                  asNavFor={nav2}
                  ref={(slider1) => setNav1(slider1)}
                  {...settings1}
                  className={classes.thumbnail}>
                  {productDetail.images?.length > 0 &&
                    productDetail.images.map((image, index) => (
                      <div key={index} className={classes.sliderMainImage}>
                        <img src={image.url} alt="" />
                      </div>
                    ))}
                </Slider>
                <Slider
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  {...settings2}
                  className={`${classes.slider} ${classes.sliderControl}`}>
                  {productDetail.images?.length > 0 &&
                    productDetail.images.map((image, index) => (
                      <div key={index} className={classes.sliderImage}>
                        <img src={image.url} alt="" />
                      </div>
                    ))}
                </Slider>
              </div>
              <TimeLeft timeEnd={productDetail.expire_at} />
              <Box marginTop={4}>
                {data?.length > 0 ? (
                  <>
                    <Typography variant="h5" align="center">
                      Danh sách người đã đấu giá
                    </Typography>
                    <Box boxShadow={6} marginTop={2}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.tableHead}>
                              <TableCell style={{ fontWeight: 'bold' }}>STT</TableCell>
                              <TableCell> Tên người đấu giá </TableCell>
                              <TableCell> Đã đấu giá (đ) </TableCell>
                              <TableCell> Ngày đấu giá </TableCell>
                              <TableCell> Trạng thái</TableCell>
                              <TableCell> Điểm đánh giá</TableCell>
                              {seller === user.id && <TableCell> Tùy chọn </TableCell>}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{page * limit + index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{formatMoney(item.price)}đ</TableCell>
                                <TableCell>{item.bid_at}</TableCell>
                                <TableCell
                                  className={
                                    item.status === 'accepted' ? classes.accept : classes.block
                                  }>
                                  {item.status}
                                </TableCell>
                                <TableCell>
                                  <Link to={`/rate/${item.user_id}`} style={{ color: '#3f51b5' }}>
                                    ({item.like - item.dislike || 0} ,
                                    {parseInt((item.like / (item.dislike + item.like)) * 100) || 0}%
                                    )
                                  </Link>
                                </TableCell>

                                <TableCell>
                                  {seller === user.id && item.status === 'accepted' && (
                                    <IconButton onClick={() => blockBidderHandler(item)}>
                                      <Block color="secondary" />
                                    </IconButton>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 50, 100]}
                                count={count}
                                rowsPerPage={limit}
                                page={page}
                                onPageChange={pageChangeHandler}
                                onRowsPerPageChange={rowsPerPageChangeHandler}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </Box>
                  </>
                ) : (
                  <Box
                    maxWidth="40rem"
                    margin="0 auto"
                    textAlign="center"
                    padding={2}
                    borderRadius={3}
                    boxShadow={3}>
                    <Typography color="primary" variant="caption">
                      Hiện tại chưa có ai đấu giá sản phẩm này
                    </Typography>
                  </Box>
                )}
              </Box>
            </div>
          </Section>

          <Section background="#ddd" data-aos="fade-up">
            <Box className={classes.detailTop}>
              <div>
                <Typography variant="h4" className={classes.title}>
                  {productDetail.name}
                </Typography>
                <Typography variant="subtitle2" className={classes.seller}>
                  Người bán:{' '}
                  <b>
                    {productDetail.seller?.name} ({productDetail.seller?.point})
                  </b>
                </Typography>
                <div className={classes.created}>
                  <AccessTime fontSize="small" />
                  <Typography variant="subtitle2">
                    {getCreatedTime(productDetail.create_at)}
                  </Typography>
                </div>
                {!addedFavorite && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addToWatchList}
                    startIcon={<Add />}
                    onClick={() => addToFavoriteHandler(id)}>
                    Yêu thích
                  </Button>
                )}
              </div>
              <div>
                <Typography variant="h6" style={{ marginBottom: 10 }}>
                  Ra giá tối thiểu:{' '}
                  {formatMoney(productDetail.hidden_price + productDetail.step_price)}đ
                </Typography>
                <div className={classes.bid}>
                  <TextField
                    required
                    type="number"
                    id="money"
                    label="Tiền đấu giá"
                    onChange={priceChangeHandler}
                    onBlur={priceBlurHandler}
                    value={price}
                    error={csPriceHasError}
                  />
                  <IconButton color="primary" onClick={openConfirmModal} disabled={!csPriceIsValid}>
                    <Gavel />
                  </IconButton>
                </div>
              </div>
            </Box>
            {productDetail.bidder?.name && (
              <Typography variant="h6">
                Ra giá cao nhất:{' '}
                <b>
                  {productDetail.bidder?.name}
                  <Link to={`/rate/${productDetail.bidder?.id}`} style={{ color: '#3f51b5' }}>
                    ({productDetail.bidder?.point_like - productDetail.bidder?.point_dislike || 0} ,
                    {parseInt(
                      (productDetail.bidder?.point_like /
                        (productDetail.bidder?.point_dislike + productDetail.bidder?.point_like)) *
                        100
                    ) || 0}
                    % )
                  </Link>
                </b>
              </Typography>
            )}

            <Typography variant="h6">
              Giá hiện tại: {formatMoney(productDetail.hidden_price)}đ
            </Typography>
            <Typography variant="h6">Bước giá: {formatMoney(productDetail.step_price)}đ</Typography>

            {productDetail.buy_price !== 0 && productDetail.hidden_price < productDetail.buy_price && (
              <div className={classes.buyNow}>
                <Typography variant="h6">
                  Giá mua ngay: {formatMoney(productDetail.buy_price)}đ
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnBuy}
                  onClick={openBuyPriceConfirmModal}>
                  Mua ngay
                </Button>
              </div>
            )}
            <Typography variant="h5" className={classes.detailTitle}>
              Mô tả sản phẩm
            </Typography>
            <div className={classes.description}>
              <div dangerouslySetInnerHTML={{ __html: productDetail.detail }} />
            </div>
          </Section>
        </>
      )}

      <Section data-aos="fade-up">
        <SectionTitle title="Sản phẩm cùng chuyên mục" />
        <ProductSlider listProduct={listSuggest} slidesToShow={3} loading={loading} />
      </Section>
    </div>
  );
}

export default Detail;
