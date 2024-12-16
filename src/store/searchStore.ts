import { create } from 'zustand';
import { SearchResult, SearchSuggestion } from '@/types/search';

interface SearchStore {
  query: string;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  loading: boolean;
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setSuggestions: (suggestions: SearchSuggestion[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  results: [],
  suggestions: [],
  loading: false,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setLoading: (loading) => set({ loading })
}));