import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const searchApi = {
  getSearchResults: async (query: string, page = 1) => {
    const response = await api.get('/search', { params: { q: query, page } });
    return response.data;
  },

  getSuggestions: async (query: string) => {
    const response = await api.get('/suggestions', { params: { q: query } });
    return response.data;
  },

  searchImages: async (imageData: FormData) => {
    const response = await api.post('/image-search', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};