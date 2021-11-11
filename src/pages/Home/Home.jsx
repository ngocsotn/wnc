import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Section from '../../components/Section/Section';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { homeSelfPaging } from '../../slices/home.slice';

function Home() {
  const dispatch = useDispatch();

  const bidCount = useSelector((state) => state.home.bid_count);
  const expire = useSelector((state) => state.home.expire);
  const price = useSelector((state) => state.home.price);
  const loading = useSelector((state) => state.home.loading);

  const getListHomeHandler = useCallback(async () => {
    try {
      dispatch(homeSelfPaging()).unwrap();
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getListHomeHandler();
  }, [getListHomeHandler]);
  return (
    <>
      <Section>
        <SectionTitle title="Gần kết thúc" />
        <ProductSlider listProduct={expire} slidesToShow={4} loading={loading} />
      </Section>
      <Section background="#ddd" data-aos="fade-up">
        <SectionTitle title="Sản phẩm nhiều người ra giá" />
        <ProductSlider listProduct={bidCount} slidesToShow={4} loading={loading} />
      </Section>
      <Section data-aos="fade-up">
        <SectionTitle title="Sản phẩm giá cao" />
        <ProductSlider listProduct={price} slidesToShow={4} loading={loading} />
      </Section>
    </>
  );
}

export default Home;
