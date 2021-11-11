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
      return (await axiosInstance.put(`/profile`, { name, email, address, birth })).data;
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
      return (await axiosInstance.put(`/profile`, { password, new_password })).data;
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
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [profileGet.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [profileUpdateInfo.pending]: (state) => {
      state.loading = true;
    },
    [profileUpdateInfo.rejected]: (state) => {
      state.loading = false;
    },
    [profileUpdateInfo.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [profileUpdatePassword.pending]: (state) => {
      state.loading = true;
    },
    [profileUpdatePassword.rejected]: (state) => {
      state.loading = false;
    },
    [profileUpdatePassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
