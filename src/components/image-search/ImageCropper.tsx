import { useState, useCallback } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  onCropComplete: (croppedImage: Blob) => void;
}

export function ImageCropper({ onCropComplete }: ImageCropperProps): JSX.Element {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });

  const handleCropComplete = useCallback(
    async (completedCrop: Crop) => {
      if (completedCrop.width && completedCrop.height) {
        const canvas = document.createElement('canvas');
        const image = document.createElement('img');
        
        // Convert crop to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              onCropComplete(blob);
            }
          },
          'image/jpeg',
          0.95
        );
      }
    },
    [onCropComplete]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={handleCropComplete}
        aspect={1}
      >
        <img
          src={URL.createObjectURL(new Blob())} // You'll need to pass the image source
          alt="Crop preview"
          className="max-w-full h-auto"
        />
      </ReactCrop>
    </div>
  );
}
