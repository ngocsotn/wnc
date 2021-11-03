import { useState } from 'react';
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './CustomModal.styles';
import AddProductModalPanel from '../ModalPanel/AddProductModalPanel/AddProductModalPanel';
import EditProductModalPanel from '../ModalPanel/EditProductModalPanel/EditProductModalPanel';
import RateModalPanel from '../ModalPanel/RateModalPanel/RateModalPanel';
import { uiActions } from '../../slices/ui.slice';

const CustomModal = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const isOpen =
    ui.openAdd !== false ||
    ui.openUpdate !== false ||
    ui.openRate !== false ||
    ui.openReview !== false;
  const closeHandler = () => {
    dispatch(uiActions.closeModal());
  };

  console.log(isOpen);
  return (
    <Modal
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ overflow: 'auto' }}>
      <>
        {ui.openAdd && <AddProductModalPanel onClose={closeHandler} />}
        {ui.openUpdate && <EditProductModalPanel onClose={closeHandler} />}
        {ui.openRate && <RateModalPanel onClose={closeHandler} />}
        {ui.openReview && <AddProductModalPanel onClose={closeHandler} />}
      </>
    </Modal>
  );
};
export default CustomModal;
