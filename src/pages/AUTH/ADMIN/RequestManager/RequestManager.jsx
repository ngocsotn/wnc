import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './RequestManager.style';
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
	Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Check, Block} from '@material-ui/icons';


function SubCategoryManager() {
	const classes = useStyles();

	return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Quản lý yêu cầu lên seller
          </Typography>
					<div className={classes.topWrapOptions}> 
					</div>
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
                <TableRow className={classes.tableRow}>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    1
                  </TableCell>
                  <TableCell>
										ngocsotn xizot inauu
									</TableCell>
									<TableCell>
										abcxyz12345@emgail.com
									</TableCell>
									<TableCell>
										{moment().format('DD/MM/yyyy HH:mm:ss')}
									</TableCell>
									<TableCell>
										{moment().format('DD/MM/yyyy HH:mm:ss')}
									</TableCell>
									<TableCell>
										Đang chờ
									</TableCell>
									<TableCell>
										Chào quản lý, mình đang có rất nhiều đồ cổ cần đấu giá rao bán, mong được duyệt làm seller, cảm ơn.
									</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center">
											<Check className={classes.actionIcon} />
                      <Block className={classes.actionIcon} />
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
