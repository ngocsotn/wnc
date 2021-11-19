import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// public
// xem lịch sử đánh giá 1 user nào đó
export const viewRateUserPaging = createAsyncThunk(
  'rate/rateUserPaging',
  async ({ page, limit, order_by, oder_type, user_id }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.get(
          `/rate/${user_id}?page=${page}&limit=${limit}&order_type=${oder_type}&order_by=${order_by}`
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

const viewRate = createSlice({
  name: 'viewRate',
  initialState: {
    count: 0,
    data: [],
    page: 1,
    total_page: 0,
    loading: false,
    user: {},
  },
  reducers: {},
  extraReducers: {
    [viewRateUserPaging.pending]: (state) => {
      state.loading = true;
    },
    [viewRateUserPaging.rejected]: (state) => {
      state.loading = false;
    },
    [viewRateUserPaging.fulfilled]: (state, action) => {
      state.loading = false;
      const { count, data, page, total_page, user } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
      state.user = user;
    },
  },
});

export const rateActions = viewRate.actions;
export default viewRate;
