import { Box, Button, IconButton, TextField, Typography } from '@material-ui/core';
import { AccessTime, Add, Gavel } from '@material-ui/icons';
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

function Detail() {
  const { id } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const getLoading = useSelector((state) => state.product.getLoading);
  const loading = useSelector((state) => state.product.loading);
  const [listSuggest, setListSuggest] = useState([]);

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

  const getProductByIdHandler = useCallback(
    async (id) => {
      try {
        const response = await dispatch(productGetById({ id })).unwrap();
        setProductDetail(response);
      } catch (error) {
        toast(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getProductByIdHandler(id);
  }, [id, getProductByIdHandler]);

  useEffect(() => {
    const getSuggestionHandler = async () => {
      try {
        const response = await dispatch(
          productGetByPage({
            sub_category_id: +productDetail.sub_category_id,
            limit: 5,
            page: 1,
            order_by: null,
            order_type: null,
            keyword: null,
          })
        ).unwrap();
        console.log(response);
        setListSuggest(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSuggestionHandler();
  }, [productDetail, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {getLoading ? (
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
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addToWatchList}
                  startIcon={<Add />}>
                  Add to watch list
                </Button>
              </div>
              <div className={classes.bid}>
                <TextField required id="money" label="Tiền đấu giá" defaultValue={10} />
                <IconButton color="primary">
                  <Gavel />
                </IconButton>
              </div>
            </Box>
            {productDetail.bidder?.name && (
              <Typography variant="h6">
                Ra giá cao nhất:{' '}
                <b>
                  {productDetail.bidder?.name} ({productDetail.bidder?.point})
                </b>
              </Typography>
            )}

            <Typography variant="h6">Giá hiện tại: {productDetail.price}đ</Typography>
            {productDetail.buy_price !== 0 && (
              <div className={classes.buyNow}>
                <Typography variant="h6">Giá mua ngay: {productDetail.buy_price}đ</Typography>
                <Button variant="contained" color="primary" className={classes.btnBuy}>
                  Mua ngay
                </Button>
              </div>
            )}

            <div className={classes.description}>
              <div dangerouslySetInnerHTML={{ __html: productDetail.detail }} />
            </div>
          </Section>
        </>
      )}

      {listSuggest.length > 0 && (
        <Section data-aos="fade-up">
          <SectionTitle title="Sản phẩm cùng chuyên mục" />
          <ProductSlider listProduct={listSuggest} slidesToShow={3} loading={loading} />
        </Section>
      )}
    </div>
  );
}

export default Detail;
