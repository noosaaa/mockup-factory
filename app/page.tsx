"use client";

import { Icon } from "@iconify/react";
import { WizardContainer } from "@/components/wizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
            <Icon icon="mdi:shield-check" className="w-4 h-4" />
            100% Client-Side • Your images never leave your browser
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Stunning <span className="text-sky-500">Device Mockups</span>
            <br />
            in Seconds
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your designs and generate professional mockups instantly.
            Perfect for showcasing your apps, websites, and digital products.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-12">
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:cloud-off-outline"
                className="w-5 h-5 text-green-500"
              />
              <span>No uploads to server</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:lightning-bolt"
                className="w-5 h-5 text-yellow-500"
              />
              <span>Instant processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:download" className="w-5 h-5 text-blue-500" />
              <span>Free PNG download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section id="wizard" className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <WizardContainer />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: "mdi:shape-outline",
                title: "Choose Type",
                description: "Select Web or Mobile mockup type",
              },
              {
                step: 2,
                icon: "mdi:cloud-upload-outline",
                title: "Upload Image",
                description: "Drag & drop your screenshot or design",
              },
              {
                step: 3,
                icon: "mdi:image-multiple-outline",
                title: "Pick Template",
                description: "Choose from our template collection",
              },
              {
                step: 4,
                icon: "mdi:download",
                title: "Download",
                description: "Get your mockup as PNG instantly",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                  <Icon icon={item.icon} className="w-7 h-7 text-sky-600" />
                </div>
                <div className="text-xs font-medium text-sky-500 mb-1">
                  Step {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="mdi:lock" className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Privacy First</h3>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            All image processing happens directly in your browser using the
            Canvas API. Your images are never uploaded to any server. We take
            your privacy seriously.
          </p>
        </div>
      </section>
    </div>
  );
}
