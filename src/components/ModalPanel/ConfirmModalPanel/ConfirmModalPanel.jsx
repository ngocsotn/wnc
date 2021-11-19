import { Box, Button, Typography } from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { bidBidProduct, bidBuyProduct } from '../../../slices/bid.slice';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import useStyles from './ConfirmModalPanel.styles';

function ConfirmModalPanel({ onClose }) {
  const classes = useStyles();
  const product_id = useSelector((state) => state.ui.confirm.product_id);
  const price = useSelector((state) => state.ui.confirm.price);
  const type = useSelector((state) => state.ui.confirm.type);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const buyNowHandler = async () => {
    setLoading(true);
    try {
      await dispatch(
        bidBuyProduct({
          product_id: +product_id,
        })
      ).unwrap();
      toast.success('Mua thành công');
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const bidHandler = async () => {
    setLoading(true);

    try {
      await dispatch(
        bidBidProduct({
          product_id: +product_id,
          price: +price,
        })
      ).unwrap();

      toast.success('Đấu giá thành công');
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
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

    if (type === 'buy') {
      buyNowHandler();
    }
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
        {loading ? (
          <ButtonLoading
            fullWidth={false}
            style={{ margin: '10px auto' }}
            type="submit"
            isLoading={loading}>
            Đồng ý
          </ButtonLoading>
        ) : (
          <Button
            color="primary"
            startIcon={<Check style={{ color: '#fff' }} />}
            variant="contained"
            onClick={confirmHandler}>
            Đồng ý
          </Button>
        )}
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
