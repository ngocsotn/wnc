import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { searchActions } from '../../slices/search.slice';
import useStyles from './HeaderSearch.styles';
function HeaderSearch() {
  const classes = useStyles();
  const history = useHistory();

  const query = useSelector((state) => state.search.query);
  const currentType = useSelector((state) => state.search.type);
  const order_type = useSelector((state) => state.search.order_type);
  const order_by = useSelector((state) => state.search.order_by);
  const sub_category_id = useSelector((state) => state.search.sub_category_id);
  const status = useSelector((state) => state.search.status);
  const searchRef = useRef(query);

  const dispatch = useDispatch();

  const typeChangeHandler = (e) => {
    dispatch(
      searchActions.typeChange({
        type: e.target.value,
      })
    );
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredSearch = searchRef.current?.value;
    if (!enteredSearch.length > 0) {
      return;
    }

    history.push(
      `/search?q=${enteredSearch}&type=${currentType}&order_type=${order_type}&order_by=${order_by}&sub_category_id=${sub_category_id}&status=${status}`
    );
  };

  return (
    <div className={classes.search}>
      <select value={currentType} onChange={typeChangeHandler}>
        <option value="name">Tên sản phẩm</option>
        {/* <option value="category">Danh mục</option> */}
      </select>
      <form action="" onSubmit={formSubmitHandler}>
        <div className={classes.input}>
          <input type="text" placeholder="Tìm kiếm sản phẩm" ref={searchRef} />
        </div>
        <Button size="small" color="primary" variant="contained" type="submit">
          <Search />
        </Button>
      </form>
    </div>
  );
}

export default HeaderSearch;
