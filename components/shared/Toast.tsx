"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const toastConfig: Record<
  ToastType,
  { icon: string; bgColor: string; borderColor: string }
> = {
  success: {
    icon: "mdi:check-circle",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
  },
  error: {
    icon: "mdi:alert-circle",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
  },
  warning: {
    icon: "mdi:alert",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
  },
  info: {
    icon: "mdi:information",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-500",
  },
};

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const config = toastConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300); // Animasyon süresi
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border-l-4
        ${config.bgColor} ${config.borderColor}
        transition-all duration-300 ease-in-out
        ${isLeaving ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
      `}
      role="alert"
    >
      <Icon icon={config.icon} className="w-5 h-5 shrink-0" />
      <p className="text-sm text-gray-700 flex-1">{message}</p>
      <button
        onClick={handleClose}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        aria-label="Bildirimi kapat"
      >
        <Icon icon="mdi:close" className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

// Toast Container - birden fazla toast'ı yönetir
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
