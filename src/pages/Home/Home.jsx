import { Container, Grid } from '@material-ui/core';
import React from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';

function Home() {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
          <ProductItem
            title="Đồng hồ Rolex"
            imgSrc="https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546"
            id={1}
            categoryName="Đồng hồ"
            categoryId={1}
            dateCreated="05/12/2021 15:00:00"
            timeEnd="03/11/2021 23:01:00"
            totalBid={10}
            currentPrice={12000000}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
