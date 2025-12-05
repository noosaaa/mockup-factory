"use client";

import { Icon } from "@iconify/react";
import { useWizard } from "@/lib/hooks/useWizard";
import Stepper from "./Stepper";
import StepSelectType from "./StepSelectType";
import StepUploadImage from "./StepUploadImage";
import StepSelectTemplate from "./StepSelectTemplate";
import StepPreview from "./StepPreview";

export default function WizardContainer() {
  const {
    state,
    goToStep,
    nextStep,
    prevStep,
    selectType,
    uploadImage,
    selectTemplate,
    setResultUrl,
    reset,
  } = useWizard();

  const {
    currentStep,
    selectedType,
    uploadedImageUrl,
    selectedTemplate,
    resultImageUrl,
  } = state;

  // Adım geçiş kontrolü
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return selectedType !== null;
      case 2:
        return uploadedImageUrl !== null;
      case 3:
        return selectedTemplate !== null;
      case 4:
        return true;
      default:
        return false;
    }
  };

  // Geri dönüş handler
  const handleTryAnotherTemplate = () => {
    goToStep(3);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Stepper */}
      <div className="mb-8">
        <Stepper currentStep={currentStep} onStepClick={goToStep} />
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        {currentStep === 1 && (
          <StepSelectType
            selectedType={selectedType}
            onSelectType={(type) => {
              selectType(type);
            }}
          />
        )}

        {currentStep === 2 && (
          <StepUploadImage
            uploadedImageUrl={uploadedImageUrl}
            onUploadImage={uploadImage}
          />
        )}

        {currentStep === 3 && selectedType && (
          <StepSelectTemplate
            selectedType={selectedType}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={selectTemplate}
          />
        )}

        {currentStep === 4 && selectedTemplate && uploadedImageUrl && (
          <StepPreview
            template={selectedTemplate}
            userImageUrl={uploadedImageUrl}
            resultImageUrl={resultImageUrl}
            onResultReady={setResultUrl}
            onTryAnother={handleTryAnotherTemplate}
            onReset={reset}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${
                currentStep === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <Icon icon="mdi:chevron-left" className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors
              ${
                canProceed()
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {currentStep === 3 ? "Generate Mockup" : "Continue"}
            <Icon icon="mdi:chevron-right" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
