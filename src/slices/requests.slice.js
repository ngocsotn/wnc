import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// bidder
export const requestGetSelfStatus = createAsyncThunk(
  'request/',
  async ({ }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const requestCreateNew = createAsyncThunk(
  'request/',
  async ({ message }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/request/`, {
				message:message
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// admin
export const requestAdminGetAll = createAsyncThunk(
  'request/',
  async ({ page, limit , order_by, order_type, status }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/admin?page=${page}&limit=${limit}&order_by=${order_by}&order_type=${order_type}&status=${status}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const requestAdminGetDetail = createAsyncThunk(
  'request/',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/admin/${user_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const requestAdminUpdateStatus = createAsyncThunk(
  'request/',
  async ({ user_id, status}, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/request/admin/`), {
				user_id,
				status
			}).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const requestSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const requestActions = requestSlice.actions;
export default requestSlice;
