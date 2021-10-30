import { Box, IconButton, Typography } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React from 'react';
import Slider from 'react-slick';
import ProductItem from '../ProductItem/ProductItem';
import useStyles from './ProductSlider.styles';

function NextArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      className={`${classes.arrow} ${classes.arrowNext}`}>
      <ArrowForwardIos className={classes.iconArrow} />
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
      className={`${classes.arrow} ${classes.arrowPrev}`}>
      <ArrowBackIos className={classes.iconArrow} style={{ transform: 'translateX(3px)' }} />
    </IconButton>
  );
}

function ProductSlider({ listProduct, slidesToShow, settings }) {
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
      <Slider {...newSettings} className={classes.slider}>
        {listProduct &&
          listProduct.map((movie, index) => (
            <div className={classes.productItem}>
              <ProductItem
                title="Đồng hồ Rolex"
                imgSrc="https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546"
                id={1}
                categoryName="Đồng hồ"
                categoryId={1}
                dateCreated="01/12/2021 12:00:00"
                timeEnd="01/11/2021 23:01:00"
                totalBid={10}
                currentPrice={12000000}
              />
            </div>
          ))}
      </Slider>
    </Box>
  );
}

export default ProductSlider;
