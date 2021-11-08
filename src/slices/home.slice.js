import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// PUBLIC
// trả ra 3 mảng, mỗi mảng 0~5 sản phẩm
// sắp hết thời gian, giá cao nhất hiện tại, nhiều lượt bid nhất
export const homeSelfPaging = createAsyncThunk(
  'home/get',
  async ({ }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/home`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const homeSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const homeActions = homeSlice.actions;
export default homeSlice;
