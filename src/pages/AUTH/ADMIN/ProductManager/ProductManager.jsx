import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './ProductManager.styles';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Delete } from '@material-ui/icons';
import { productGetByPage } from '../../../../slices/product.slice';
import { categoryGetAll } from '../../../../slices/category.slice';
import { uiActions } from '../../../../slices/ui.slice';
import RequestLoading from '../../../../components/UI/RequestLoading/RequestLoading';
import { formatMoney } from '../../../../utils/formatMoney';

function ProductManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.allData);
  const loading = useSelector((state) => state.product.loading);
  const count = useSelector((state) => state.product.count);
  const data = useSelector((state) => state.product.data);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      dispatch(
        productGetByPage({
          sub_category_id: +category,
          limit,
          page: page + 1,
          order_by: 'create_at',
          order_type: 'ASC',
          keyword: '',
          is_self: 0, //lấy toàn bộ, không lấy của bản thân
          is_expire: '', // toàn bộ tình trạng hết hạn hay ko
          status: '', // lấy hết các sp đóng lẫn mở
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }, [limit, page, category, dispatch]);

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetAll()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const openModalDeleteHandler = (id) => {
    dispatch(
      uiActions.setDelete({
        type: 'product',
        id: +id,
      })
    );
    dispatch(uiActions.openModal('openDelete'));
  };
  useEffect(() => {
    categoryGetAllHandler();
  }, [categoryGetAllHandler]);

  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý sản phẩm
          </Typography>
        </Box>
        <Box marginBottom={3}>
          <FormControl variant="outlined" size="small" style={{ minWidth: 250 }}>
            <InputLabel id="category">Chọn danh mục</InputLabel>
            <Select
              native
              required
              labelId="category"
              id="demo-simple-select-outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Chọn danh mục">
              <option value=""></option>
              {listCategory?.length > 0 &&
                listCategory.map((cat, index) => (
                  <optgroup label={cat.name} key={cat.category_id}>
                    {cat?.data?.length > 0 &&
                      cat.data.map((subCat, index) => (
                        <option value={subCat.sub_category_id} key={subCat.sub_category_id}>
                          {subCat.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Box boxShadow={6} marginBottom={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Ảnh </TableCell>
                  <TableCell> Tên </TableCell>
                  <TableCell> Người giữ giá hiện tại </TableCell>
                  <TableCell> Giá hiện tại</TableCell>
                  <TableCell> Tạo lúc </TableCell>
                  <TableCell> Kết thúc</TableCell>
                  <TableCell> Lượt bid </TableCell>
                  {/* <TableCell> Start price </TableCell>
                  <TableCell> Step price </TableCell> */}
                  <TableCell> Giá Mua ngay </TableCell>
                  <TableCell> Tùy chọn </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <RequestLoading />
                ) : (
                  data?.length > 0 &&
                  data.map((item, index) => (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                        {item.product_id}
                      </TableCell>
                      <TableCell>
                        <img
                          className={classes.img}
                          style={{ maxWidth: 120 }}
                          src={item.images[0]?.url}
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.bidder?.name}</TableCell>
                      <TableCell>{formatMoney(item.hidden_price)}đ</TableCell>
                      <TableCell>{item.create_at}</TableCell>
                      <TableCell>{item.expire_at}</TableCell>
                      <TableCell>{item.bid_count} </TableCell>
                      <TableCell>{formatMoney(item.buy_price)}đ</TableCell>
                      <TableCell>
                        <Delete
                          className={classes.actionIcon}
                          color="secondary"
                          onClick={() => openModalDeleteHandler(item.product_id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 50, 100]}
                    count={count}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={pageChangeHandler}
                    onRowsPerPageChange={rowsPerPageChangeHandler}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

export default ProductManager;
