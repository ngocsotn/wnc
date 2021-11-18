import React, { useEffect, useState } from 'react';
import useStyles from './CategoryManager.styles';
import { uiActions } from '../../../../slices/ui.slice';
import {
  Box,
  Container,
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

import { categoryGetByPage } from '../../../../slices/category.slice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Delete, Edit, Add } from '@material-ui/icons';

function CategoryManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const count = useSelector((state) => state.category.count);
  const data = useSelector((state) => state.category.data);

  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };
  const openModalAddHandler = () => {
    dispatch(uiActions.openModal('openAddCategory'));
  };

  const openModalUpdateHandler = (name, category_id) => {
    dispatch(
      uiActions.setCategory({
        name,
        category_id,
      })
    );

    dispatch(uiActions.openModal('openUpdateCategory'));
  };
  const openModalDeleteHandler = (id) => {
    dispatch(
      uiActions.setDelete({
        type: 'category',
        id: +id,
      })
    );
    dispatch(uiActions.openModal('openDelete'));
  };

  useEffect(() => {
    try {
      dispatch(categoryGetByPage({ limit, page: page + 1 })).unwrap();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }, [limit, page, dispatch]);

  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý danh mục
          </Typography>
        </Box>
        <Box marginBottom={2} marginLeft="auto" textAlign="right">
          <Button
            variant="outlined"
            startIcon={<Add />}
            className={classes.buttonAdd}
            onClick={openModalAddHandler}>
            Thêm mới
          </Button>
        </Box>
        <Box boxShadow={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Tên </TableCell>
                  <TableCell className={classes.actionHeader}> Tùy chọn </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length > 0 &&
                  data.map((item, index) => (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                        {item.category_id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center">
                          <Edit
                            className={classes.actionIcon}
                            onClick={() => openModalUpdateHandler(item.name, item.category_id)}
                          />
                          <Delete
                            className={classes.actionIcon}
                            onClick={() => openModalDeleteHandler(item.category_id)}
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

export default CategoryManager;
