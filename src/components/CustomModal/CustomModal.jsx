import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../slices/ui.slice';
import AddProductModalPanel from '../ModalPanel/AddProductModalPanel/AddProductModalPanel';
import EditProductModalPanel from '../ModalPanel/EditProductModalPanel/EditProductModalPanel';
import RateModalPanel from '../ModalPanel/RateModalPanel/RateModalPanel';
import DeleteModalPanel from '../ModalPanel/DeleteModalPanel/DeleteModalPanel';
import AddCategoryModalPanel from '../ModalPanel/AddCategoryModalPanel/AddCategoryModalPanel';
import UpdateCategoryModalPanel from '../ModalPanel/UpdateCategoryModalPanel/UpdateCategoryModalPanel';
import ConfirmModalPanel from '../ModalPanel/ConfirmModalPanel/ConfirmModalPanel';
import SellerAcceptModalPanel from '../ModalPanel/SellerAcceptModalPanel/SellerAcceptModalPanel';
import SellerDenyModalPanel from '../ModalPanel/SellerDenyModalPanel/SellerDenyModalPanel';

const CustomModal = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const isOpen =
    ui.openSellerAccept !== false ||
    ui.openSellerDeny !== false ||
    ui.openConfirm !== false ||
    ui.openUpdateCategory !== false ||
    ui.openAddCategory !== false ||
    ui.openAdd !== false ||
    ui.openUpdate !== false ||
    ui.openRate !== false ||
    ui.openDelete !== false ||
    ui.openReview !== false;

  const closeHandler = () => {
    dispatch(uiActions.closeModal());
  };

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
        {ui.openDelete && <DeleteModalPanel onClose={closeHandler} />}
        {ui.openAddCategory && <AddCategoryModalPanel onClose={closeHandler} />}
        {ui.openUpdateCategory && <UpdateCategoryModalPanel onClose={closeHandler} />}
        {ui.openConfirm && <ConfirmModalPanel onClose={closeHandler} />}
        {ui.openSellerAccept && <SellerAcceptModalPanel onClose={closeHandler} />}
        {ui.openSellerDeny && <SellerDenyModalPanel onClose={closeHandler} />}
      </>
    </Modal>
  );
};
export default CustomModal;
