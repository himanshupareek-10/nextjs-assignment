import { useAppSelector } from '@/hooks/useAppSelector';
import Image from 'next/image';

interface ImageResult {
  id: string;
  url: string;
  title: string;
  source: string;
  dimensions: {
    width: number;
    height: number;
  };
}

function ImageCard({ result }: { result: ImageResult }) {
  return (
    <div className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-w-1 aspect-h-1">
        <Image
          src={result.url}
          alt={result.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
        <h3 className="text-white text-sm font-medium truncate">
          {result.title}
        </h3>
        <p className="text-white/80 text-xs mt-1">{result.source}</p>
        <p className="text-white/60 text-xs">
          {result.dimensions.width} × {result.dimensions.height}
        </p>
      </div>
    </div>
  );
}

export function SearchResults(): JSX.Element {
  const { results, loading } = useAppSelector((state) => state.imageSearch);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((result) => (
        <ImageCard key={result.id} result={result} />
      ))}
    </div>
  );
}