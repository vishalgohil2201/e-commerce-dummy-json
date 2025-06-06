import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

export const store = configureStore({
  reducer: {
    dataSlice: slice,
  },
  devTools: true,
});
