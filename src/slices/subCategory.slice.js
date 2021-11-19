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
      await axiosInstance.put(`/sub-category`, { name, sub_category_id, category_id });

      return { name, sub_category_id, category_id };
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
      await axiosInstance.delete(`/sub-category/${sub_category_id}`);
      return { sub_category_id };
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
    requesting: false,
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
    [categoryGetByPage.fulfilled]: (state, action) => {
      state.allData = action.payload.data;
    },

    [categoryAddSub.pending]: (state) => {
      state.requesting = true;
    },
    [categoryDeleteSub.pending]: (state) => {
      state.requesting = true;
    },
    [categoryUpdateSub.pending]: (state) => {
      state.requesting = true;
    },
    [categoryAddSub.rejected]: (state) => {
      state.requesting = false;
    },
    [categoryDeleteSub.rejected]: (state) => {
      state.requesting = false;
    },
    [categoryUpdateSub.rejected]: (state) => {
      state.requesting = false;
    },

    [categoryAddSub.fulfilled]: (state, action) => {
      state.requesting = false;
    },
    [categoryDeleteSub.fulfilled]: (state, action) => {
      state.requesting = false;
      const { sub_category_id } = action.payload;
      state.data = state.data.filter((item) => item.sub_category_id !== sub_category_id);
    },

    [categoryUpdateSub.fulfilled]: (state, action) => {
      state.requesting = false;
      const { name, sub_category_id, category_id } = action.payload;
      state.data = state.data.map((item) =>
        item.category_id === category_id && item.sub_category_id === sub_category_id
          ? { ...item, name: name }
          : item
      );
    },
  },
});

export const subCategoryActions = subCategorySlice.actions;
export default subCategorySlice;
