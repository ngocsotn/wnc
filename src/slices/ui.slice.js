import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    openConfirm: false,
    openAddCategory: false,
    openUpdateCategory: false,
    openAdd: false,
    openUpdate: false,
    openRate: false,
    openReview: false,
    openDelete: false,
    delete: {
      type: null,
      id: null,
    },

    rate: {
      user_id_2: null,
      product_id: null,
      type: null,
    },

    category: {
      name: null,
      category_id: null,
    },
    confirm: {
      type: null,
      price: null,
      product_id: null,
    },

    product: {
      type: null,
      product_id: null,
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.openConfirm = false;
      state.openAddCategory = false;
      state.openUpdateCategory = false;
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
      state.openDelete = false;
      state[action.payload] = true;
    },
    closeModal: (state) => {
      state.openConfirm = false;
      state.openAddCategory = false;
      state.openUpdateCategory = false;
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
      state.openDelete = false;
      state.delete.type = null;
      state.delete.id = null;
      state.rate.product_id = null;
      state.rate.user_id_2 = null;
      state.rate.type = null;
      state.category.name = null;
      state.category.category_id = null;
      state.product.product_id = null;
    },
    setDelete: (state, action) => {
      const { type, id } = action.payload;
      state.delete.id = id;
      state.delete.type = type;
    },

    setRate: (state, action) => {
      const { product_id, user_id_2, type } = action.payload;
      state.rate.product_id = product_id;
      state.rate.user_id_2 = user_id_2;
      state.rate.type = type;
    },
    setCategory: (state, action) => {
      const { name, category_id } = action.payload;
      state.category.category_id = category_id;
      state.category.name = name;
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setUpdateProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
