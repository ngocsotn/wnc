import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// public
// xem lịch sử bid của 1 sản phẩm nào đó, trả mặc định theo mới nhất trước
export const bidHistoryPaging = createAsyncThunk(
  'bid/history',
  async ({ page, limit, product_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/bid/history/${product_id}?page=${page}&limit=${limit}`))
        .data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// BIDDER
// BIDDER XEM LỊCH SỬ CÁC SẢN PHẨM ĐÃ THAM GIA BẢN THÂN
export const bidSelfHistory = createAsyncThunk(
  'bid/history',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/bid/self?page=${page}&limit=${limit}`))
        .data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// BIDDER BID 1 sản phầm nào đó
export const bidBidProduct = createAsyncThunk(
  'bid/bid',
  async ({ product_id, price }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/bid`, {
          product_id,
          price,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// BIDDER MUA NGAY 1 SẢN PHẨM NÀO ĐÓ
export const bidBuyProduct = createAsyncThunk(
  'bid/buy',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/bid/buy`, {
          product_id,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// SELLER ONLY
// SELLER BLOCK 1 BIDDER NÀO ĐÓ
export const bidBlockUser = createAsyncThunk(
  'bid/block',
  async ({ product_id, user_id }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/bid/block`, {
          product_id,
          user_id,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const bidSlice = createSlice({
  name: 'bidSlice',
  initialState: {
    count: 0,
    data: [],
    page: 1,
    total_page: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [bidHistoryPaging.pending]: (state) => {
      state.loading = true;
    },
    [bidHistoryPaging.rejected]: (state) => {
      state.loading = false;
    },
    [bidHistoryPaging.fulfilled]: (state, action) => {
      state.loading = false;
      const { count, data, page, total_page } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
    },
  },
});

export const bidActions = bidSlice.actions;
export default bidSlice;
