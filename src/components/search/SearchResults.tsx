import { useTextSearch } from '@/hooks/useTextSearch';

export function SearchResults() {
    const { results } = useTextSearch();
  
    return (
      <div className="space-y-8">
        {results.map((result) => (
          <div key={result.id} className="max-w-2xl">
            <div className="text-sm text-gray-600 mb-1">
              {result.link}
            </div>
            <h3 className="text-xl mb-2">
              <a 
                href={result.link}
                className="text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </a>
            </h3>
            <p className="text-sm text-gray-600">
              {result.description}
            </p>
          </div>
        ))}
      </div>
    );
}