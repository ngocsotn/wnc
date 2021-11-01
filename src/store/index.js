import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '../slices/ui.slice';
import profileSlice from '../slices/profile.slice';
import authSlice from '../slices/auth.slice';
import categorySlice from '../slices/category.slice';
import productSlice from '../slices/product.slice';
export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
  },
});
