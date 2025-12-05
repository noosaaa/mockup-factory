"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Template } from "@/lib/types";
import { composeMockup } from "@/lib/composeMockup";
import { downloadImage } from "@/lib/downloadImage";

interface StepPreviewProps {
  template: Template;
  userImageUrl: string;
  resultImageUrl: string | null;
  onResultReady: (url: string) => void;
  onError?: (message: string) => void;
  onTryAnother: () => void;
  onReset: () => void;
}

export default function StepPreview({
  template,
  userImageUrl,
  resultImageUrl,
  onResultReady,
  onError,
  onTryAnother,
  onReset,
}: StepPreviewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mockup oluştur
  useEffect(() => {
    if (!resultImageUrl && template && userImageUrl) {
      generateMockup();
    }
  }, [template, userImageUrl, resultImageUrl]);

  const generateMockup = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await composeMockup({
        template,
        userImageUrl,
      });
      onResultReady(result);
    } catch (err) {
      console.error("Mockup generation failed:", err);
      const errorMsg = "Failed to generate mockup. Please try again.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultImageUrl) {
      const filename = `mockup-${template.id}-${Date.now()}.png`;
      downloadImage(resultImageUrl, filename);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Mockup is Ready!
        </h2>
        <p className="mt-2 text-gray-600">
          Download your mockup or try a different template
        </p>
      </div>

      {/* Preview Area */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
        {isProcessing ? (
          // Loading State
          <div className="aspect-video flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600">Generating your mockup...</p>
          </div>
        ) : error ? (
          // Error State
          <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Icon icon="mdi:alert-circle" className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 text-center">{error}</p>
            <button
              onClick={generateMockup}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : resultImageUrl ? (
          // Result Preview
          <div className="relative aspect-video">
            <Image
              src={resultImageUrl}
              alt="Generated mockup"
              fill
              className="object-contain"
            />
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      {resultImageUrl && !isProcessing && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
          >
            <Icon icon="mdi:download" className="w-5 h-5" />
            Download PNG
          </button>
          <button
            onClick={onTryAnother}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Icon icon="mdi:image-multiple" className="w-5 h-5" />
            Try Another Template
          </button>
          <button
            onClick={onReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Icon icon="mdi:refresh" className="w-5 h-5" />
            Start Over
          </button>
        </div>
      )}

      {/* Template Info */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Icon icon="mdi:information-outline" className="w-4 h-4" />
        <span>Template: {template.label}</span>
      </div>
    </div>
  );
}
