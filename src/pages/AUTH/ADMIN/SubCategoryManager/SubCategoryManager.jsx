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
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Delete, Edit, Add } from '@material-ui/icons';

import { categoryGetByPage, subCategoryGetByPage } from '../../../../slices/subCategory.slice';
import { uiActions } from '../../../../slices/ui.slice';

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
  const count = useSelector((state) => state.subCategory.count);
  const data = useSelector((state) => state.subCategory.data);
  const listSubCategory = useSelector((state) => state.subCategory.allData);

  const openModalAddHandler = () => {
    dispatch(uiActions.openModal('openAddSubCategory'));
  };

  const openModalDeleteHandler = (id) => {
    dispatch(
      uiActions.setDelete({
        type: 'sub-category',
        id: +id,
      })
    );
    dispatch(uiActions.openModal('openDelete'));
  };

  const openModalUpdateHandler = (name, category_id, sub_category_id) => {
    dispatch(
      uiActions.setSubCategory({
        name,
        category_id,
        sub_category_id,
      })
    );

    dispatch(uiActions.openModal('openUpdateSubCategory'));
  };

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetByPage({ limit: 99999999, page: 1 })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    categoryGetAllHandler();
  }, [categoryGetAllHandler]);

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

  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý danh mục con
          </Typography>
        </Box>

        <Box marginBottom={2} marginLeft="auto">
          <FormControl variant="outlined" size="small" style={{ minWidth: 250 }}>
            <InputLabel id="category">Chọn danh mục</InputLabel>
            <Select
              native
              className={classes.selectCategory}
              required
              labelId="category"
              id="demo-simple-select-outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              labelWidth={120}>
              <option value=""></option>
              {listSubCategory?.length > 0 &&
                listSubCategory.map((item, index) => (
                  <option value={item.category_id} key={item.category_id}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" style={{ float: 'right' }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              className={classes.buttonAdd}
              onClick={openModalAddHandler}>
              Thêm mới
            </Button>
          </FormControl>
        </Box>

        <Box boxShadow={6} marginBottom={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Tên </TableCell>
                  <TableCell> ID Danh mục cha </TableCell>
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
                          <Edit
                            className={classes.actionIcon}
                            color="primary"
                            onClick={() =>
                              openModalUpdateHandler(
                                item.name,
                                item.category_id,
                                item.sub_category_id
                              )
                            }
                          />
                          <Delete
                            className={classes.actionIcon}
                            color="secondary"
                            onClick={() => openModalDeleteHandler(item.sub_category_id)}
                          />
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
