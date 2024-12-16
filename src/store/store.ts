import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import imageSearchReducer from './slices/imageSearchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    imageSearch: imageSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;