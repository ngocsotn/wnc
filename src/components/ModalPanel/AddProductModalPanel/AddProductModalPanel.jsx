import { Checkbox, Container, FormControl, FormControlLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './AddProductModalPanel.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { quillConfig } from '../../../utils/quillConfig';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
function AddProductModalPanel({ onClose }) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [isExtension, setIsExtension] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const isExentsionHandler = (e) => {
    setIsExtension(e.target.checked);
  };
  return (
    <Container className={classes.root}>
      <form action="">
        <ModalTitle title="Thêm sản phẩm đấu giá" onClose={onClose} />
        <div>
          <TextField
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            label="Tên sản phẩm"
          />
          <TextField
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            type="number"
            label="Giá khởi điểm (VND)"
          />
          <TextField
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            type="number"
            label="Bước giá (VND)"
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              fullWidth
              minDate={new Date()}
              label="Ngày kết thúc"
              value={endDate}
              onChange={setEndDate}
              onError={console.log}
              format="DD/MM/yyyy HH:mm:ss"
              inputVariant="outlined"
              margin="dense"
              size="small"
            />
          </MuiPickersUtilsProvider>

          <TextField
            className={classes.input}
            fullWidth
            required
            margin="dense"
            variant="outlined"
            type="number"
            label="Giá mua ngay (VND - không bắt buộc)"
          />

          <ReactQuill
            id="description"
            placeholder="Mô tả..."
            value={description}
            onChange={setDescription}
            className={classes.description}
            theme="snow"
            modules={quillConfig.modules}
            formats={quillConfig.formats}
          />
        </div>
        <div>
          Chọn ảnh:{' '}
          <input
            type="file"
            name="images"
            id="images"
            multiple
            accept="image/png, image/gif, image/jpeg"
            placeholder="Chọn ảnh"
          />
        </div>
        <FormControl color="primary">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isExtension}
                onChange={isExentsionHandler}
                name="gilad"
              />
            }
            label="Tự động gia hạn"
          />
        </FormControl>
        <ButtonLoading fullWidth={false} style={{ marginTop: 10 }}>
          Lưu
        </ButtonLoading>
      </form>
    </Container>
  );
}

export default AddProductModalPanel;
