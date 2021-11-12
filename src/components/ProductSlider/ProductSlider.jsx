import { Box, IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React from 'react';
import Slider from 'react-slick';
import ProductItem from '../ProductItem/ProductItem';
import RequestLoading from '../UI/RequestLoading/RequestLoading';
import useStyles from './ProductSlider.styles';

function NextArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      className={`${classes.arrow} ${classes.arrowNext}`}
      size="medium">
      <ArrowForwardIos className={classes.iconArrow} style={{ fontSize: 12 }} />
    </IconButton>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      className={`${classes.arrow} ${classes.arrowPrev}`}
      size="medium">
      <ArrowBackIos
        className={classes.iconArrow}
        style={{ transform: 'translateX(3px)', fontSize: 12 }}
      />
    </IconButton>
  );
}

function ProductSlider({ listProduct, slidesToShow, loading, settings }) {
  const classes = useStyles();

  const newSettings = {
    dots: false,
    infinite: listProduct.length >= slidesToShow ? true : false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: listProduct.length >= 2 ? true : false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: listProduct.length >= 1 ? true : false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: listProduct.length >= 1 ? true : false,
        },
      },
    ],
  };
  return (
    <Box className={classes.root}>
      {loading && listProduct.length === 0 ? (
        <RequestLoading />
      ) : (
        <Slider {...newSettings} className={classes.slider}>
          {listProduct &&
            listProduct.map((product, index) => (
              <div className={classes.productItem} key={index}>
                <ProductItem
                  productId={product.product_id}
                  title={product.name}
                  imgSrc={(product.images?.length > 0 && product.images[0].url) || ''}
                  categoryName={product.sub_category?.name}
                  categoryId={product.sub_category?.sub_category_id}
                  dateCreated={product.create_at}
                  dateEnd={product.expire_at}
                  totalBid={product.bid_count}
                  currentPrice={product.price}
                  currentBidder={product.bidder?.name || null}
                  currentBidderPoint={product.bidder?.point || 0}
                  buyPrice={product.buy_price}
                />
              </div>
            ))}
        </Slider>
      )}
    </Box>
  );
}

export default ProductSlider;
