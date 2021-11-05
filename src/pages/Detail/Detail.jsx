import { Box, Button, Container, IconButton, TextField, Typography } from '@material-ui/core';
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
import { productGetById } from '../../slices/product.slice';
import { toast } from 'react-toastify';

function Detail({}) {
  const { id } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(useParams());
  const description = ':';
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [listImage, setListImage] = useState([
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
    'https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546',
  ]);
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
      infinite: listImage?.length > 5,
      speed: 500,
      arrows: false,
      slidesToShow: 5,
    }),
    [listImage]
  );

  const getProductByIdHandler = useCallback(async (id) => {
    try {
      const response = await dispatch(productGetById(id)).unwrap();
      console.log(response);
    } catch (error) {
      toast(error);
    }
  }, []);
  useEffect(() => {
    getProductByIdHandler(id);
  }, [id, getProductByIdHandler]);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <Section>
        <div className={classes.top}>
          <div className={classes.productImage}>
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              {...settings1}
              className={classes.thumbnail}>
              {listImage?.length > 0 &&
                listImage.map((item, index) => (
                  <div key={index} className={classes.sliderMainImage}>
                    <img src={item} alt="" />
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
              {listImage?.length > 0 &&
                listImage.map((item, index) => (
                  <div key={index} className={classes.sliderImage}>
                    <img src={item} alt="" />
                  </div>
                ))}
            </Slider>
          </div>
          <TimeLeft timeEnd="20/12/2021" />
        </div>
      </Section>

      <Section background="#ddd" data-aos="fade-up">
        <Box className={classes.detailTop}>
          <div>
            <Typography variant="h4" className={classes.title}>
              Đồng hồ Rolex
            </Typography>
            <Typography variant="subtitle2" className={classes.seller}>
              Người bán: <b>Nguyễn Văn Nhật (99)</b>
            </Typography>
            <div className={classes.created}>
              <AccessTime fontSize="small" />
              <Typography variant="subtitle2">{getCreatedTime('30/10/2021 23:00:00')}</Typography>
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

        <Typography variant="h6">
          Ra giá cao nhất: <b>@xizot (99)</b>
        </Typography>
        <Typography variant="h6">Giá hiện tại: 1000000VND</Typography>
        <div className={classes.buyNow}>
          <Typography variant="h6">Giá mua ngay: 1000000VND</Typography>
          <Button variant="contained" color="primary" className={classes.btnBuy}>
            Mua ngay
          </Button>
        </div>

        <div className={classes.description}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </Section>

      <Section data-aos="fade-up">
        <SectionTitle title="Sản phẩm cùng chuyên mục" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={3} />
      </Section>
    </div>
  );
}

export default Detail;
