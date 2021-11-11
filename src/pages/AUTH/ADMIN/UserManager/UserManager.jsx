import React from 'react';
import useStyles from './UserManager.styles';
import moment from 'moment';
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
import { Delete, Edit } from '@material-ui/icons';
function UserManager() {
  const classes = useStyles();

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
                  <TableCell> Tùy chọn </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  // onClick={() => openUpdateModalHandler(row.prod_id)}
                  className={classes.tableRow}>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    1
                  </TableCell>
                  <TableCell>Nguyễn Văn Nhật</TableCell>
                  <TableCell>xizot@gmail.com</TableCell>
                  <TableCell>{moment().format('DD/MM/yyyy')}</TableCell>
                  <TableCell>123 Thu Duc</TableCell>
                  <TableCell>Bidder</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Edit className={classes.actionIcon} />
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

export default UserManager;
