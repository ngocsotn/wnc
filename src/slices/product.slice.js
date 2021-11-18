import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const productGetById = createAsyncThunk(
  'product/productGetById',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/product/${id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// api dùng cho tìm toàn bộ sản phẩm theo từ khóa, danh mục
// is_self dành cho seller, truyền 1 nếu chỉ muốn lấy toàn bộ sản phẩm thuộc về mình (phải kèm token trong header)
// is_expire truyền 1 để lấy sản phẩm hết hạn, truyền 0 để lấy sản phẩm chưa hết hạn (mặc định là null trả ra hết)
// status có on và off, off là sản phẩm đã kết thúc cuộc đấu giá (null là lấy hết)
export const productGetByPage = createAsyncThunk(
  'product/productGetByPage',
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

export const productAddImage = createAsyncThunk(
  'product/productAddImage',
  async (formData, { rejectWithValue }) => {
    //formData: image, product_id
    try {
      return (
        await axiosInstance.post(`/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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

export const productAddNew = createAsyncThunk(
  'product/productAddNew',
  async (
    { sub_category_id, name, auto_extend, detail, start_price, step_price, buy_price, expire_at },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.post(`/product`, {
          sub_category_id,
          name,
          auto_extend,
          detail,
          start_price,
          step_price,
          buy_price,
          expire_at,
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
export const productDeleteImage = createAsyncThunk(
  'product/productDeleteImage',
  async ({ cloud_id_array }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/delete-many`, {
          cloud_id_array,
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

export const productUpdate = createAsyncThunk(
  'product/productUpdate',
  async ({ product_id, detail }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/product`, { product_id, detail })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

export const productDelete = createAsyncThunk(
  'product/productDelete',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/product/${product_id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    allData: [],
    count: 0,
    data: [],
    page: 0,
    total_page: 0,
    loading: false,
    getLoading: false,
  },
  reducers: {
    removeProductById: (state, action) => {
      state.data = state.data.filter((item) => item.product_id !== action.payload);
    },
  },
  extraReducers: {
    [productGetByPage.pending]: (state) => {
      state.loading = true;
    },
    [productGetByPage.rejected]: (state) => {
      state.loading = false;
    },
    [productGetByPage.fulfilled]: (state, action) => {
      const { count, page, total_page, data } = action.payload;
      state.count = count;
      state.data = data;
      state.page = page;
      state.total_page = total_page;
      state.loading = false;
    },
    [productAddNew.pending]: (state) => {
      state.loading = true;
    },
    [productAddNew.rejected]: (state) => {
      state.loading = false;
    },
    [productAddNew.fulfilled]: (state) => {
      state.loading = false;
    },
    [productAddImage.pending]: (state) => {
      state.loading = true;
    },
    [productAddImage.rejected]: (state) => {
      state.loading = false;
    },
    [productAddImage.fulfilled]: (state) => {
      state.loading = false;
    },
    [productGetById.pending]: (state) => {
      state.getLoading = true;
    },
    [productGetById.rejected]: (state) => {
      state.getLoading = false;
    },
    [productGetById.fulfilled]: (state) => {
      state.getLoading = false;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
