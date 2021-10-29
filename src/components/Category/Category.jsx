import { Box, Grid, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './Category.styles';
function Category() {
  const classes = useStyles();
  const [openCategory, setOpenCategory] = useState(false);
  const openCategoryHandler = () => {
    setOpenCategory((prevState) => !prevState);
  };
  return (
    <div className={classes.root}>
      <Box className={classes.menuIcon} onClick={openCategoryHandler}>
        <Menu style={{ marginRight: 5 }} />
        <Typography>DANH MỤC SẢN PHẨM</Typography>
      </Box>
      <ul className={`${classes.father} ${openCategory ? classes.show : classes.hide}`}>
        <li>
          <Typography variant="subtitle1" className={classes.cateTitle}>
            Đồ điện tử
          </Typography>
          <Grid container className={classes.child}>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
          </Grid>
        </li>
        <li>
          <Typography variant="subtitle1" className={classes.cateTitle}>
            Đồ điện tử
          </Typography>
          <Grid container className={classes.child}>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
          </Grid>
        </li>
        <li>
          <Typography variant="subtitle1" className={classes.cateTitle}>
            Đồ điện tử
          </Typography>
          <Grid container className={classes.child}>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại 1</Link>
            </Grid>
          </Grid>
        </li>
        <li>
          <Typography variant="subtitle1" className={classes.cateTitle}>
            Đồ điện tử
          </Typography>
          <Grid container className={classes.child}>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/21321">Điện thoại 2</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
            <Grid item xs={4} className={classes.cateItem}>
              <Link to="/">Điện thoại</Link>
            </Grid>
          </Grid>
        </li>
      </ul>
    </div>
  );
}

export default Category;
