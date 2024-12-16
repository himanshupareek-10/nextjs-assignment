import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchApi } from '@/lib/api';
import type { ImageSearchResult } from '@/types/image-search';

interface ImageSearchState {
  results: ImageSearchResult[];
  loading: boolean;
  error: string | null;
  selectedImage: string | null;
}

const initialState: ImageSearchState = {
  results: [],
  loading: false,
  error: null,
  selectedImage: null,
};

export const searchByImage = createAsyncThunk(
  'imageSearch/searchByImage',
  async (formData: FormData) => {
    const response = await searchApi.searchImages(formData);
    return response;
  }
);

const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    },
    clearImageResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchByImage.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchByImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search by image';
      });
  },
});

export const { setSelectedImage, clearImageResults } = imageSearchSlice.actions;
export default imageSearchSlice.reducer;