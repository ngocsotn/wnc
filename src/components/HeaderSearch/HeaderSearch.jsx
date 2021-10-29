import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import useStyles from './HeaderSearch.styles';
function HeaderSearch() {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <select>
        <option value={10}>Danh mục</option>
        <option value={20}>Tên sản phẩm</option>
      </select>
      <form action="">
        <div className={classes.input}>
          <input type="text" placeholder="Tìm kiếm sản phẩm" />
        </div>
        <Button size="small" color="primary" variant="contained">
          <Search />
        </Button>
      </form>
    </div>
  );
}

export default HeaderSearch;
