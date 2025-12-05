"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { Template, MockupType } from "@/lib/types";
import { getTemplatesByType } from "@/lib/templates";

interface StepSelectTemplateProps {
  selectedType: MockupType;
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
}

export default function StepSelectTemplate({
  selectedType,
  selectedTemplate,
  onSelectTemplate,
}: StepSelectTemplateProps) {
  const templates = getTemplatesByType(selectedType);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
        <p className="mt-2 text-gray-600">
          Select a {selectedType === "web" ? "web" : "mobile"} mockup template
          for your design
        </p>
      </div>

      {/* Template Grid */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`
                relative group rounded-xl overflow-hidden border-2 transition-all duration-200
                hover:border-sky-400
                ${
                  selectedTemplate?.id === template.id
                    ? "border-sky-500 ring-2 ring-sky-200"
                    : "border-gray-200"
                }
              `}
            >
              {/* Template Preview */}
              <div className="aspect-[4/3] bg-gray-100 relative">
                <Image
                  src={template.imagePath}
                  alt={template.label}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback for missing images
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Placeholder when image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    icon={
                      selectedType === "web" ? "mdi:monitor" : "mdi:cellphone"
                    }
                    className="w-12 h-12 text-gray-300"
                  />
                </div>
              </div>

              {/* Selected Badge */}
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                    <Icon icon="mdi:check" className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors" />

              {/* Label */}
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {template.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Icon
            icon="mdi:image-off-outline"
            className="w-12 h-12 mx-auto text-gray-400"
          />
          <p className="mt-4 text-gray-600">
            No templates available for this type yet.
          </p>
          <p className="text-sm text-gray-500">
            Check back later or contribute your own!
          </p>
        </div>
      )}

      {/* Info */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Icon icon="mdi:information-outline" className="w-4 h-4" />
          {templates.length} template{templates.length !== 1 ? "s" : ""}{" "}
          available
        </span>
      </div>
    </div>
  );
}
