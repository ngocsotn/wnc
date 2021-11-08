import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// bidder
// người dùng xem mình đã gửi request chưa, trả về 204 tức là chưa gửi
// hoặc đẵ hết hạn, có thể render nút gửi để gửi tiếp bằng api postCreate
export const requestGetSelfStatus = createAsyncThunk(
  'request/get',
  async ({ }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// tạo request kèm tin nhắn lý do xin lên seller
export const requestCreateNew = createAsyncThunk(
  'request/post',
  async ({ message }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/request/`, {
				message:message
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// admin
// admin lấy danh sách request của những người xin lên seller
export const requestAdminGetAll = createAsyncThunk(
  'request/all',
  async ({ page, limit , order_by, order_type, status }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/admin?page=${page}&limit=${limit}&order_by=${order_by}&order_type=${order_type}&status=${status}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// mỗi người chỉ có 1 request duy nhất
// để lấy thông tin chi tiết request 1 người xài api này
export const requestAdminGetDetail = createAsyncThunk(
  'request/detail',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/request/admin/${user_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// admin duyệt request hoặc từ chối request
export const requestAdminUpdateStatus = createAsyncThunk(
  'request/update',
  async ({ user_id, status}, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/request/admin/`, {
				user_id,
				status
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const requestSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const requestActions = requestSlice.actions;
export default requestSlice;
