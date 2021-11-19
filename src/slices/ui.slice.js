import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',

  initialState: {
    openAddSubCategory: false,
    openUpdateSubCategory: false,
    openCategory: false,
    openSellerAccept: false,
    openSellerDeny: false,
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

    subCategory: {
      name: null,
      category_id: null,
      sub_category_id: null,
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

    seller: {
      type: null,
      product_id: null,
      bidder_id: null,
    },
  },
  reducers: {
    setCategoryModal: (state, action) => {
      state.openCategory = action.payload;
    },
    openModal: (state, action) => {
      state.openAddSubCategory = false;
      state.openUpdateSubCategory = false;
      state.openSellerAccept = false;
      state.openSellerDeny = false;
      state.openConfirm = false;
      state.openCategory = false;
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
      state.openAddSubCategory = false;
      state.openUpdateSubCategory = false;
      state.openCategory = false;
      state.openSellerAccept = false;
      state.openSellerDeny = false;
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
    setSubCategory: (state, action) => {
      const { name, category_id, sub_category_id } = action.payload;
      state.subCategory.category_id = category_id;
      state.subCategory.name = name;
      state.subCategory.sub_category_id = sub_category_id;
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setUpdateProduct: (state, action) => {
      state.product = action.payload;
    },
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
