'use client';

import React from 'react';
import { Zap, Award, Globe2, FileDown } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Easy',
      description: 'Create your CV in minutes.',
      detail: 'Intuitive real-time editor with immediate live preview as you type.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Award,
      title: 'Professional',
      description: 'Professional CV templates.',
      detail: 'Tailored for ATS screening bots and human recruiters alike.',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      icon: Globe2,
      title: 'Worldwide',
      description: 'Use it from Saudi Arabia, UAE or anywhere.',
      detail: 'Optimized for international and GCC job markets, standard contact formats.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: FileDown,
      title: 'PDF',
      description: 'Download your CV as PDF.',
      detail: 'One-click high-resolution vector PDF export formatted for A4 print.',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ];

  return (
    <section id="features" className="features no-print py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Why Use CV Builder?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Everything you need to craft a winning resume without complicated formatting software.
          </p>
        </div>

        <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50/70 border border-stone-200 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-700 text-sm font-medium mb-1.5">
                  {item.description}
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
