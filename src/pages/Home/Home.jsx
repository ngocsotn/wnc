import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Section from '../../components/Section/Section';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

function Home() {
  return (
    <>
      <Section>
        <SectionTitle title="Gần kết thúc" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Section>
      <Section background="#ddd" data-aos="fade-up">
        <SectionTitle title="Sản phẩm nhiều người ra giá" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Section>
      <Section data-aos="fade-up">
        <SectionTitle title="Sản phẩm giá cao" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Section>
    </>
  );
}

export default Home;
