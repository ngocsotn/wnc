import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// logged user
// user tự xem lịch sử tham gia đấu giá các sản phẩm đã kết thúc
// status = lose/win/denied/cancel. oder_type =DESC/ASC (mặc định là DESC)
// denied là bị seller block lúc bid, cancel là bị seller hủy giao dịch
export const historySelfPaging = createAsyncThunk(
  'history/get',
  async ({ page, limit, status, oder_type }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.get(
          `/history?page=${page}&limit=${limit}&order_type=${oder_type}&status=${status}`
        )
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const historySlice = createSlice({
  name: 'historySlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const historyActions = historySlice.actions;
export default historySlice;
