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
            Product Manager
          </Typography>
        </Box>
        <Box boxShadow={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Image </TableCell>
                  <TableCell> Name </TableCell>
                  <TableCell> Bidder highest price currently </TableCell>
                  <TableCell> Current price</TableCell>
                  <TableCell> Create at </TableCell>
                  <TableCell> Time remaining </TableCell>
                  <TableCell> Bid </TableCell>
                  {/* <TableCell> Start price </TableCell>
                  <TableCell> Step price </TableCell> */}
                  <TableCell> Buy price </TableCell>
                  <TableCell> Options </TableCell>
                  <TableCell> Expire at </TableCell>
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
                  <TableCell>{moment().format('DD/MM/yyyy')}</TableCell>
                  <TableCell>{moment().format('HH: mm: ss')}</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>45.000.000đ</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center">
                      <Delete className={classes.actionIcon} />
                    </Box>
                  </TableCell>
                  <TableCell>{moment().format('DD/MM/yyyy')}</TableCell>
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
