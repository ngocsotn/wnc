import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// logged user
// user tự xem ds yêu thích mình, có phân trang, order_type = DESC/ASC
export const favoriteSelfPaging = createAsyncThunk(
  'favorite/get',
  async ({ page, limit, oder_type }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/favorite?page=${page}&limit=${limit}&order_type=${oder_type}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// user tự thêm sản phẩm mới vào yêu thích, nếu đã thêm sẽ trả lỗi
export const favoriteCreateNew = createAsyncThunk(
  'favorite/post',
  async ({ product_id}, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/favorite`, {
				product_id
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);


// user xóa 1 sản phẩm khỏi yêu thích của mình
export const favoriteDelete = createAsyncThunk(
  'favorite/delete',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/favorite/${product_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const favoriteSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const favoriteActions = favoriteSlice.actions;
export default favoriteSlice;
