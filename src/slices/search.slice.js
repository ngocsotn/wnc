import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const searchProductByPage = createAsyncThunk(
  'product/searchProductByPage',
  async (
    { sub_category_id, order_by, order_type, keyword, limit, page, is_self, is_expire, status },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.get(
          `/product?sub_category_id=${sub_category_id}&order_by=${order_by}&order_type=${order_type}&keyword=${keyword}&limit=${limit}&page=${page}&is_self=${is_self}&is_expire=${is_expire}&status=${status}`
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

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    loading: false,
    type: 'name',
    query: '',
    order_by: 'expire_at',
    order_type: 'ASC',
    sub_category_id: '',
    status: 'on',

    count: 0,
    data: [],
    page: 0,
    total_page: 0,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload.query;
      state.type = action.payload.type;
      state.order_by = action.payload.order_by;
      state.order_type = action.payload.order_type;
      state.sub_category_id = action.payload.sub_category_id;
      state.status = action.payload.status;
    },
    typeChange: (state, action) => {
      state.type = action.payload.type;
    },
  },
  extraReducers: {
    [searchProductByPage.pending]: (state) => {
      state.loading = true;
    },
    [searchProductByPage.rejected]: (state) => {
      state.loading = false;
    },
    [searchProductByPage.fulfilled]: (state, action) => {
      state.loading = false;
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice;
