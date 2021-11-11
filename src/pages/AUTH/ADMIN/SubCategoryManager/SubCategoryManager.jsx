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

function SubCategoryManager() {
  const classes = useStyles();

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
              <Select native className={classes.selectCategory}>
                <option value={false}>Điện tử và thiết bị thông minh</option>
                <option value={true}>Đồ cổ và đồ quý giá</option>
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
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    1
                  </TableCell>
                  <TableCell>Điện thoại di động</TableCell>
                  <TableCell>Điện tử và thiết bị thông minh</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center">
                      <Edit className={classes.actionIcon} />
                      <Delete className={classes.actionIcon} />
                    </Box>
                  </TableCell>
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

export default SubCategoryManager;
