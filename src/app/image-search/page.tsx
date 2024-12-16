'use client';
import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { ImageUploader } from '@/components/image-search/ImageUploader';
import { ImageCropper } from '@/components/image-search/ImageCropper';
import { SearchResults } from '@/components/image-search/SearchResults';
import { useImageSearch } from '@/hooks/useImageSearch';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function ImageSearchPage() {
  const [showCropper, setShowCropper] = useState(false);
  const selectedImage = useAppSelector(state => state.imageSearch.selectedImage);
  const { searchByImage, error } = useImageSearch();

  const handleCropComplete = async (croppedImage: Blob) => {
    setShowCropper(false);
    await searchByImage(croppedImage);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!selectedImage && <ImageUploader />}
          {selectedImage && showCropper && (
            <ImageCropper onCropComplete={handleCropComplete} />
          )}
          {selectedImage && !showCropper && <SearchResults />}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}