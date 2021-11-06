import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// admin
export const getAllUser = createAsyncThunk(
  'user/',
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

export const getUserDetail = createAsyncThunk(
  'user/',
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

export const updateUser = createAsyncThunk(
  'user/',
  async ({ user_id, birth, name, address, email}, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/user/`), {
				user_id,
				birth,
				name,
				address,
				email
			}).data;
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
