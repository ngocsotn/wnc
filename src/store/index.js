import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '../slices/ui.slice';
import profileSlice from '../slices/profile.slice';
import authSlice from '../slices/auth.slice';
import categorySlice from '../slices/category.slice';
import subCategorySlice from '../slices/subCategory.slice';
import productSlice from '../slices/product.slice';
import homeSlice from '../slices/home.slice';
import favoriteSlice from '../slices/favorite.slice';
import rateSlice from '../slices/rate.slice';
import bidSlice from '../slices/bid.slice';
import auctionWonSlice from '../slices/auction-won.slice';
import requestSlice from '../slices/requests.slice';
export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subCategorySlice.reducer,
    product: productSlice.reducer,
    home: homeSlice.reducer,
    favorite: favoriteSlice.reducer,
    rate: rateSlice.reducer,
    bid: bidSlice.reducer,
    auctionWon: auctionWonSlice.reducer,
    request: requestSlice.reducer,
  },
});
