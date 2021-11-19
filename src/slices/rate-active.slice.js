import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

//tự xem ds mình đã chủ động đánh giá
export const rateSelfActivePaging = createAsyncThunk(
  'rate-active/get',
  async ({ page, limit, oder_type }, { rejectWithValue }) => {
    try {
      // &order_type=${oder_type}&order_by=${order_by}
      return (await axiosInstance.get(`/rate-active?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const rateActiveSlice = createSlice({
  name: 'rateActiveSlice',
  initialState: {
    count: 0,
    data: [],
    page: 1,
    total_page: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: {
		[rateSelfActivePaging.pending]: (state) => {
      state.loading = true;
    },
    [rateSelfActivePaging.rejected]: (state) => {
      state.loading = false;
    },
    [rateSelfActivePaging.fulfilled]: (state, action) => {
      state.loading = false;
      const { count, data, page, total_page } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
    },
  },
});

export const rateActiveActions = rateActiveSlice.actions;
export default rateActiveSlice;
