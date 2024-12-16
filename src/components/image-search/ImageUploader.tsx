import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedImage } from '@/store/slices/imageSearchSlice';

export function ImageUploader(): JSX.Element {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        dispatch(setSelectedImage(URL.createObjectURL(file)));
      }
    },
    [dispatch]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? 'border-google-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <CameraIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">Drag and drop an image here, or click to select</p>
      <p className="text-sm text-gray-400 mt-2">
        Supports: JPG, PNG, GIF (max 20MB)
      </p>
    </div>
  );
}