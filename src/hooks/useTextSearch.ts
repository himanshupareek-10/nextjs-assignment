import { useCallback } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setQuery, fetchSearchResults, fetchSuggestions } from '@/store/slices/searchSlice';

export function useTextSearch() {
  const dispatch = useAppDispatch();
  
  const { 
    query, 
    results, 
    suggestions, 
    loading, 
    error 
  } = useAppSelector((state) => state.search);

  const handleSearch = useCallback(async (searchQuery: string) => {
    try {
      await dispatch(fetchSearchResults(searchQuery));
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [dispatch]);

  const handleQueryChange = useCallback((newQuery: string) => {
    dispatch(setQuery(newQuery));
    if (newQuery.trim()) {
      dispatch(fetchSuggestions(newQuery));
    }
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(setQuery(''));
  }, [dispatch]);

  return {
    query,
    results,
    suggestions,
    loading,
    error,
    handleSearch,
    handleQueryChange,
    clearSearch
  };
}