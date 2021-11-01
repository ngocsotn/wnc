import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useStyles from './Search.styles';

function Search() {
  const keyword = '';
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrap}></div>
      <div className={classes.filter_warp}>
        <div className={classes.filter_item}>
          <Typography variant="p">Sắp theo:</Typography>
          <select>
            <option value={10}>Tăng dần</option>
            <option value={20}>Giảm dần</option>
          </select>
        </div>
        <div className={classes.filter_item}>
          <Typography variant="p">Tiêu chí:</Typography>
          <select>
            <option value={10}>Thời gian kết thúc</option>
            <option value={20}>Giá cả</option>
          </select>
        </div>
      </div>
      <SectionTitle title="Xem sản phẩm theo danh mục/Từ khóa" />
      <div className={classes.result}>
        <Grid container spacing={5}>
          {[...Array(20)].map((x, i) => (
            <Grid item xs={4} md={3}>
              <ProductItem
                ket={i}
                productId={i}
                title="Đồng hồ Rolex"
                imgSrc="https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/r/o/rolex-cosmograph-daytona-chronograph-automatic-rainbow-pave-watch-116595rbow0002.jpg?width=546&height=546"
                categoryName="Đồng hồ"
                categoryId={1}
                dateCreated="01/12/2021 12:00:00"
                dateEnd="01/11/2021 23:01:00"
                totalBid={10}
                currentPrice={12000000}
                currentUser="xizot"
                currentUserRate={99}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.pagination}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </div>
    </>
  );
}

export default Search;
