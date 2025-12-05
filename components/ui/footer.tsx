import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logos/logo.png"
                alt="Mockup Factory Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-sm"
              />
              <span className="font-semibold text-gray-900 text-lg">
                Mockup Factory
              </span>
            </Link>
            <p className="text-gray-600 text-sm max-w-md mb-4">
              Beautiful mockup generator for your designs. Create stunning
              device mockups in seconds, right in your browser.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/poyrazavsever/mockup-factory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                <Icon icon="mdi:github" className="w-6 h-6" />
              </Link>
              <Link
                href="https://buymeacoffee.com/poyrazavsever"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                <Icon icon="mdi:coffee" className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Documentation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.poyrazavsever.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-sm"
                >
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Templates</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/templates?type=web"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-sm"
                >
                  Web Mockups
                </Link>
              </li>
              <li>
                <Link
                  href="/templates?type=mobile"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-sm"
                >
                  Mobile Mockups
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/poyrazavsever/mockup-factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-sm"
                >
                  Contribute Template
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Mockup Factory. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Created with{" "}
            <Icon icon="mdi:heart" className="w-4 h-4 text-sky-500" /> by{" "}
            <Link
              href="https://www.poyrazavsever.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 transition-colors"
            >
              Poyraz Avsever
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
