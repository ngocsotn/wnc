import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '../slices/ui.slice';
import userSlice from '../slices/user.slice';
export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
  },
});
