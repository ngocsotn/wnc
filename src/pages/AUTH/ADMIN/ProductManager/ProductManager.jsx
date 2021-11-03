import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './ProductManager.styles';
import moment from 'moment';
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
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Delete, Edit } from '@material-ui/icons';
function ProductManager() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý sản phẩm
          </Typography>
        </Box>
        <Box boxShadow={6}>
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
                  <TableCell> Thời gian còn lại </TableCell>
                  <TableCell> Lượt bid </TableCell>
                  {/* <TableCell> Start price </TableCell>
                  <TableCell> Step price </TableCell> */}
                  <TableCell> Giá Mua ngay </TableCell>
                  <TableCell> Tùy chọn </TableCell>
                  <TableCell> Kết thúc</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    1
                  </TableCell>
                  <TableCell>
                    <img
                      className={classes.img}
                      style={{ maxWidth: 120 }}
                      src={
                        'http://res.cloudinary.com/ngocsotn/image/upload/v1635844998/CCNLTHD-SYTEM/vne0wtnejlwea2whcwyk.png'
                      }
                      alt=""
                    />
                  </TableCell>
                  <TableCell>Điện thoại iPhone 13 Pro Max 1TB</TableCell>
                  <TableCell>Nguyễn Văn Nhật</TableCell>
                  <TableCell>40.000.000đ</TableCell>
                  <TableCell>{moment().format('DD/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell>{moment().format('HH: mm: ss')}</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>45.000.000đ</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center">
                      <Delete className={classes.actionIcon} />
                    </Box>
                  </TableCell>
                  <TableCell>{moment().format('DD/MM/yyyy HH:mm:ss')}</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={25}
                    rowsPerPage={5}
                    page={1}
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
