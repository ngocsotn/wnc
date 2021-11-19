import { Box, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './SellerAcceptModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { ThumbUpAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { tradeAcceptOrDeny } from '../../../slices/trade.slice';

function SellerAcceptModalPanel({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.ui.seller.type);
  const product_id = useSelector((state) => state.ui.seller.product_id);
  const bidder_id = useSelector((state) => state.ui.seller.bidder_id);
  const [loading, setLoading] = useState(false);
  const {
    enteredInput: comment,
    inputBlurHandler: commentBlurHandler,
    inputChangeHandler: commentChangeHandler,
    inputReset: commentReset,
    inputIsValid: commentIsvalid,
    hasError: commentHasError,
    errorMsg: commentErrorMessage,
  } = useInput(text, 'Người mua thanh toán đầy đủ.');

  const tradeAcceptOrDenyHandler = async () => {
    setLoading(true);
    try {
      await dispatch(
        tradeAcceptOrDeny({
          bidder_id,
          product_id,
          status: 'accepted',
          comment,
        })
      ).unwrap();
      toast.success('Hoàn tất giao dịch');
      commentReset();
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const rateHandler = async () => {
    if (type === 'accept') {
      tradeAcceptOrDenyHandler();
    }
  };

  return (
    <div className={classes.root}>
      <form action="" onSubmit={rateHandler}>
        <ModalTitle title="Đánh giá" onClose={onClose} />
        <div>
          <Box textAlign="center" marginBottom={3}>
            <IconButton>
              <ThumbUpAlt color="primary" />
            </IconButton>
          </Box>

          <div>
            <TextField
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              label="Mô tả trải nghiệm của bạn"
              value={comment}
              error={commentHasError}
              onBlur={commentBlurHandler}
              onChange={commentChangeHandler}
              helperText={(commentHasError && commentErrorMessage) || ''}
            />
          </div>
        </div>

        <ButtonLoading
          fullWidth={false}
          style={{ margin: '10px auto' }}
          onClick={rateHandler}
          disabled={!commentIsvalid}
          isLoading={loading}>
          Chấp nhận giao dịch
        </ButtonLoading>
      </form>
    </div>
  );
}

export default SellerAcceptModalPanel;
