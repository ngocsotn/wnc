import { TextField } from '@material-ui/core';
import React from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './AddCategoryModalPanel.styles';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uiActions } from '../../../slices/ui.slice';
import { useInput } from '../../../hooks/use-input';
import { text } from '../../../schemas/common.schema';
import { categoryAddNew } from '../../../slices/category.slice';

function AddCategoryModalPanel({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    if (!nameIsvalid) return;

    try {
      await dispatch(
        categoryAddNew({
          name: name,
        })
      ).unwrap();
      toast.success('Thêm danh mục thành công');
      nameReset();
      dispatch(uiActions.closeModal());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <form action="" onSubmit={addCategoryHandler}>
        <ModalTitle title="Thêm danh mục" onClose={onClose} />
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
          disabled={!nameIsvalid}>
          Thêm mới
        </ButtonLoading>
      </form>
    </div>
  );
}

export default AddCategoryModalPanel;
