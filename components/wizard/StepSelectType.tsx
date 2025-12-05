"use client";

import { Icon } from "@iconify/react";
import { MockupType } from "@/lib/types";

interface StepSelectTypeProps {
  selectedType: MockupType | null;
  onSelectType: (type: MockupType) => void;
}

const typeOptions = [
  {
    type: "web" as MockupType,
    icon: "mdi:monitor",
    title: "Web Mockup",
    description: "Desktop, Laptop & Browser mockups",
    examples: ["Browser windows", "Desktop screens", "Laptop devices"],
  },
  {
    type: "mobile" as MockupType,
    icon: "mdi:cellphone",
    title: "Mobile Mockup",
    description: "iPhone, Android & Tablet mockups",
    examples: ["iPhone devices", "Android phones", "Tablets"],
  },
];

export default function StepSelectType({
  selectedType,
  onSelectType,
}: StepSelectTypeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Mockup Type</h2>
        <p className="mt-2 text-gray-600">
          Select the type of device mockup you want to create
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {typeOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelectType(option.type)}
            className={`
              relative p-6 rounded-xl border-2 text-left transition-all duration-200
              hover:border-sky-400 hover:bg-sky-50/50
              ${
                selectedType === option.type
                  ? "border-sky-500 bg-sky-50 ring-2 ring-sky-200"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            {/* Selected Badge */}
            {selectedType === option.type && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                  <Icon icon="mdi:check" className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Icon */}
            <div
              className={`
              w-14 h-14 rounded-xl flex items-center justify-center mb-4
              ${
                selectedType === option.type
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }
            `}
            >
              <Icon icon={option.icon} className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900">
              {option.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{option.description}</p>

            {/* Examples */}
            <div className="mt-4 flex flex-wrap gap-2">
              {option.examples.map((example) => (
                <span
                  key={example}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {example}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
