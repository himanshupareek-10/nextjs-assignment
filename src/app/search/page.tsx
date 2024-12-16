'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TextSearchBar } from '@/components/search/TextSearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { useTextSearch } from '@/hooks/useTextSearch';
import { Header } from '@/components/common/Header';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { handleSearch, loading, error, results } = useTextSearch();

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query, handleSearch]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <TextSearchBar />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-8">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-4">
              About {results.length} results
            </div>
            <SearchResults />
          </>
        )}
      </main>
    </div>
  );
}