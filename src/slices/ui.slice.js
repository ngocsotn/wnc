import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    openAdd: false,
    openUpdate: false,
    openRate: false,
    openReview: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
      state[action.payload] = true;
    },
    closeModal: (state) => {
      state.openAdd = false;
      state.openUpdate = false;
      state.openRate = false;
      state.openReview = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
