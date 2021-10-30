import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

function Home() {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Box marginTop={12}>
        <SectionTitle title="Gần kết thúc" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Box>
      <Box marginTop={12}>
        <SectionTitle title="Sản phẩm nhiều người ra giá" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Box>
      <Box marginTop={12}>
        <SectionTitle title="Sản phẩm giá cao" />
        <ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
      </Box>
    </Container>
  );
}

export default Home;
