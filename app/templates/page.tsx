"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { templates, getTemplatesByType } from "@/lib/templates";
import { Template, MockupType } from "@/lib/types";

// Filter Button Component
function FilterButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          active
            ? "bg-sky-500 text-white"
            : "bg-white text-gray-600 border border-gray-200 hover:border-sky-300 hover:text-sky-600"
        }
      `}
    >
      {children}
    </Link>
  );
}

// Template Card Component
function TemplateCard({ template }: { template: Template }) {
  const router = useRouter();

  const handleUseTemplate = () => {
    // Ana sayfadaki wizard'a yönlendir
    // TODO: Template ID'yi state olarak geçirmek için URL params veya context kullanılabilir
    router.push(`/?template=${template.id}`);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-sky-300 transition-all">
      {/* Template Preview */}
      <div className="aspect-4/3 bg-gray-100 relative overflow-hidden">
        <Image
          src={template.imagePath}
          alt={template.label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            icon={template.type === "web" ? "mdi:monitor" : "mdi:cellphone"}
            className="w-16 h-16 text-gray-300"
          />
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${
              template.type === "web"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }
          `}
          >
            {template.type === "web" ? "Web" : "Mobile"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{template.label}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {template.slot.width} × {template.slot.height} px
        </p>

        <button
          onClick={handleUseTemplate}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors text-sm font-medium"
        >
          <Icon icon="mdi:image-plus" className="w-4 h-4" />
          Use This Template
        </button>
      </div>
    </div>
  );
}

// Templates Content (with useSearchParams)
function TemplatesContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type") as MockupType | null;

  const displayedTemplates = typeFilter
    ? getTemplatesByType(typeFilter)
    : templates;

  const webCount = getTemplatesByType("web").length;
  const mobileCount = getTemplatesByType("mobile").length;

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Mockup Templates
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our collection of device mockup templates. Choose one and
          create stunning mockups for your designs in seconds.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <FilterButton href="/templates" active={!typeFilter}>
          All ({templates.length})
        </FilterButton>
        <FilterButton href="/templates?type=web" active={typeFilter === "web"}>
          <span className="flex items-center gap-2">
            <Icon icon="mdi:monitor" className="w-4 h-4" />
            Web ({webCount})
          </span>
        </FilterButton>
        <FilterButton
          href="/templates?type=mobile"
          active={typeFilter === "mobile"}
        >
          <span className="flex items-center gap-2">
            <Icon icon="mdi:cellphone" className="w-4 h-4" />
            Mobile ({mobileCount})
          </span>
        </FilterButton>
      </div>

      {/* Templates Grid */}
      {displayedTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Icon
            icon="mdi:image-off-outline"
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-500 mb-6">
            There are no templates matching your filter.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Icon icon="mdi:filter-off" className="w-4 h-4" />
            Clear Filters
          </Link>
        </div>
      )}

      {/* Contribute CTA */}
      <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
        <Icon
          icon="mdi:github"
          className="w-12 h-12 mx-auto text-gray-600 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Contribute a Template
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Have a great mockup design? Contribute to our open-source template
          library and help the community!
        </p>
        <Link
          href="https://github.com/poyrazavsever/mockup-factory"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Icon icon="mdi:github" className="w-5 h-5" />
          View on GitHub
        </Link>
      </div>
    </>
  );
}

// Main Page Component
export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <TemplatesContent />
        </Suspense>
      </div>
    </main>
  );
}
