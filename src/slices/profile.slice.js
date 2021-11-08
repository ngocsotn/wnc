import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// export const updateStatus = createAsyncThunk(
//   'profile/updateStatus',
//   async ({ id, banned }, { rejectWithValue }) => {
//     console.log(id, banned);
//     try {
//       return (await axiosInstance.patch(`/profiles/${id}`, { banned })).data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data.errs?.join(" - "));
//     }
//   }
// );

// export const getAll = createAsyncThunk(
//   'profile/getAll',
//   async ({ page, limit }, { rejectWithValue }) => {
//     try {
//       return (await axiosInstance.get(`/profiles?page=${page}&limit=${limit}`)).data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data.errs?.join(" - "));
//     }
//   }
// );

export const profileGet = createAsyncThunk('profile/get', async (_, { rejectWithValue }) => {
  try {
    return (await axiosInstance.get(`/profile`)).data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data.errs?.join(' - '));
  }
});

export const profileUpdateInfo = createAsyncThunk(
  'profile/profileUpdateInfo',
  async ({ name, email, address, birth }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/profile`, { name, email, address, birth })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const profileUpdatePassword = createAsyncThunk(
  'profile/profileUpdatePassword',
  async ({ password, new_password }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/profile`, { password, new_password })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const profileActions = profileSlice.actions;
export default profileSlice;
