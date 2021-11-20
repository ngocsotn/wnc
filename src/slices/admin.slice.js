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
  async ({ user_id, birth, name, address, email }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.put(`/user`, {
          user_id,
          birth,
          name,
          address,
          email,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const adminBlockUser = createAsyncThunk(
  'user/block',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/user/block`, {
        user_id,
      });
      return { user_id };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);
export const adminResetPasswordUser = createAsyncThunk(
  'user/resetPassword',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/user/password`, {
        user_id,
      });
      return { user_id };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: { count: 0, data: [], page: 0, total_page: 0, loading: false },
  reducers: {},
  extraReducers: {
    [adminGetAllUser.pending]: (state) => {
      state.loading = true;
    },
    [adminGetAllUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [adminGetAllUser.fulfilled]: (state, action) => {
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
      state.loading = false;
    },

    [adminBlockUser.fulfilled]: (state, action) => {
      const { user_id } = action.payload;
      state.data = state.data.map((item) =>
        item.id === user_id ? { ...item, status: 'block' } : item
      );
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
