import { TextField } from '@material-ui/core';
import React from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './UpdateCategoryModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uiActions } from '../../../slices/ui.slice';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { categoryAddNew, categoryUpdate } from '../../../slices/category.slice';
import { useSelector } from 'react-redux';

function UpdateCategoryModalPanel({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.ui.category.category_id);
  const categoryName = useSelector((state) => state.ui.category.name);

  const {
    enteredInput: name,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    inputReset: nameReset,
    inputIsValid: nameIsvalid,
    hasError: nameHasError,
    errorMsg: nameErrorMessage,
  } = useInput(text, categoryName);

  const updateCategoryHandler = async (e) => {
    e.preventDefault();
    if (!nameIsvalid) return;

    try {
      await dispatch(
        categoryUpdate({
          name: name,
          category_id: +categoryId,
        })
      ).unwrap();
      toast.success('Cập nhật danh mục thành công');
      nameReset();
      dispatch(uiActions.closeModal());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <form action="" onSubmit={updateCategoryHandler}>
        <ModalTitle title="Cập nhật danh mục" onClose={onClose} />
        <div>
          <TextField
            variant="outlined"
            fullWidth
            label="Tên danh mục"
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
          disabled={name === categoryName || !nameIsvalid}>
          Cập nhật
        </ButtonLoading>
      </form>
    </div>
  );
}

export default UpdateCategoryModalPanel;
