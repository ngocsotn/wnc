import { Box, Button, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { categoryActions, categoryDelete } from '../../../slices/category.slice';
import { productActions, productDelete } from '../../../slices/product.slice';
import { uiActions } from '../../../slices/ui.slice';
import useStyles from './DeleteModalPanel.styles';

function DeleteModalPanel({ onClose }) {
  const classes = useStyles();
  const type = useSelector((state) => state.ui.delete.type);
  const id = useSelector((state) => state.ui.delete.id);
  const dispatch = useDispatch();

  const deleteProductHandler = async () => {
    try {
      await dispatch(
        productDelete({
          product_id: id,
        })
      ).unwrap();
      dispatch(productActions.removeProductById(id));
      toast.success('Xóa thành công');
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };
  const deleteCategoryHandler = async () => {
    try {
      await dispatch(
        categoryDelete({
          category_id: id,
        })
      ).unwrap();
      dispatch(categoryActions.removeCategoryById(id));
      toast.success('Xóa thành công');
      onClose();
    } catch (error) {
      toast.error(error);
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
        <Button
          color="primary"
          startIcon={<Delete style={{ color: '#fff' }} />}
          variant="contained"
          onClick={deleteHandler}>
          Đồng ý
        </Button>
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
