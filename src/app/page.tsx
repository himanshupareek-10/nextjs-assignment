'use client';

import Image from 'next/image';
import { TextSearchBar } from '@/components/search/TextSearchBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 -mt-20">
        <div className="text-center">
          <Image
            src="/images/google-logo.png"
            alt="Google"
            width={272}
            height={92}
            priority
            className="mb-8"
          />
          
          <TextSearchBar />
          
          <div className="mt-8 space-x-3">
            <button 
              className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded"
              onClick={() => router.push('/search')}
            >
              Google Search
            </button>
            <button 
              className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded"
              onClick={() => router.push('/search?lucky=true')}
            >
              I'm Feeling Lucky
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}