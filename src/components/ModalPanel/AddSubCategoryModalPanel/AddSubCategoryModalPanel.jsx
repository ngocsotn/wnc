import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './AddSubCategoryModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { categoryAddSub } from '../../../slices/subCategory.slice';
function AddSubCategoryModalPanel({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listSubCategory = useSelector((state) => state.subCategory.allData);
  const [category, setCategory] = useState('');
  const requesting = useSelector((state) => state.subCategory.requesting);

  const {
    enteredInput: name,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    inputReset: nameReset,
    inputIsValid: nameIsvalid,
    hasError: nameHasError,
    errorMsg: nameErrorMessage,
  } = useInput(text);

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    if (!nameIsvalid || category.length === 0) return;

    try {
      await dispatch(
        categoryAddSub({
          name: name,
          category_id: +category,
        })
      ).unwrap();
      toast.success('Thêm danh mục con thành công');
      nameReset();
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <form action="" onSubmit={addCategoryHandler}>
        <ModalTitle title="Thêm danh mục" onClose={onClose} />

        <FormControl
          variant="outlined"
          size="small"
          style={{ minWidth: 250 }}
          fullWidth
          margin="normal">
          <InputLabel id="category">Chọn danh mục</InputLabel>
          <Select
            native
            className={classes.selectCategory}
            required
            labelId="category"
            id="demo-simple-select-outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            minWidth={150}
            labelWidth={120}>
            <option value=""></option>
            {listSubCategory?.length > 0 &&
              listSubCategory.map((item, index) => (
                <option value={item.category_id} key={item.category_id}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            fullWidth
            label="Tên danh mục con"
            size="small"
            value={name}
            error={nameHasError}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
            helperText={(nameHasError && nameErrorMessage) || ''}
          />
        </div>

        <ButtonLoading
          fullWidth={false}
          style={{ margin: '10px auto' }}
          type="submit"
          disabled={!nameIsvalid || category.length === 0}
          isLoading={requesting}>
          Thêm mới
        </ButtonLoading>
      </form>
    </div>
  );
}

export default AddSubCategoryModalPanel;
