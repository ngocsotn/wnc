import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// api dùng cho tìm toàn bộ sản phẩm theo từ khóa, danh mục
// is_self dành cho seller, truyền 1 nếu chỉ muốn lấy toàn bộ sản phẩm thuộc về mình (phải kèm token trong header)
// is_expire truyền 1 để lấy sản phẩm hết hạn, truyền 0 để lấy sản phẩm chưa hết hạn (mặc định là null trả ra hết)
// status có on và off, off là sản phẩm đã kết thúc cuộc đấu giá (null là lấy hết)
export const sellerGetProductGetByPage = createAsyncThunk(
  'sellerGetProduct/sellerGetProductGetByPage',
  async (
    { sub_category_id, order_by, order_type, limit, page, is_self, is_expire, status },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.get(
          `/product?sub_category_id=${sub_category_id}&order_by=${order_by}&order_type=${order_type}&limit=${limit}&page=${page}&is_self=${is_self}&is_expire=${is_expire}&status=${status}`
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

const sellerSlice = createSlice({
  name: 'sellerSlice',
  initialState: {
    count: 0,
    data: [],
    page: 0,
    total_page: 0,
    loading: false,
    getLoading: false,
  },
  reducers: {},
  extraReducers: {
    [sellerGetProductGetByPage.pending]: (state) => {
      state.loading = true;
    },
    [sellerGetProductGetByPage.rejected]: (state) => {
      state.loading = false;
    },
    [sellerGetProductGetByPage.fulfilled]: (state, action) => {
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
      state.loading = false;
    },
  },
});

export const sellerActions = sellerSlice.actions;
export default sellerSlice;
