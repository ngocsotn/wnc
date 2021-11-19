import { Box, Grid, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryGetAll } from '../../slices/category.slice';
import { uiActions } from '../../slices/ui.slice';
import useStyles from './Category.styles';
function Category() {
  const classes = useStyles();
  const category = useSelector((state) => state.category.allData);
  const currentType = useSelector((state) => state.search.type);
  const order_type = useSelector((state) => state.search.order_type);
  const order_by = useSelector((state) => state.search.order_by);
  const status = useSelector((state) => state.search.status);
  const dispatch = useDispatch();

  const openCategory = useSelector((state) => state.ui.openCategory);

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetAll()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const openCategoryHandler = () => {
    dispatch(uiActions.setCategoryModal(!openCategory));
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
                          <Link
                            to={`/search?q=""&type=${currentType}&order_type=${order_type}&order_by=${order_by}&sub_category_id=${subCat.sub_category_id}&status=${status}`}>
                            {subCat.name}
                          </Link>
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
