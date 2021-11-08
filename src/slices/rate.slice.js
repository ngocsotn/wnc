import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// public
// xem lịch sử đánh giá 1 user nào đó
export const rateUserPaging = createAsyncThunk(
  'rate/user',
  async ({ page, limit, order_by, oder_type, user_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/rate/${user_id}?page=${page}&limit=${limit}&order_type=${oder_type}&order_by=${order_by}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// logged user
// user tự xem ds mình được đánh giá, order_by = create_at hoặc id
export const rateSelfPaging = createAsyncThunk(
  'rate/get',
  async ({ page, limit, order_by ,oder_type }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/rate?page=${page}&limit=${limit}&order_type=${oder_type}&order_by=${order_by}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// bidder ONLY
// Khi đấu giá kết thúc, bidder thắng cuộc có thể đánh giá seller
// user_id_2 là user_id của seller, comment có thể '', point =-1 hoặc 1
export const rateCreateNew = createAsyncThunk(
  'rate/post',
  async ({ product_id, user_id_2, comment, point }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/rate`,{
				product_id,
				user_id_2,
				comment,
				point
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);


const rateSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const rateActions = rateSlice.actions;
export default rateSlice;
