import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './UpdateSubCategoryModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { categoryUpdateSub } from '../../../slices/subCategory.slice';
function UpdateSubCategoryModalPanel({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listSubCategory = useSelector((state) => state.subCategory.allData);

  const categoryId = useSelector((state) => state.ui.subCategory.category_id);
  const subCategoryId = useSelector((state) => state.ui.subCategory.sub_category_id);
  const subCategoryName = useSelector((state) => state.ui.subCategory.name);
  const requesting = useSelector((state) => state.subCategory.requesting);

  const [category, setCategory] = useState('');

  const {
    enteredInput: name,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    inputReset: nameReset,
    inputIsValid: nameIsvalid,
    hasError: nameHasError,
    errorMsg: nameErrorMessage,
  } = useInput(text, subCategoryName);

  const formIsValid =
    nameIsvalid && category !== '' && (name !== subCategoryName || category !== categoryId);

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      await dispatch(
        categoryUpdateSub({
          name: name,
          category_id: +category,
          sub_category_id: +subCategoryId,
        })
      ).unwrap();

      toast.success('Cập nhật danh mục con thành công');
      nameReset();
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setCategory(categoryId);
  }, [categoryId]);

  return (
    <div className={classes.root}>
      <form action="" onSubmit={addCategoryHandler}>
        <ModalTitle title="Cập nhật danh mục con" onClose={onClose} />

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
          disabled={!formIsValid}
          isLoading={requesting}>
          Cập nhật
        </ButtonLoading>
      </form>
    </div>
  );
}

export default UpdateSubCategoryModalPanel;
