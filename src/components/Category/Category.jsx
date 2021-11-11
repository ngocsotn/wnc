import { Box, Grid, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryGetAll } from '../../slices/category.slice';
import useStyles from './Category.styles';
function Category() {
  const classes = useStyles();
  const [openCategory, setOpenCategory] = useState(false);
  const category = useSelector((state) => state.category.allData);

  const dispatch = useDispatch();

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetAll()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const openCategoryHandler = () => {
    setOpenCategory((prevState) => !prevState);
  };

  useEffect(() => {
    categoryGetAllHandler();
  }, [categoryGetAllHandler]);
  return (
    <div className={classes.root}>
      <Box className={classes.menuIcon} onClick={openCategoryHandler}>
        <Menu style={{ marginRight: 5 }} />
        <Typography>DANH MỤC SẢN PHẨM</Typography>
      </Box>
      <div className={`${classes.father}  ${openCategory ? classes.show : classes.hide}`}>
        <ul>
          {category?.length > 0 &&
            category.map((cat, index) => (
              <li key={index}>
                <Typography variant="subtitle1" className={classes.cateTitle}>
                  {cat.name}
                </Typography>
                <div className={classes.child}>
                  <Grid container spacing={3}>
                    {cat.data?.length > 0 &&
                      cat.data.map((subCat, index) => (
                        <Grid item xs={4} className={classes.cateItem} key={index}>
                          <Link to={`/category/${subCat.sub_category_id}`}>{subCat.name}</Link>
                        </Grid>
                      ))}
                  </Grid>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;
