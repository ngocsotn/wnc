import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '../slices/ui.slice';
export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});
