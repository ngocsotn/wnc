import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// lấy danh sách danh mục con theo id danh mục cha
export const subCategoryGetByPage = createAsyncThunk(
  'category/categoryGetSub',
  async ({ limit, page, category_id }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.get(
          `/sub-category?limit=${limit}&page=${page}&category_id=${category_id}`
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

export const categoryAddSub = createAsyncThunk(
  'category/categoryAddSub',
  async ({ category_id, name }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/sub-category`, { category_id, name })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);
export const categoryUpdateSub = createAsyncThunk(
  'category/categoryUpdateSub',
  async ({ name, sub_category_id, category_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/sub-category`, { name, sub_category_id, category_id }))
        .data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
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
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const categoryGetByPage = createAsyncThunk(
  'category/categoryGetByPage',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/category?limit=${limit}&page=${page}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const subCategorySlice = createSlice({
  name: 'subCategorySlice',
  initialState: {
    allData: [],
    count: 0,
    data: [],
    page: 0,
    total_page: 0,
  },
  reducers: {
    removeCategoryById: (state, action) => {
      state.data = state.data.filter((item) => item.category_id !== action.payload);
    },
  },
  extraReducers: {
    [subCategoryGetByPage.fulfilled]: (state, action) => {
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
    },
		[categoryGetByPage.pending]: (state) => {},
		[categoryGetByPage.fulfilled] :(state, action) => {
      state.allData = action.payload.data;
    },
  },
});

export const subCategoryActions = subCategorySlice.actions;
export default subCategorySlice;
