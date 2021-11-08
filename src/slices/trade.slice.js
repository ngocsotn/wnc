import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';


// BIDDER
// BIDDER XEM LỊCH SỬ GIAO DỊCH của mình, oder_type = DESC/ASC
export const tradeSelfBidderPaging = createAsyncThunk(
  'trade/bidder',
  async ({ page, limit, status, oder_type }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/trade/bidder?page=${page}&limit=${limit}&order_type=${oder_type}&status=${status}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

// SELLER
// SELLER XEM LỊCH SỬ GIAO DỊCH CỦA MÌNH, oder_type = DESC/ASC
export const tradeSelSellerPaging = createAsyncThunk(
  'trade/seller',
  async ({ page, limit, status, oder_type }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/trade/seller?page=${page}&limit=${limit}&order_type=${oder_type}&status=${status}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);


// SELLER TỪ CHỐI GIAO DỊCH HOẶC ĐỒNG Ý
// KHI Hết thời gian đấu giá, hệ thống sẽ tự tạo trade ở trạng thái đang pending
// KHI ĐỒNG Ý THÌ SẼ ACCEPT TRADE, SYSTEM TỰ RATE +1  USER, KÈM BÌNH LUẬN
// KHI TỪ CHỐI SẼ DENY TRADE, SYSTEM TỰ -1 RATE BIDDER, KÈM BÌNH LUẬN
export const tradeAcceptOrDeny = createAsyncThunk(
  'trade/update',
  async ({ bidder_id, product_id, status, comment }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.put(`/trade/seller`,{
				bidder_id,
				product_id,
				status,
				comment
			})).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errs?.join(' - '));
    }
  }
);

const tradeSlice = createSlice({
  name: 'productSlice',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const tradeActions = tradeSlice.actions;
export default tradeSlice;
