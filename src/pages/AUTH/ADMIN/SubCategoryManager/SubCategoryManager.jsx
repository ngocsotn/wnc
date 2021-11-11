import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './SubCategoryManager.styles';

import {
  Box,
  Container,
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
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Delete, Edit, Add } from '@material-ui/icons';

import { categoryGetByPage, subCategoryGetByPage } from '../../../../slices/category.slice';

function SubCategoryManager() {
  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState('');
  const count = useSelector((state) => state.category.count);
  const data = useSelector((state) => state.category.data);
  const listSubCategory = useSelector((state) => state.category.allData);

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetByPage({ limit: 1000, page: 1 })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(
        subCategoryGetByPage({
          category_id: +category,
          limit,
          page: page + 1,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }, [limit, page, category, dispatch]);

  useEffect(() => {
    categoryGetAllHandler();
  }, [categoryGetAllHandler]);


  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý danh mục con
          </Typography>
          <div className={classes.topWrapOptions}>
            <Button variant="outlined" startIcon={<Add />} className={classes.buttonAdd}>
              Thêm mới
            </Button>
            <div className={classes.selectWrap}>
              <Typography
                variant="p"
                style={{ fontWeight: 'bold' }}
                className={classes.categoryTitle}>
                Danh mục Cha
              </Typography>

              <Select
                native
                className={classes.selectCategory}
                required
                labelId="category"
                id="demo-simple-select-outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                {listSubCategory?.length > 0 &&
                  listSubCategory.map((item, index) => (
                    <option value={item.category_id} key={item.category_id}>
                      {item.name}
                    </option>
                  ))}

              </Select>
            </div>
          </div>
        </Box>
        <Box boxShadow={6} marginBottom={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Tên </TableCell>
                  <TableCell> Danh mục cha </TableCell>
                  <TableCell className={classes.actionHeader}> Tùy chọn </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {data?.length > 0 &&
                  data.map((item, index) => (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                        {item.sub_category_id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category_id}</TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center">
                          <Edit className={classes.actionIcon} />
                          <Delete className={classes.actionIcon} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}

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

export default SubCategoryManager;
