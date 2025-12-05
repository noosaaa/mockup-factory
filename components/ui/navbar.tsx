import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="https://www.poyrazavsever.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-600 transition-colors flex items-center gap-1"
            >
              Blog
              <Icon icon="mdi:open-in-new" className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="text-gray-600 hover:text-sky-600 transition-colors"
            >
              Templates
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/poyrazavsever/mockup-factory"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Icon icon="mdi:github" className="w-5 h-5" />
              <span className="text-sm font-medium">Star On GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
