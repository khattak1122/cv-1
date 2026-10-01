'use client';

import React, { useState, useMemo } from 'react';
import { generatePreset, resolveTemplate } from '@/lib/template-engine';
import { X, Search, Dice5, ChevronLeft, ChevronRight } from 'lucide-react';

interface StylesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStyleId: string;
  onSelectStyle: (styleId: string) => void;
}

export function StylesModal({
  isOpen,
  onClose,
  currentStyleId,
  onSelectStyle,
}: StylesModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [directJumpNumber, setDirectJumpNumber] = useState<string>('');

  const ITEMS_PER_PAGE = 36;
  const TOTAL_TEMPLATES = 1000;

  const categories = useMemo(() => {
    return [
      'All',
      'Executive',
      'Tech & Engineering',
      'Creative & Design',
      'ATS Minimal',
      'Medical & Academic',
      'Modern Startup',
      'Legal & Finance',
    ];
  }, []);

  // Pre-generate items for current view or filtered subset
  const filteredTemplates = useMemo(() => {
    const results = [];
    const query = search.toLowerCase().trim();

    // Check if user typed a specific number
    const num = parseInt(query, 10);
    if (!isNaN(num) && num >= 1 && num <= TOTAL_TEMPLATES && query.length < 5) {
      return [generatePreset(num)];
    }

    for (let i = 1; i <= TOTAL_TEMPLATES; i++) {
      const preset = generatePreset(i);
      const matchesCategory =
        selectedCategory === 'All' || preset.category === selectedCategory;
      const matchesSearch =
        !query ||
        preset.name.toLowerCase().includes(query) ||
        preset.description.toLowerCase().includes(query) ||
        preset.category.toLowerCase().includes(query) ||
        preset.layout.toLowerCase().includes(query) ||
        `#${preset.number}`.includes(query);

      if (matchesCategory && matchesSearch) {
        results.push(preset);
      }
    }
    return results;
  }, [search, selectedCategory]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const currentSlice = filteredTemplates.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleRandom = () => {
    const rand = Math.floor(Math.random() * TOTAL_TEMPLATES) + 1;
    onSelectStyle(`template-${rand}`);
    onClose();
  };

  const handleDirectJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(directJumpNumber, 10);
    if (!isNaN(num) && num >= 1 && num <= TOTAL_TEMPLATES) {
      onSelectStyle(`template-${num}`);
      setDirectJumpNumber('');
      onClose();
    } else {
      alert('Please enter a template number between 1 and 1000');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                1,000 CV Templates
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Template Library (#1 to #1000)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Select any of the 1,000 curated designs or jump directly to a template number.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick jump to template # */}
            <form onSubmit={handleDirectJump} className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-300">
              <input
                type="number"
                min="1"
                max="1000"
                placeholder="#1-1000"
                value={directJumpNumber}
                onChange={(e) => setDirectJumpNumber(e.target.value)}
                className="w-16 px-1.5 py-1 text-xs border-0 focus:outline-none"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800"
              >
                Go
              </button>
            </form>

            <button
              type="button"
              onClick={handleRandom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg border border-purple-200 transition"
              title="Pick a random template from 1 to 1000"
            >
              <Dice5 className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">Surprise Me</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="p-4 border-b border-stone-200 bg-white space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 1,000 templates by name, layout, #number..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-stone-50/50"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span>
                Page <strong>{safePage}</strong> of <strong>{totalPages}</strong> ({filteredTemplates.length} styles)
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className="p-1 rounded border border-stone-200 hover:bg-stone-100 disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className="p-1 rounded border border-stone-200 hover:bg-stone-100 disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 1,000 Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentSlice.map((style) => {
              const currentResolved = resolveTemplate(currentStyleId);
              const isSelected = currentResolved.number === style.number;
              return (
                <div
                  key={style.number}
                  onClick={() => {
                    onSelectStyle(`template-${style.number}`);
                    onClose();
                  }}
                  className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div>
                    {/* Visual miniature */}
                    <div className="mb-3 rounded-lg border border-stone-200 overflow-hidden bg-white shadow-inner aspect-[5/3] flex">
                      {style.layout === 'full-height-sidebar' ? (
                        <div className="w-full flex h-full">
                          <div className={`w-1/3 ${style.colors.headerBg} p-1.5 flex flex-col items-center gap-1`}>
                            <div className="w-4 h-4 rounded-full bg-white/40 border border-white/60 shadow-xs" />
                            <div className="w-full h-0.5 bg-white/40 rounded mt-1" />
                            <div className="w-3/4 h-0.5 bg-white/40 rounded" />
                            <div className="w-4/5 h-0.5 bg-white/30 rounded mt-1" />
                          </div>
                          <div className="w-2/3 p-2 bg-white space-y-1">
                            <div className="w-12 h-1.5 bg-stone-800 rounded mb-1" />
                            <div className="w-8 h-1 rounded" style={{ backgroundColor: style.colors.previewHex }} />
                            <div className="w-full h-1 bg-stone-200 rounded mt-1.5" />
                            <div className="w-4/5 h-1 bg-stone-200 rounded" />
                            <div className="w-3/5 h-1 bg-stone-200 rounded" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col h-full">
                          <div className={`h-7 flex items-center px-2 gap-1.5 ${style.colors.headerBg}`}>
                            <div className="w-3.5 h-3.5 rounded-full bg-white/30 shrink-0" />
                            <div className="space-y-1 flex-1">
                              <div className="w-12 h-1 bg-white/90 rounded" />
                              <div className="w-8 h-0.5 bg-white/60 rounded" />
                            </div>
                          </div>
                          <div className="flex-1 p-2 flex gap-1.5 bg-white">
                            {style.layout === 'left-sidebar' && (
                              <div className="w-1/3 bg-stone-100 rounded p-1 space-y-1">
                                <div className="w-full h-1 bg-stone-300 rounded" />
                                <div className="w-2/3 h-1 bg-stone-300 rounded" />
                              </div>
                            )}
                            <div className="flex-1 space-y-1">
                              <div
                                className="h-1 rounded w-8"
                                style={{ backgroundColor: style.colors.previewHex }}
                              />
                              <div className="w-full h-1 bg-stone-200 rounded" />
                              <div className="w-4/5 h-1 bg-stone-200 rounded" />
                              <div className="w-3/5 h-1 bg-stone-200 rounded" />
                            </div>
                            {style.layout === 'right-sidebar' && (
                              <div className="w-1/3 bg-stone-100 rounded p-1 space-y-1">
                                <div className="w-full h-1 bg-stone-300 rounded" />
                                <div className="w-2/3 h-1 bg-stone-300 rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-bold text-stone-500">
                        #{style.number}
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                        {style.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-stone-900 line-clamp-1 mb-1">
                      {style.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
                      {style.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 capitalize">
                      {style.layout.replace('-', ' ')}
                    </span>
                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? 'Applied' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer with Pagination */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium hover:bg-stone-100 disabled:opacity-30"
            >
              Previous Page
            </button>
            <span className="text-xs text-stone-500">
              Page {safePage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium hover:bg-stone-100 disabled:opacity-30"
            >
              Next Page
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
