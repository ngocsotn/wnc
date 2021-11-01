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
import { userActions } from '../../../../slices/user.slice';
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
                        'data:image/jpeg;base64,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'
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
