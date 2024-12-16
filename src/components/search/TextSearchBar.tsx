'use client';

import { useState, useCallback, FormEvent } from 'react';
import { MagnifyingGlassIcon, MicrophoneIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { setQuery, fetchSearchResults, fetchSuggestions } from '@/store/slices/searchSlice';

export function TextSearchBar(): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const { query, loading } = useAppSelector((state) => ({
    query: state.search.query,
    loading: state.search.loading
  }));
  const debouncedQuery = useDebounce(query, 300);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
    if (newQuery.trim()) {
      dispatch(fetchSuggestions(newQuery));
    }
  }, [dispatch]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
    }
  }, [query, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div
          className={`flex items-center w-full border rounded-full hover:shadow-md ${
            isFocused ? 'shadow-md border-transparent' : ''
          }`}
        >
          <MagnifyingGlassIcon className="h-5 w-5 ml-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow px-4 py-3 focus:outline-none"
            placeholder="Search Google or type a URL"
          />
          <div className="flex items-center space-x-2 mr-4">
            <MicrophoneIcon className="h-5 w-5 text-google-blue cursor-pointer" />
            <CameraIcon className="h-5 w-5 text-google-blue cursor-pointer" />
          </div>
        </div>
      </div>
    </form>
  );
}