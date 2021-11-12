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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
