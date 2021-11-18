import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const getAuctionWon = createAsyncThunk(
  'getAuctionWon/get',
  async ({ page, limit, status = 'win', oder_type }, { rejectWithValue }) => {
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

const auctionWonSlice = createSlice({
  name: 'auctionWonSlice',
  initialState: { count: 0, data: [], page: 0, total_page: 0, loading: false },
  reducers: {},
  extraReducers: {
    [getAuctionWon.pending]: (state) => {
      state.loading = true;
    },
    [getAuctionWon.fulfilled]: (state, action) => {
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
      state.loading = false;
    },
    [getAuctionWon.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const auctionWonActions = auctionWonSlice.actions;
export default auctionWonSlice;
