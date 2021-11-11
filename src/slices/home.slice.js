import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// PUBLIC
// trả ra 3 mảng, mỗi mảng 0~5 sản phẩm
// sắp hết thời gian, giá cao nhất hiện tại, nhiều lượt bid nhất
export const homeSelfPaging = createAsyncThunk('home/get', async (_, { rejectWithValue }) => {
  try {
    return (await axiosInstance.get(`/home`)).data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data.errs?.join(' - '));
  }
});

const homeSlice = createSlice({
  name: 'productSlice',
  initialState: {
    bid_count: [],
    expire: [],
    price: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [homeSelfPaging.pending]: (state) => {
      state.loading = true;
    },
    [homeSelfPaging.rejected]: (state) => {
      state.loading = false;
    },
    [homeSelfPaging.fulfilled]: (state, action) => {
      state.loading = false;
      const { bid_count, expire, price } = action.payload;
      state.bid_count = bid_count;
      state.expire = expire;
      state.price = price;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice;
