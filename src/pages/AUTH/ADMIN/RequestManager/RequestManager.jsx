import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './RequestManager.style';
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
} from '@material-ui/core';

import { Check, Block } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { requestAdminGetAll, requestAdminUpdateStatus } from '../../../../slices/requests.slice';
import RequestLoading from '../../../../components/UI/RequestLoading/RequestLoading';
import { toast } from 'react-toastify';

function RequestManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const loading = useSelector((state) => state.request.loading);

  const count = useSelector((state) => state.request.count);
  const data = useSelector((state) => state.request.data);

  const rowsPerPageChangeHandler = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const requestAdminUpdateStatusHandler = async ({ user_id, status }) => {
    try {
      await dispatch(
        requestAdminUpdateStatus({
          user_id: +user_id,
          status,
        })
      ).unwrap();
      toast.success('Yêu cầu đã được lên seller');
    } catch (error) {
      toast.error(error);
    }
  };
  const requestAdminGetAllHandler = useCallback(
    async ({ limit, page }) => {
      try {
        await dispatch(
          requestAdminGetAll({
            page,
            limit,
            order_by: 'create_at',
            order_type: 'DESC',
            status: '',
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    requestAdminGetAllHandler({ limit, page: page + 1 });
  }, [limit, page, requestAdminGetAllHandler]);
  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý yêu cầu lên seller
          </Typography>
          <div className={classes.topWrapOptions}></div>
        </Box>
        <Box boxShadow={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Tên người dùng </TableCell>
                  <TableCell> Email </TableCell>
                  <TableCell> Được tạo lúc</TableCell>
                  <TableCell> Hết hạn lúc </TableCell>
                  <TableCell> Tình trạng yêu cầu </TableCell>
                  <TableCell> Lý do xin </TableCell>
                  <TableCell className={classes.actionHeader}> Tùy chọn </TableCell>
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
                      <TableCell>{item.create_at}</TableCell>
                      <TableCell>{item.expire_at}</TableCell>
                      <TableCell>
                        <Typography
                          color={
                            item.status === 'accepted'
                              ? 'primary'
                              : item.status === 'denied'
                              ? 'secondary'
                              : 'inherit'
                          }>
                          {item.status}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>
                        {item.status === 'pending' && (
                          <Box display="flex" justifyContent="center">
                            <Check
                              className={classes.actionIcon}
                              color="primary"
                              onClick={() =>
                                requestAdminUpdateStatusHandler({
                                  user_id: item.user_id,
                                  status: 'accepted',
                                })
                              }
                            />
                            <Block
                              className={classes.actionIcon}
                              color="secondary"
                              onClick={() =>
                                requestAdminUpdateStatusHandler({
                                  user_id: item.user_id,
                                  status: 'denied',
                                })
                              }
                            />
                          </Box>
                        )}
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

export default RequestManager;
