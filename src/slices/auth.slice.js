import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { decodeJwt } from '../utils/jwt';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post('/auth/login', {
          email,
          password,
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
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, name, password, address, birth }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post('/auth/register', {
          email,
          name,
          password,
          address,
          birth: birth,
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

export const sendConfirmEmail = createAsyncThunk(
  'auth/sendConfirmEmail',
  async (_, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/auth/send-confirmation-email')).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async ({ code }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/auth/verify?code=${code}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/auth/forgot', { email })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const recovery = createAsyncThunk(
  'auth/recovery',
  async ({ code, password }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/auth/recovery', { code, password })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  access_token: null,
  refresh_token: null,
};

const initReducer = (state) => {
  state.isLoading = true;
  state.isAuthenticated = false;
  state.user = {};
  state.access_token = null;
  state.refresh_token = null;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const authSuccess = (state, action) => {
  const { access_token, refresh_token } = action.payload;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.access_token = access_token;
  state.refresh_token = refresh_token;
  state.user = decodeJwt(access_token);

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    verifiedAuth: authSuccess,
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.access_token = null;
      state.refresh_token = null;
      state.user = {};
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: {
    [login.pending]: initReducer,
    [login.rejected]: (state) => {
      state.isLoading = false;
    },
    [login.fulfilled]: authSuccess,
    [register.pending]: initReducer,
    [register.rejected]: (state) => {
      state.isLoading = false;
    },
    [register.fulfilled]: authSuccess,
    [confirmEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [confirmEmail.rejected]: (state) => {
      state.isLoading = false;
    },
    [confirmEmail.fulfilled]: authSuccess,
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.rejected]: (state) => {
      state.isLoading = false;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [recovery.pending]: (state) => {
      state.isLoading = true;
    },
    [recovery.rejected]: (state) => {
      state.isLoading = false;
    },
    [recovery.fulfilled]: authSuccess,
  },
});

export const authActions = authSlice.actions;
export default authSlice;
