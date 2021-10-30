import { Box, Button, Container, IconButton, TextField, Typography } from '@material-ui/core';
import { Gavel } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import Slider from 'react-slick';
import CustomArrowNext from '../../components/CustomArrowNext/CustomArrowNext';
import CustomArrowPrev from '../../components/CustomArrowPrev/CustomArrowPrev';
import useStyles from './Detail.styles';
import TimeLeft from '../../components/TimeLeft/TimeLeft';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Section from '../../components/Section/Section';

function Detail() {
  const classes = useStyles();
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
            <Typography variant="subtitle2" className={classes.created}>
              Ngày đăng: 20/11/2021 00:00:00
            </Typography>
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, labore quam impedit
          reiciendis illum doloremque facere incidunt. Iure ab possimus officiis doloribus. Maxime
          accusantium impedit soluta assumenda. Nemo dolores iusto facere commodi corrupti doloribus
          hic, aut voluptatem, culpa provident reprehenderit, temporibus veniam cumque vitae.
          Tempora quis nostrum non quae inventore, ut tempore distinctio dolores totam error.
          Voluptate cupiditate eos quaerat inventore provident ad quisquam soluta molestias deserunt
          ut fuga excepturi tempora iste, recusandae nulla, voluptatem quae ipsam libero vel natus,
          impedit asperiores repudiandae animi nam? Sunt ducimus, dolorum, explicabo ratione quasi
          minus illo quisquam voluptatem atque, debitis beatae! Ut repellat eveniet beatae
          exercitationem, placeat sit autem vitae delectus. Aut quidem alias, exercitationem quo
          magni aliquam repudiandae ducimus consequatur laboriosam doloribus quaerat esse fugiat
          totam voluptas ex, quibusdam vero facilis. Dolorem exercitationem
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
