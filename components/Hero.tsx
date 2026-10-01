'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, FileDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero no-print relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-16 sm:py-24 border-b border-stone-200">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#1e3a8a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="hero-text max-w-3xl mx-auto space-y-6">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Fast, Free & ATS-Ready CV Builder</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            Create Your <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">Professional CV</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Build a professional CV in minutes. Choose a design, enter your information and download your CV with full A4-optimized page layout.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#builder"
              className="hero-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base group cursor-pointer w-full sm:w-auto"
            >
              <span>Create My CV</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#templates"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-700 font-medium rounded-lg border border-stone-300 transition-colors text-base w-full sm:w-auto"
            >
              Explore Templates
            </a>
          </div>

          {/* Quick value props */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real-time Live Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standard A4 PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <FileDown className="w-4 h-4 text-emerald-600" />
              <span>No Signup Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
