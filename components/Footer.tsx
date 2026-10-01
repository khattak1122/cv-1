'use client';

import React from 'react';
import { FileCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer no-print bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <FileCheck className="w-5 h-5 text-blue-500" />
            <span>CV<span className="text-blue-500">Builder</span></span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#builder" className="hover:text-white transition-colors">
              Create CV
            </a>
            <a href="#templates" className="hover:text-white transition-colors">
              Templates
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
          </nav>
        </div>

        <div className="pt-6 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 CVBuilder. All Rights Reserved.</p>
          <p>Built for professional job seekers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
