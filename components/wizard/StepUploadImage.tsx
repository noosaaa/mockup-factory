"use client";

import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { MockupType } from "@/lib/types";

// Önerilen çözünürlükler (template slot boyutlarına göre)
const RECOMMENDED_RESOLUTIONS = {
  web: {
    width: 1920,
    height: 1008, // slot height
    label: "1920 × 1008 px",
    ratio: "≈ 1.9:1",
  },
  mobile: {
    width: 390,
    height: 844, // iPhone slot
    label: "390 × 844 px (iPhone) veya 412 × 915 px (Android)",
    ratio: "≈ 9:19",
  },
};

interface StepUploadImageProps {
  uploadedImageUrl: string | null;
  selectedType: MockupType | null;
  onUploadImage: (file: File) => void;
  onError?: (message: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function StepUploadImage({
  uploadedImageUrl,
  selectedType,
  onUploadImage,
  onError,
}: StepUploadImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Seçilen tipe göre önerilen çözünürlük
  const recommended = selectedType
    ? RECOMMENDED_RESOLUTIONS[selectedType]
    : null;

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
        // Görsel boyutlarını al
        const img = new window.Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
          URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(file);

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

      {/* Önerilen Çözünürlük */}
      {recommended && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-sky-50 border border-sky-200">
          <Icon
            icon="mdi:lightbulb-outline"
            className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
          />
          <div className="text-sm">
            <p className="font-medium text-sky-800">
              Recommended Resolution for{" "}
              {selectedType === "web" ? "Web" : "Mobile"} Mockups:
            </p>
            <p className="text-sky-700 mt-1">
              <span className="font-mono bg-sky-100 px-1.5 py-0.5 rounded">
                {recommended.label}
              </span>
            </p>
            <p className="text-sky-600 text-xs mt-1">
              Aspect Ratio: {recommended.ratio} • Images will be scaled to fit
              the template slot
            </p>
          </div>
        </div>
      )}

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
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-sky-600">
                <Icon icon="mdi:check-circle" className="w-5 h-5" />
                <span className="text-sm font-medium">Image uploaded</span>
              </div>
              {imageDimensions && (
                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                  {imageDimensions.width} × {imageDimensions.height} px
                </span>
              )}
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
