import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
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
  },
  reducers: {
    openModal: (state, action) => {
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
      state.openDelete = false;
      state[action.payload] = true;
    },
    closeModal: (state) => {
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
      state.openDelete = false;
      state.delete.type = null;
      state.delete.id = null;
    },
    setDelete: (state, action) => {
      state.delete.type = action.payload.type;
      state.delete.id = action.payload.id;
    },
    setRate: (state, action) => {
      const { product_id, user_id_2, type } = action.payload;
      state.rate.product_id = product_id;
      state.rate.user_id_2 = user_id_2;
      state.rate.type = type;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
