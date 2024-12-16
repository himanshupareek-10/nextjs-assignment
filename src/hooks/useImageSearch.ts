import { useCallback } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { searchByImage } from '@/store/slices/imageSearchSlice';

export function useImageSearch() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.imageSearch.error);

  const searchWithImage = useCallback(
    async (image: Blob) => {
      const formData = new FormData();
      formData.append('image', image);
      await dispatch(searchByImage(formData));
    },
    [dispatch]
  );

  return { searchByImage: searchWithImage, error };
}