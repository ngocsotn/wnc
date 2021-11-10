import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  option,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './AddProductModalPanel.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { quillConfig } from '../../../utils/quillConfig';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useInput } from '../../../hooks/use-input';
import { text, number } from '../../../schemas/common.schema';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { categoryGetAll } from '../../../slices/category.slice';
import { productAddImage, productAddNew } from '../../../slices/product.slice';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

function AddProductModalPanel({ onClose }) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isExtension, setIsExtension] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [images, setImages] = useState(null);
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.allData);
  const loading = useSelector((state) => state.product.loading);

  const {
    enteredInput: title,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    inputReset: titleReset,
    inputIsValid: titleIsValid,
    hasError: titleHasError,
    errorMsg: titleErrorMsg,
  } = useInput(text);
  const {
    enteredInput: price,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    inputReset: priceReset,
    inputIsValid: priceIsValid,
    hasError: priceHasError,
    errorMsg: priceErrorMsg,
  } = useInput(number, 10000);
  const {
    enteredInput: stepPrice,
    inputChangeHandler: stepPriceChangeHandler,
    inputBlurHandler: stepPriceBlurHandler,
    inputReset: stepPriceReset,
    inputIsValid: stepPriceIsValid,
    hasError: stepPriceHasError,
    errorMsg: stepPriceErrorMsg,
  } = useInput(number, 10000);

  const {
    enteredInput: buyPrice,
    inputChangeHandler: buyPriceChangeHandler,
    inputBlurHandler: buyPriceBlurHandler,
    inputReset: buyPriceReset,
    inputIsValid: buyPriceIsValid,
    hasError: buyPriceHasError,
    errorMsg: buyPriceErrorMsg,
  } = useInput();

  const inputRef = useRef();

  const categoryGetAllHandler = useCallback(async () => {
    try {
      await dispatch(categoryGetAll()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const fileInputHandler = (e) => {
    const files = e.target.files;

    if (files) {
      setImages(files);
      console.log(files);
    }
  };

  const isExentsionHandler = (e) => {
    setIsExtension(e.target.checked);
  };

  const formIsValid =
    titleIsValid && priceIsValid && stepPriceIsValid && description?.length > 10 && images;

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!formIsValid) return;

    try {
      [...images].forEach((item) => {
        console.log(item);
        formData.append('image', item);
      });

      const response = await dispatch(
        productAddNew({
          sub_category_id: +category,
          name: title,
          auto_extend: isExtension,
          detail: description,
          start_price: +price,
          step_price: +stepPrice,
          buy_price: +buyPrice,
          expire_at: moment(endDate).format('DD/MM/yyyy HH:mm:ss'),
        })
      ).unwrap();

      formData.append('product_id', response.product_id);

      await dispatch(productAddImage(formData)).unwrap();
      toast.success('Thêm sản phẩm đấu giá thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    categoryGetAllHandler();
  }, [categoryGetAllHandler]);
  return (
    <Container className={classes.root}>
      <form action="" onSubmit={formSubmitHandler}>
        <ModalTitle title="Thêm sản phẩm đấu giá" onClose={onClose} />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                size="small"
                fullWidth
                required
                variant="outlined"
                label="Tên sản phẩm"
                helperText={(titleHasError && titleErrorMsg) || ''}
                error={titleHasError}
                onBlur={titleBlurHandler}
                onChange={titleChangeHandler}
                value={title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
                size="small">
                <InputLabel id="category">Category</InputLabel>
                <Select
                  native
                  required
                  labelId="category"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="category">
                  <option value=""></option>
                  {listCategory?.length > 0 &&
                    listCategory.map((cat, index) => (
                      <optgroup label={cat.name} key={cat.category_id}>
                        {cat?.data?.length > 0 &&
                          cat.data.map((subCat, index) => (
                            <option value={subCat.sub_category_id} key={subCat.sub_category_id}>
                              {subCat.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                className={classes.input}
                fullWidth
                required
                size="small"
                variant="outlined"
                type="number"
                label="Giá khởi điểm (VND)"
                helperText={(priceHasError && priceErrorMsg) || ''}
                error={priceHasError}
                onBlur={priceBlurHandler}
                onChange={priceChangeHandler}
                value={price}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.input}
                fullWidth
                required
                size="small"
                variant="outlined"
                type="number"
                label="Bước giá (VND)"
                helperText={(stepPriceHasError && stepPriceErrorMsg) || ''}
                error={stepPriceHasError}
                onBlur={stepPriceBlurHandler}
                onChange={stepPriceChangeHandler}
                value={stepPrice}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                className={classes.input}
                fullWidth
                size="small"
                variant="outlined"
                type="number"
                label="Giá mua ngay (VND - không bắt buộc)"
                helperText={(buyPriceHasError && buyPriceErrorMsg) || ''}
                error={buyPriceHasError}
                onBlur={buyPriceBlurHandler}
                onChange={buyPriceChangeHandler}
                value={buyPrice}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
                  size="small"
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>

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
            ref={inputRef}
            onChange={fileInputHandler}
            onClick={(e) => e.target.value === null}
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
        <ButtonLoading
          fullWidth={false}
          style={{ marginTop: 10 }}
          type="submit"
          disabled={!formIsValid}
          isLoading={loading}>
          Thêm sản phẩm đấu giá
        </ButtonLoading>
      </form>
    </Container>
  );
}

export default AddProductModalPanel;
