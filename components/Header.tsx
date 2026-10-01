'use client';

import React, { useState } from 'react';
import { Menu, X, FileCheck } from 'lucide-react';

interface HeaderProps {
  onQuickPrint?: () => void;
}

export function Header({ onQuickPrint }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="logo text-xl sm:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5">
          <FileCheck className="w-6 h-6 text-blue-600" />
          <span>CV<span className="text-blue-600 font-extrabold">Builder</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a
            href="#builder"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Create CV
          </a>
          <a
            href="#templates"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Templates
          </a>
          <a
            href="#features"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Features
          </a>
        </nav>

        {/* Quick action button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#builder"
            className="px-4 py-2 text-xs sm:text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Build Your CV
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-2">
          <a
            href="#builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
          >
            Create CV
          </a>
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
          >
            Templates
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
          >
            Features
          </a>
        </div>
      )}
    </header>
  );
}
