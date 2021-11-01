import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const categoryGetByPage = createAsyncThunk(
  'category/categoryGetByPage',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/category?limit=${limit}&page=${page}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const categoryUpdate = createAsyncThunk(
  'category/categoryUpdate',
  async ({ name, category_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/category`, { name, category_id })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const categoryAddNew = createAsyncThunk(
  'category/categoryAddNew',
  async ({ name }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/category`, { name })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const categoryDelete = createAsyncThunk(
  'category/categoryDelete',
  async ({ category_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/category/${category_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const categoryAddSub = createAsyncThunk(
  'category/categoryAddSub',
  async ({ category_id, name }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/sub-category`, { category_id, name })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const categoryUpdateSub = createAsyncThunk(
  'category/categoryUpdateSub',
  async ({ name, sub_category_id, category_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/category`, { name, sub_category_id, category_id })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const categoryDeleteSub = createAsyncThunk(
  'category/categoryDeleteSub',
  async ({ sub_category_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/sub-category/${sub_category_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
