import { Box, Button, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { bidBidProduct } from '../../../slices/bid.slice';
import { uiActions } from '../../../slices/ui.slice';
import useStyles from './ConfirmModalPanel.styles';

function ConfirmModalPanel({ onClose }) {
  const classes = useStyles();
  const product_id = useSelector((state) => state.ui.confirm.product_id);
  const price = useSelector((state) => state.ui.confirm.price);
  const type = useSelector((state) => state.ui.confirm.type);
  const dispatch = useDispatch();

  const bidHandler = async () => {
    try {
      await dispatch(
        bidBidProduct({
          product_id: +product_id,
          price: +price,
        })
      ).unwrap();

      toast.success('Đấu giá thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  const confirmHandler = async () => {
    if (!type || !product_id) {
      toast.error('Đã có lỗi xảy ra');
      onClose();
      return;
    }

    if (type === 'bid') {
      bidHandler();
    }
    dispatch(uiActions.closeModal());
  };
  return (
    <div className={classes.root}>
      <Box marginBottom={2}>
        <Typography variant="h6" component="p" style={{ textAlign: 'center', marginBottom: 16 }}>
          Thông báo
        </Typography>
        <Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
          {type === 'bid' && 'Bạn muốn đấu giá sản phẩm này?'}
        </Typography>
      </Box>
      <Box className={classes.actions}>
        <Button
          color="primary"
          startIcon={<Delete style={{ color: '#fff' }} />}
          variant="contained"
          onClick={confirmHandler}>
          Đồng ý
        </Button>
        <Button
          onClick={onClose}
          startIcon={<Close color="primary" />}
          variant="outlined"
          color="primary">
          Hủy
        </Button>
      </Box>
    </div>
  );
}

export default ConfirmModalPanel;
