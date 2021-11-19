import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './UserManager.styles';
import {
  Box,
  Button,
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
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RotateLeft } from '@material-ui/icons';
import {
  adminBlockUser,
  adminGetAllUser,
  adminResetPasswordUser,
} from '../../../../slices/admin.slice';
import RequestLoading from '../../../../components/UI/RequestLoading/RequestLoading';
function UserManager() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const loading = useSelector((state) => state.admin.loading);

  const count = useSelector((state) => state.admin.count);
  const data = useSelector((state) => state.admin.data);

  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const adminGetAllUserHandler = useCallback(
    async ({ page, limit }) => {
      try {
        await dispatch(
          adminGetAllUser({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
      }
    },
    [dispatch]
  );
  const adminResetPasswordUserHandler = async (user_id) => {
    try {
      await dispatch(
        adminResetPasswordUser({
          user_id,
        })
      ).unwrap();
      toast.success('Reset mật khẩu thành công. Vui lòng kiểm tra email');
    } catch (error) {
      toast.error(error);
    }
  };

  const statusChangeHandler = async (e, user_id) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    console.log(newStatus);
    try {
      if (newStatus === 'block') {
        await dispatch(
          adminBlockUser({
            user_id: +user_id,
          })
        ).unwrap();
        toast.success('Cập nhật trạng thái thành công');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    adminGetAllUserHandler({ page, limit });
  }, [adminGetAllUserHandler, page, limit]);
  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý người dùng
          </Typography>
        </Box>
        <Box boxShadow={6} marginBottom={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Tên </TableCell>
                  <TableCell> Email </TableCell>
                  <TableCell> Ngày sinh </TableCell>
                  <TableCell> Địa chỉ </TableCell>
                  <TableCell> Quyền hạn </TableCell>
                  <TableCell> Trạng thái </TableCell>
                  <TableCell> Reset mật khẩu</TableCell>
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
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.birth}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        {item.status === 'block' ? (
                          <Typography variant="body1" color="secondary">
                            Blocked
                          </Typography>
                        ) : (
                          <Select
                            native
                            value={item?.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => statusChangeHandler(e, item.id)}
                            style={{ minWidth: 100 }}>
                            <option value="ok">Active</option>
                            <option value="block">Blocked</option>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          startIcon={<RotateLeft />}
                          onClick={() => adminResetPasswordUserHandler(item.id)}>
                          {' '}
                          Reset
                        </Button>
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

export default UserManager;
