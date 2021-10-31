import { Box, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './RateModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { ThumbDownAlt, ThumbUpAlt } from '@material-ui/icons';

function ReviewModalPanel({ onClose }) {
  const classes = useStyles();
  const [isLike, setIsLike] = useState(true);

  return (
    <div className={classes.root}>
      <form action="">
        <ModalTitle title="Đánh giá người bán" onClose={onClose} />
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
              label="Mô tả trải nghiệm của bạn (không bắt buộc)"
            />
          </div>
        </div>

        <ButtonLoading fullWidth={false} style={{ margin: '10px auto' }}>
          Đánh giá
        </ButtonLoading>
      </form>
    </div>
  );
}

export default ReviewModalPanel;
