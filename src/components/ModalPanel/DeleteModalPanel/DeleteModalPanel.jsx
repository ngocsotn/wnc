import { Box, Button, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { categoryActions, categoryDelete } from '../../../slices/category.slice';
import { productActions, productDelete } from '../../../slices/product.slice';
import { categoryDeleteSub } from '../../../slices/subCategory.slice';
import useStyles from './DeleteModalPanel.styles';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';

function DeleteModalPanel({ onClose }) {
  const classes = useStyles();
  const type = useSelector((state) => state.ui.delete.type);
  const id = useSelector((state) => state.ui.delete.id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteProductHandler = async () => {
    setLoading(true);
    try {
      await dispatch(
        productDelete({
          product_id: id,
        })
      ).unwrap();
      dispatch(productActions.removeProductById(id));
      toast.success('Xóa thành công');
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const deleteCategoryHandler = async () => {
    setLoading(true);

    try {
      await dispatch(
        categoryDelete({
          category_id: id,
        })
      ).unwrap();
      dispatch(categoryActions.removeCategoryById(id));
      toast.success('Xóa thành công');
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };
  const deleteSubCategoryHandler = async () => {
    setLoading(true);

    try {
      await dispatch(
        categoryDeleteSub({
          sub_category_id: id,
        })
      ).unwrap();
      dispatch(categoryActions.removeCategoryById(id));
      toast.success('Xóa thành công');
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!type || !id) {
      toast.error('Đã có lỗi xảy ra');
      onClose();
      return;
    }

    if (type === 'product') {
      deleteProductHandler();
    }

    if (type === 'category') {
      deleteCategoryHandler();
    }
    if (type === 'sub-category') {
      deleteSubCategoryHandler();
    }
  };
  return (
    <div className={classes.root}>
      <Box marginBottom={2}>
        <Typography variant="h6" component="p" style={{ textAlign: 'center', marginBottom: 16 }}>
          Thông báo
        </Typography>
        <Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
          Bạn có chắc chắn muốn xóa?
        </Typography>
      </Box>
      <Box className={classes.actions}>
        {loading ? (
          <ButtonLoading
            fullWidth={false}
            style={{ margin: '10px auto' }}
            type="submit"
            isLoading={loading}>
            Đồng ý
          </ButtonLoading>
        ) : (
          <Button
            color="primary"
            startIcon={<Delete style={{ color: '#fff' }} />}
            variant="contained"
            onClick={deleteHandler}>
            Đồng ý
          </Button>
        )}

        <Button
          onClick={onClose}
          startIcon={<Close color="primary" />}
          variant="outlined"
          color="primary">
          Hủy
        </Button>
      </Box>
    </div>
  );
}

export default DeleteModalPanel;
