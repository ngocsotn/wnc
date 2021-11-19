import { Box, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './SellerDenyModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { ThumbDownAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { tradeAcceptOrDeny } from '../../../slices/trade.slice';

function SellerDenyModalPanel({ onClose }) {
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
  } = useInput(text, 'Người mua không thanh toán.');

  const tradeAcceptOrDenyHandler = async () => {
    setLoading(true);
    try {
      await dispatch(
        tradeAcceptOrDeny({
          bidder_id,
          product_id,
          status: 'denied',
          comment,
        })
      ).unwrap();
      toast.success('Từ chối giao dịch thành công');
      commentReset();
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const rateHandler = async () => {
    if (type === 'deny') {
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
              <ThumbDownAlt color="primary" />
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
          isLoading={loading}
          disabled={!commentIsvalid}>
          Từ chối giao dịch
        </ButtonLoading>
      </form>
    </div>
  );
}

export default SellerDenyModalPanel;
