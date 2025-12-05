"use client";

import { useState, useCallback } from "react";
import {
  WizardState,
  WizardStep,
  MockupType,
  Template,
  WizardActions,
} from "../types";

const initialState: WizardState = {
  currentStep: 1,
  selectedType: null,
  uploadedImage: null,
  uploadedImageUrl: null,
  selectedTemplate: null,
  resultImageUrl: null,
};

export function useWizard(): { state: WizardState } & WizardActions {
  const [state, setState] = useState<WizardState>(initialState);

  // Adım değiştir
  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  // Sonraki adım
  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4) as WizardStep,
    }));
  }, []);

  // Önceki adım
  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1) as WizardStep,
    }));
  }, []);

  // Mockup tipi seç
  const selectType = useCallback((type: MockupType) => {
    setState((prev) => ({
      ...prev,
      selectedType: type,
      // Tip değiştiğinde template seçimini sıfırla
      selectedTemplate: null,
      resultImageUrl: null,
    }));
  }, []);

  // Görsel yükle (client-side, belleğe)
  const uploadImage = useCallback((file: File) => {
    setState((prev) => {
      // Önceki URL'i temizle (bellek sızıntısını önle)
      if (prev.uploadedImageUrl) {
        URL.revokeObjectURL(prev.uploadedImageUrl);
      }

      const url = URL.createObjectURL(file);
      return {
        ...prev,
        uploadedImage: file,
        uploadedImageUrl: url,
        // Yeni görsel yüklendiğinde sonucu sıfırla
        resultImageUrl: null,
      };
    });
  }, []);

  // Template seç
  const selectTemplate = useCallback((template: Template) => {
    setState((prev) => ({
      ...prev,
      selectedTemplate: template,
      // Template değiştiğinde sonucu sıfırla
      resultImageUrl: null,
    }));
  }, []);

  // Sonuç URL'i kaydet
  const setResultUrl = useCallback((url: string) => {
    setState((prev) => ({ ...prev, resultImageUrl: url }));
  }, []);

  // Tüm state'i sıfırla
  const reset = useCallback(() => {
    setState((prev) => {
      // Bellek temizliği
      if (prev.uploadedImageUrl) {
        URL.revokeObjectURL(prev.uploadedImageUrl);
      }
      return initialState;
    });
  }, []);

  return {
    state,
    goToStep,
    nextStep,
    prevStep,
    selectType,
    uploadImage,
    selectTemplate,
    setResultUrl,
    reset,
  };
}
