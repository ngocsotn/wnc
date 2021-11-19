import {
  Box,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import Section from '../../components/Section/Section';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import RequestLoading from '../../components/UI/RequestLoading/RequestLoading';
import { viewRateUserPaging } from '../../slices/view-rate.slice';

function ViewRate() {
  const loading = useSelector((state) => state.viewRate.loading);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const count = useSelector((state) => state.viewRate.count);
  const data = useSelector((state) => state.viewRate.data);
  const user = useSelector((state) => state.viewRate.user);
  const { id } = useParams();
  const dispatch = useDispatch();
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
        viewRateUserPaging({
          page: page + 1,
          limit,
          order_by: '',
          oder_type: '',
          user_id: +id,
        })
      ).unwrap();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }, [limit, page, category, dispatch, id]);

  return (
    <Section>
      <SectionTitle title="Lịch sử được đánh giá" />
      <Box marginBottom={3}>
        <Typography>
          Tên: <b>{user?.name} </b>
        </Typography>
        <Typography>
          Điểm đánh giá:{' '}
          <b> {user?.like / (user?.like + user?.dislike) || 'Chưa được đánh giá'} %</b>
        </Typography>
      </Box>
      <Box boxShadow={6} marginBottom={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell> Tên sản phẩm </TableCell>
                <TableCell> Mô tả </TableCell>
                <TableCell> Người bán </TableCell>
                <TableCell> Đánh giá </TableCell>
                <TableCell> Thời gian </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <RequestLoading />
              ) : (
                data?.length > 0 &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                      {item.id}
                    </TableCell>
                    <TableCell>{item.product?.name}</TableCell>
                    <TableCell>{item.comment}</TableCell>
                    <TableCell>{item.product?.seller?.name}</TableCell>
                    <TableCell>
                      <Typography color={item.point === 1 ? 'primary' : 'secondary'}>
                        {item.point}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.create_at}</TableCell>
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
    </Section>
  );
}

export default ViewRate;
