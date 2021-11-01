import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const productGetByPage = createAsyncThunk(
  'product/productGetByPage',
  async ({ sub_category_id, order_by, order_type, keyword, limit, page }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.get(
          `/product?sub_category_id=${sub_category_id}& order_by=${order_by}& order_type=${order_type}& keyword=${keyword}& limit=${limit}& page=${page}`
        )
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productAddImage = createAsyncThunk(
  'product/productAddImage',
  async (formData, { rejectWithValue }) => {
    //formData: image, product_id
    try {
      return (
        await axiosInstance.post(`/product`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productAddNew = createAsyncThunk(
  'product/productAddNew',
  async (
    { sub_category_id, name, auto_extend, detail, start_price, step_price, buy_price, expire_at },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.post(`/product`, {
          sub_category_id,
          name,
          auto_extend,
          detail,
          start_price,
          step_price,
          buy_price,
          expire_at,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const productDeleteImage = createAsyncThunk(
  'product/productDeleteImage',
  async ({ cloud_id_array }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/delete-many`, {
          cloud_id_array,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productUpdate = createAsyncThunk(
  'product/productUpdate',
  async ({ product_id, detail }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/product`, { product_id, detail })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productDelete = createAsyncThunk(
  'product/productDelete',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/product/${product_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const productActions = productSlice.actions;
export default productSlice;
