import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// public
export const postReCaptcha = createAsyncThunk(
  'recaptcha/post',
  async ({ response }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/recaptcha`, {
          response,
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

const recaptchaSlice = createSlice({
  name: 'recaptchaSlice',
  initialState: {
    success: true,
  },
  reducers: {},
  extraReducers: {
    [postReCaptcha.fulfilled]: (state, action) => {
      const { success } = action.payload;
      state.success = success;
    },
  },
});

export const recaptchaActions = recaptchaSlice.actions;
export default recaptchaSlice;
