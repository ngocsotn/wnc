import { Box, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './RateModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { ThumbDownAlt, ThumbUpAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { rateCreateNew } from '../../../slices/rate.slice';
import { toast } from 'react-toastify';
import { uiActions } from '../../../slices/ui.slice';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';

function ReviewModalPanel({ onClose }) {
  const classes = useStyles();
  const [isLike, setIsLike] = useState(true);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.ui.rate.type);
  const product_id = useSelector((state) => state.ui.rate.product_id);
  const user_id_2 = useSelector((state) => state.ui.rate.user_id_2);

  const {
    enteredInput: comment,
    inputBlurHandler: commentBlurHandler,
    inputChangeHandler: commentChangeHandler,
    inputReset: commentReset,
    inputIsValid: commentIsvalid,
    hasError: commentHasError,
    errorMsg: commentErrorMessage,
  } = useInput(text, 'Không bình luận');

  const rateSellerHandler = async () => {
    try {
      console.log('here');
      await dispatch(
        rateCreateNew({
          product_id,
          user_id_2,
          comment: comment,
          point: isLike ? 1 : -1,
        })
      ).unwrap();
      toast.success('Đánh giá thành công');
      commentReset();
      dispatch(uiActions.closeModal());
    } catch (error) {
      toast.error(error);
    }
  };

  const rateHandler = async () => {
    if (type === 'auction-won') {
      rateSellerHandler();
    }
  };

  return (
    <div className={classes.root}>
      <form action="">
        <ModalTitle title="Đánh giá" onClose={onClose} />
        <div>
          <Box textAlign="center" marginBottom={3}>
            <IconButton onClick={() => setIsLike(true)}>
              <ThumbUpAlt color={isLike ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton onClick={() => setIsLike(false)}>
              <ThumbDownAlt color={!isLike ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
          <div>
            <TextField
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              label="Mô tả trải nghiệm của bạn "
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
          disabled={!commentIsvalid}>
          Đánh giá
        </ButtonLoading>
      </form>
    </div>
  );
}

export default ReviewModalPanel;
