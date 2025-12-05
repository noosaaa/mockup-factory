"use client";

import { Icon } from "@iconify/react";
import { WizardStep } from "@/lib/types";

interface StepperProps {
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

const steps = [
  { number: 1, label: "Type", icon: "mdi:shape-outline" },
  { number: 2, label: "Upload", icon: "mdi:cloud-upload-outline" },
  { number: 3, label: "Template", icon: "mdi:image-multiple-outline" },
  { number: 4, label: "Preview", icon: "mdi:eye-outline" },
] as const;

export default function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <button
              onClick={() => onStepClick?.(step.number as WizardStep)}
              disabled={step.number > currentStep}
              className={`
                relative flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-200 cursor-pointer
                ${
                  step.number < currentStep
                    ? "bg-sky-500 text-white"
                    : step.number === currentStep
                    ? "bg-sky-500 text-white ring-4 ring-sky-100"
                    : "bg-gray-200 text-gray-500"
                }
                ${
                  step.number > currentStep
                    ? "cursor-not-allowed"
                    : "hover:scale-105"
                }
              `}
            >
              {step.number < currentStep ? (
                <Icon icon="mdi:check" className="w-5 h-5" />
              ) : (
                <Icon icon={step.icon} className="w-5 h-5" />
              )}
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2">
                <div
                  className={`h-full rounded-full transition-colors duration-200 ${
                    step.number < currentStep ? "bg-sky-500" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`text-xs font-medium transition-colors duration-200 ${
              step.number <= currentStep ? "text-sky-600" : "text-gray-400"
            }`}
            style={{ width: "40px", textAlign: "center" }}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
