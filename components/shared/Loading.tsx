"use client";

import { Icon } from "@iconify/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Icon
        icon="mdi:loading"
        className={`${sizeClasses[size]} text-sky-500 animate-spin`}
      />
      {message && (
        <p className="text-sm text-gray-600 animate-pulse">{message}</p>
      )}
    </div>
  );
}

// Tam ekran loading overlay
interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "İşleniyor...",
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white shadow-lg border border-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-100 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-sky-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}

// İnline loading (buton içi vb.)
interface InlineLoadingProps {
  className?: string;
}

export function InlineLoading({ className = "" }: InlineLoadingProps) {
  return (
    <Icon icon="mdi:loading" className={`w-5 h-5 animate-spin ${className}`} />
  );
}
