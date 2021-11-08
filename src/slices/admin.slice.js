import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// admin
// admin lấy danh sách user
export const adminGetAllUser = createAsyncThunk(
  'user/all',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/user?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

//admin lấy thông tin chi tiết 1 user
export const adminGetUserDetail = createAsyncThunk(
  'user/detail',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/user/${user_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// admin update vài thông tin cơ bản của user nào đó
export const adminUpdateUser = createAsyncThunk(
  'user/update',
  async ({ user_id, birth, name, address, email}, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/user`, {
				user_id,
				birth,
				name,
				address,
				email
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const adminSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const adminActions = adminSlice.actions;
export default adminSlice;
