import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './EditProductModalPanel.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { quillConfig } from '../../../utils/quillConfig';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { productUpdate } from '../../../slices/product.slice';
import { uiActions } from '../../../slices/ui.slice';

function EditProductModalPanel({ onClose }) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const productId = useSelector((state) => state.ui.product.product_id);
  const formIsValid = description.length > 10;

  const dispatch = useDispatch();

  const productUpdateHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      await dispatch(
        productUpdate({
          product_id: +productId,
          detail: description,
        })
      ).unwrap();
      toast.success('Cập nhật thông tin thành công');
      dispatch(uiActions.closeModal());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container className={classes.root}>
      <form action="" onSubmit={productUpdateHandler}>
        <ModalTitle title="Cập nhật mô tả" onClose={onClose} />
        <div>
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

        <ButtonLoading
          fullWidth={false}
          type="submit"
          style={{ marginTop: 10 }}
          disabled={!formIsValid}>
          Lưu
        </ButtonLoading>
      </form>
    </Container>
  );
}

export default EditProductModalPanel;
