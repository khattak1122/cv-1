'use client';

import React, { useState, useMemo } from 'react';
import { CV_STYLES, getCVStyle } from '@/lib/cv-styles';
import { Check, Search, Sparkles, LayoutGrid, ChevronRight } from 'lucide-react';

interface TemplatesSectionProps {
  currentTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onOpenModal: () => void;
}

export function TemplatesSection({
  currentTemplate,
  onSelectTemplate,
  onOpenModal,
}: TemplatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const originalThree = [
    {
      id: 'blue',
      title: 'Professional Blue',
      description: 'Clean corporate CV',
    },
    {
      id: 'black',
      title: 'Classic Black',
      description: 'Simple professional CV',
    },
    {
      id: 'green',
      title: 'Modern Green',
      description: 'Modern creative CV',
    },
  ];

  const categories = ['All', 'Executive', 'Tech & Engineering', 'Creative & Design', 'ATS Minimal', 'Medical & Academic', 'Modern Startup', 'Legal & Finance'];

  const filteredStyles = useMemo(() => {
    return CV_STYLES.filter((style) => {
      const matchCat = selectedCategory === 'All' || style.category === selectedCategory;
      const matchQuery =
        style.name.toLowerCase().includes(search.toLowerCase()) ||
        style.description.toLowerCase().includes(search.toLowerCase()) ||
        `#${style.number}`.includes(search);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, search]);

  const handleSelect = (id: string) => {
    onSelectTemplate(id);
    const builderEl = document.getElementById('builder');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="templates" className="templates no-print py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100 Unique Styles Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Professional CV Templates
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Explore 100 distinct resume designs covering corporate leadership, software engineering, ATS minimal formats, creative portfolios, and academic careers.
          </p>
        </div>

        {/* 3 Featured Templates */}
        <div className="template-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {originalThree.map((item) => {
            const isSelected = currentTemplate === item.id;
            const fullStyle = getCVStyle(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`template-card group bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                    : 'border-stone-200 hover:border-stone-400 shadow-sm'
                }`}
              >
                {/* Visual miniature */}
                <div className="mb-4 rounded-lg border border-stone-200 overflow-hidden bg-stone-50 aspect-[16/10] flex flex-col">
                  <div className={`h-9 flex items-center px-3 gap-2 ${fullStyle.colors.headerBg}`}>
                    <div className="w-5 h-5 rounded-full bg-white/25 shrink-0" />
                    <div className="space-y-1">
                      <div className="w-16 h-1.5 bg-white/90 rounded" />
                      <div className="w-10 h-1 bg-white/60 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 p-3 bg-white space-y-1.5">
                    <div className="w-12 h-1 rounded" style={{ backgroundColor: fullStyle.colors.previewHex }} />
                    <div className="w-full h-1 bg-stone-200 rounded" />
                    <div className="w-4/5 h-1 bg-stone-200 rounded" />
                    <div className="w-3/5 h-1 bg-stone-200 rounded" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mb-4">{item.description}</p>
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? 'Applied to Preview' : 'Select Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 100 Styles Full Browser Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <h3 className="text-xl font-bold text-stone-900">
                Explore All 100 Styles by Category
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Filter across 7 industries or search 100 handcrafted templates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter 100 styles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-600 w-48 sm:w-60 bg-stone-50/50"
                />
              </div>
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Full Gallery</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Styles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {filteredStyles.slice(0, 24).map((style) => {
              const isSelected = currentTemplate === style.id;
              return (
                <div
                  key={style.id}
                  onClick={() => handleSelect(style.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between hover:shadow-md ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-stone-400 font-semibold">
                        #{style.number}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: style.colors.previewHex }}
                      />
                    </div>
                    <div className="text-xs font-bold text-stone-900 line-clamp-1">
                      {style.name}
                    </div>
                    <div className="text-[10px] text-stone-500 capitalize line-clamp-1 mt-0.5">
                      {style.category}
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                    <span className="text-stone-400 capitalize">{style.layout.replace('-', ' ')}</span>
                    <span className={isSelected ? 'text-blue-600 font-bold' : 'text-stone-500'}>
                      {isSelected ? 'Active' : 'Apply'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Open Modal CTA */}
          <div className="pt-6 text-center">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 hover:border-blue-600 bg-white hover:bg-blue-50/50 text-stone-800 hover:text-blue-700 text-xs sm:text-sm font-semibold transition"
            >
              <span>View All 100 Styles in Visual Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
