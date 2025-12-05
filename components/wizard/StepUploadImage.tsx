"use client";

import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface StepUploadImageProps {
  uploadedImageUrl: string | null;
  onUploadImage: (file: File) => void;
  onError?: (message: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function StepUploadImage({
  uploadedImageUrl,
  onUploadImage,
  onError,
}: StepUploadImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      const errorMsg = "Please upload a PNG, JPG, or WEBP image";
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      const errorMsg = "File size must be less than 10MB";
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onUploadImage(file);
      }
    },
    [onUploadImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Upload Your Image</h2>
        <p className="mt-2 text-gray-600">
          Upload a screenshot or design to place in the mockup
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center
          transition-all duration-200 cursor-pointer
          ${
            isDragging
              ? "border-sky-500 bg-sky-50"
              : uploadedImageUrl
              ? "border-sky-300 bg-sky-50/50"
              : "border-gray-300 hover:border-sky-400 hover:bg-gray-50"
          }
        `}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {uploadedImageUrl ? (
          // Preview
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={uploadedImageUrl}
                alt="Uploaded preview"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-sky-600">
              <Icon icon="mdi:check-circle" className="w-5 h-5" />
              <span className="text-sm font-medium">Image uploaded</span>
            </div>
            <p className="text-xs text-gray-500">
              Click or drag to replace the image
            </p>
          </div>
        ) : (
          // Empty State
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-sky-100 flex items-center justify-center">
              <Icon
                icon="mdi:cloud-upload-outline"
                className="w-8 h-8 text-sky-500"
              />
            </div>
            <div>
              <p className="text-gray-900 font-medium">
                Drag & drop your image here
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to browse</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <span>PNG, JPG, WEBP</span>
              <span>•</span>
              <span>Max 10MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600">
          <Icon icon="mdi:alert-circle" className="w-5 h-5 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Privacy Note */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 text-gray-600">
        <Icon
          icon="mdi:shield-check"
          className="w-5 h-5 shrink-0 text-green-500"
        />
        <p className="text-xs">
          <strong>Privacy First:</strong> Your image never leaves your browser.
          All processing happens locally on your device.
        </p>
      </div>
    </div>
  );
}
