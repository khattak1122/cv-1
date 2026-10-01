/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useRef, useState, useMemo } from 'react';
import { CVData, SAMPLE_CV_DATA, BLANK_CV_DATA } from '@/types/cv';
import { JOB_PROFILES, JobProfile } from '@/lib/job-profiles';
import { resolveTemplate, PhotoPosition } from '@/lib/template-engine';
import { LayoutStructure, FontTheme } from '@/lib/cv-styles';
import { searchLocations, LocationItem } from '@/lib/locations';
import { 
  WORLD_LANGUAGES, 
  PROFICIENCY_LEVELS, 
  formatLanguagesToString, 
  parseLanguagesFromString,
  SelectedLanguageItem 
} from '@/lib/languages';
import { 
  Sparkles, 
  Upload, 
  Trash2, 
  RotateCcw, 
  Check, 
  Loader2, 
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Dice5,
  Printer,
  Download,
  Briefcase,
  SlidersHorizontal,
  Image as ImageIcon,
  Columns,
  Type,
  MapPin,
  Globe2,
  Plus,
  X,
  Languages as LanguagesIcon,
  Maximize2
} from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onDownload: () => void;
  onDirectPrint?: () => void;
  onOpenStylesModal: () => void;
}

export function CVForm({ data, onChange, onDownload, onDirectPrint, onOpenStylesModal }: CVFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiLoadingField, setAiLoadingField] = useState<string | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [showJobSuggestions, setShowJobSuggestions] = useState<boolean>(false);
  const [showAdvancedStyle, setShowAdvancedStyle] = useState<boolean>(false);
  const [templateNumberInput, setTemplateNumberInput] = useState<string>('');

  // Location Autocomplete State
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);

  // Languages System State (Dual Auto + Manual)
  const [languageMode, setLanguageMode] = useState<'auto' | 'manual'>('auto');
  const [selectedLangName, setSelectedLangName] = useState<string>('English');
  const [selectedProficiency, setSelectedProficiency] = useState<string>('Fluent / Professional');

  const currentStyle = resolveTemplate(data.template);

  const updateField = (field: keyof CVData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Filter job profiles matching user input in Job Title
  const matchingJobs = useMemo(() => {
    const query = (data.job || '').toLowerCase().trim();
    if (!query) return JOB_PROFILES.slice(0, 6);
    return JOB_PROFILES.filter(
      p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }, [data.job]);

  // Worldwide Location suggestions based on what user is typing
  const locationMatches = useMemo(() => {
    return searchLocations(data.location || '', 8);
  }, [data.location]);

  // Parse current languages into structured items for Auto mode
  const parsedLanguages = useMemo(() => {
    return parseLanguagesFromString(data.languages);
  }, [data.languages]);

  // Apply complete job profile to full CV
  const handleApplyJobProfile = (profile: JobProfile) => {
    const currentName = data.name.trim();
    onChange({
      ...profile.data,
      name: currentName || profile.data.name,
      photoUrl: data.photoUrl || profile.data.photoUrl,
      template: profile.data.recommendedTemplate || data.template,
      photoPosition: data.photoPosition || 'left',
      layoutOverride: undefined,
      fontOverride: undefined,
      colorOverride: undefined,
      spacingDensity: data.spacingDensity || 'auto',
    });
    setShowJobSuggestions(false);
    setAiNotice(`✨ Full CV converted into professional ${profile.title}!`);
    setTimeout(() => setAiNotice(null), 4000);
  };

  // Handle Location Click from suggestions
  const handleSelectLocation = (item: LocationItem) => {
    updateField('location', item.formatted);
    setShowLocationSuggestions(false);
    setAiNotice(`📍 Location updated to ${item.formatted}!`);
    setTimeout(() => setAiNotice(null), 3000);
  };

  // Handle Adding Language in Auto Mode
  const handleAddLanguage = () => {
    if (!selectedLangName) return;
    const exists = parsedLanguages.some(
      (l) => l.name.toLowerCase() === selectedLangName.toLowerCase()
    );
    let updatedList: SelectedLanguageItem[];
    if (exists) {
      updatedList = parsedLanguages.map((l) =>
        l.name.toLowerCase() === selectedLangName.toLowerCase()
          ? { ...l, proficiency: selectedProficiency }
          : l
      );
    } else {
      updatedList = [
        ...parsedLanguages,
        {
          id: `lang-${selectedLangName.toLowerCase()}-${parsedLanguages.length}`,
          name: selectedLangName,
          proficiency: selectedProficiency,
        },
      ];
    }
    const formattedText = formatLanguagesToString(updatedList);
    updateField('languages', formattedText);
  };

  // Quick Add Language Pill
  const handleQuickAddLanguage = (name: string, proficiency: string) => {
    const exists = parsedLanguages.some((l) => l.name.toLowerCase() === name.toLowerCase());
    let updatedList: SelectedLanguageItem[];
    if (exists) {
      updatedList = parsedLanguages.map((l) =>
        l.name.toLowerCase() === name.toLowerCase() ? { ...l, proficiency } : l
      );
    } else {
      updatedList = [
        ...parsedLanguages,
        {
          id: `lang-${name.toLowerCase()}-${parsedLanguages.length}`,
          name,
          proficiency,
        },
      ];
    }
    updateField('languages', formatLanguagesToString(updatedList));
  };

  // Remove Language in Auto Mode
  const handleRemoveLanguage = (langName: string) => {
    const updatedList = parsedLanguages.filter(
      (l) => l.name.toLowerCase() !== langName.toLowerCase()
    );
    updateField('languages', formatLanguagesToString(updatedList));
  };

  const handleNextStyle = () => {
    const currentNum = currentStyle.number;
    const nextNum = currentNum >= 1000 ? 1 : currentNum + 1;
    updateField('template', `template-${nextNum}`);
  };

  const handlePrevStyle = () => {
    const currentNum = currentStyle.number;
    const prevNum = currentNum <= 1 ? 1000 : currentNum - 1;
    updateField('template', `template-${prevNum}`);
  };

  const handleRandomStyle = () => {
    const randNum = Math.floor(Math.random() * 1000) + 1;
    updateField('template', `template-${randNum}`);
  };

  const handleJumpToTemplateNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(templateNumberInput, 10);
    if (!isNaN(num) && num >= 1 && num <= 1000) {
      updateField('template', `template-${num}`);
      setTemplateNumberInput('');
    } else {
      alert('Please enter a template number between 1 and 1000');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        updateField('photoUrl', event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateField('photoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadSample = () => {
    onChange({ ...SAMPLE_CV_DATA });
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      onChange({ ...BLANK_CV_DATA });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAiEnhance = async (field: 'about' | 'experience') => {
    const currentText = data[field];
    if (!currentText || currentText.trim().length === 0) {
      alert(`Please write a draft in ${field === 'about' ? 'About Me' : 'Work Experience'} first so the AI can polish it!`);
      return;
    }

    setAiLoadingField(field);
    setAiNotice(null);

    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: currentText,
          type: field,
          jobTitle: data.job || 'Professional',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to enhance');
      }

      const json = await res.json();
      if (json.enhanced) {
        updateField(field, json.enhanced);
        setAiNotice(`Enhanced ${field === 'about' ? 'About Me' : 'Work Experience'} successfully!`);
        setTimeout(() => setAiNotice(null), 4000);
      }
    } catch (err) {
      console.error(err);
      alert('Could not enhance text right now. Please try again.');
    } finally {
      setAiLoadingField(null);
    }
  };

  return (
    <div className="form-area bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            CV Information
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Fill in your details or pick a profession to auto-convert your entire CV.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            title="Load sample Civil Engineer profile"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Civil Eng Sample</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-stone-200"
            title="Clear all inputs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {aiNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{aiNotice}</span>
        </div>
      )}

      {/* Dynamic Page Space & Typography Control */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
          <span className="font-bold text-blue-950 flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-blue-600" />
            <span>A4 Page Sizing & Spacing:</span>
          </span>
          <span className="text-blue-700 text-[11px] font-medium">Dynamically uses full A4 height without empty bottom</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
          {[
            { id: 'auto', label: 'Auto (Recommended)' },
            { id: 'spacious', label: 'Spacious (Short CV)' },
            { id: 'normal', label: 'Balanced (Standard)' },
            { id: 'compact', label: 'Compact (Long CV)' },
          ].map((mode) => {
            const active = (data.spacingDensity || 'auto') === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => updateField('spacingDensity', mode.id)}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Career Quick Auto-Convert Bar with Trades & Services */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200/80 rounded-xl p-3.5 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
          <span className="font-bold text-blue-950 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Instant Career Auto-Fill (All Job Titles):</span>
          </span>
          <span className="text-blue-700 text-[11px] font-medium">1-Click converts full summary, experience & skills</span>
        </div>

        {/* Trades & Automotive Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-1.5 py-0.5 rounded">
            ⚡ Trades, Automotive & Services:
          </span>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {[
              'plumber',
              'car-mechanic',
              'car-washer',
              'electrician-tech',
              'hvac-technician',
              'heavy-equipment-operator',
              'professional-driver',
              'welder-fabricator',
              'carpenter',
              'security-guard',
              'warehouse-worker',
              'commercial-cleaner',
              'barber-stylist',
            ].map((id) => {
              const prof = JOB_PROFILES.find((p) => p.id === id);
              if (!prof) return null;
              return (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => handleApplyJobProfile(prof)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-emerald-600 hover:text-white text-stone-800 rounded-md border border-stone-200 shadow-2xs transition"
                >
                  {prof.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Engineering & Medical Section */}
        <div className="space-y-1 pt-1 border-t border-blue-200/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-1.5 py-0.5 rounded">
            💼 Professional, Engineering & Medical:
          </span>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {[
              'civil-engineer',
              'software-engineer',
              'doctor-physician',
              'registered-nurse',
              'accountant-finance',
            ].map((id) => {
              const prof = JOB_PROFILES.find((p) => p.id === id);
              if (!prof) return null;
              return (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => handleApplyJobProfile(prof)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-blue-600 hover:text-white text-stone-800 rounded-md border border-stone-200 shadow-2xs transition"
                >
                  {prof.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1,000 Templates & Infinite Style Switcher Bar */}
      <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: currentStyle.colors.previewHex }}
            />
            <span className="text-xs font-bold text-stone-900">
              Style #{currentStyle.number} of 1,000:
            </span>
            <span className="text-xs text-stone-600 font-medium">
              {currentStyle.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick button to activate Top-to-Bottom Color Left */}
            <button
              type="button"
              onClick={() => {
                updateField('layoutOverride', 'full-height-sidebar');
                updateField('photoPosition', 'sidebar');
                setAiNotice('🎨 Activated Top-to-Bottom Colored Left Sidebar with Image!');
                setTimeout(() => setAiNotice(null), 3500);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                (data.layoutOverride || currentStyle.layout) === 'full-height-sidebar'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Activate full top-to-bottom colored left sidebar with image"
            >
              <span>⭐ Top-to-Bottom Color Left</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdvancedStyle(!showAdvancedStyle)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                showAdvancedStyle
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>

            <button
              type="button"
              onClick={onOpenStylesModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-stone-100 text-blue-700 border border-stone-300 rounded-lg text-xs font-semibold transition"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              <span>1000 Styles</span>
            </button>
          </div>
        </div>

        {/* Stepper & Number Direct Jump */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200/60">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevStyle}
              className="px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded text-xs flex items-center gap-1 transition"
              title="Previous style (1-1000)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={handleNextStyle}
              className="px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded text-xs flex items-center gap-1 transition"
              title="Next style (1-1000)"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRandomStyle}
              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs flex items-center gap-1 transition"
              title="Random template (1 to 1000)"
            >
              <Dice5 className="w-3.5 h-3.5" />
              <span>Surprise Me</span>
            </button>
          </div>

          {/* Jump directly to any template #1 to #1000 */}
          <form onSubmit={handleJumpToTemplateNumber} className="flex items-center gap-1">
            <span className="text-[11px] text-stone-500">Jump to #</span>
            <input
              type="number"
              min="1"
              max="1000"
              placeholder="e.g. 742"
              value={templateNumberInput}
              onChange={(e) => setTemplateNumberInput(e.target.value)}
              className="w-18 px-2 py-0.5 text-xs rounded border border-stone-300 bg-white"
            />
            <button
              type="submit"
              className="px-2 py-0.5 bg-stone-800 text-white rounded text-xs font-medium hover:bg-stone-900"
            >
              Go
            </button>
          </form>
        </div>

        {/* Advanced Interface Customizer (Image Location, Layout, Typography) */}
        {showAdvancedStyle && (
          <div className="pt-3 border-t border-stone-200 space-y-3.5 animate-in fade-in duration-200">
            {/* Image Location Changer */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Profile Image Location</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
                {(
                  [
                    { id: 'left', label: 'Top Left' },
                    { id: 'center', label: 'Centered' },
                    { id: 'right', label: 'Top Right' },
                    { id: 'sidebar', label: 'Sidebar' },
                    { id: 'hidden', label: 'Hide Photo (ATS)' },
                  ] as const
                ).map((pos) => {
                  const active = (data.photoPosition || 'left') === pos.id;
                  return (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => updateField('photoPosition', pos.id as PhotoPosition)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {pos.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout Architecture Changer */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Columns className="w-3.5 h-3.5 text-blue-600" />
                <span>Layout Architecture</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {(
                  [
                    { id: 'full-height-sidebar', label: '⭐ Top-to-Bottom Color Left (with Image)' },
                    { id: 'single-column', label: 'Single Column' },
                    { id: 'left-sidebar', label: 'Left Sidebar (30/70)' },
                    { id: 'right-sidebar', label: 'Right Sidebar (70/30)' },
                    { id: 'timeline', label: 'Timeline Track' },
                    { id: 'top-banner', label: 'Top Banner' },
                    { id: 'minimal-ats', label: 'Minimal ATS' },
                  ] as const
                ).map((lay) => {
                  const active = (data.layoutOverride || currentStyle.layout) === lay.id;
                  return (
                    <button
                      key={lay.id}
                      type="button"
                      onClick={() => updateField('layoutOverride', lay.id as LayoutStructure)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {lay.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Font Changer */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Type className="w-3.5 h-3.5 text-blue-600" />
                <span>Typography Style</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(
                  [
                    { id: 'sans', label: 'Modern Sans', font: 'font-sans' },
                    { id: 'serif', label: 'Editorial Serif', font: 'font-serif' },
                    { id: 'mono', label: 'Tech Monospace', font: 'font-mono' },
                  ] as const
                ).map((f) => {
                  const active = (data.fontOverride || currentStyle.font) === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => updateField('fontOverride', f.id as FontTheme)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${f.font} ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Basic Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Muhammad Faisal"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
          />
        </div>

        {/* Job Title with Smart Career Auto-Suggest */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="job" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Job Title
            </label>
            <span className="text-[10px] text-blue-600 font-medium">Type for smart auto-fill</span>
          </div>
          <input
            id="job"
            type="text"
            placeholder="e.g. Civil Engineer, Doctor, Software Engineer..."
            value={data.job}
            onFocus={() => setShowJobSuggestions(true)}
            onChange={(e) => {
              updateField('job', e.target.value);
              setShowJobSuggestions(true);
            }}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
          />

          {/* Autocomplete Career Dropdown */}
          {showJobSuggestions && matchingJobs.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 z-30 overflow-hidden max-h-60 overflow-y-auto">
              <div className="p-2 bg-stone-50 border-b border-stone-100 text-[11px] font-semibold text-stone-500 flex items-center justify-between">
                <span>Auto-convert full CV to this career:</span>
                <button
                  type="button"
                  onClick={() => setShowJobSuggestions(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              </div>
              {matchingJobs.map((prof) => (
                <div
                  key={prof.id}
                  onClick={() => handleApplyJobProfile(prof)}
                  className="p-2.5 hover:bg-blue-50 cursor-pointer border-b border-stone-50 flex items-center justify-between transition"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{prof.title}</div>
                    <div className="text-[10px] text-stone-500">{prof.category}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Convert CV
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+966 5XXXXXXXX"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
          />
        </div>

        {/* Worldwide Location with Smart Hierarchical Auto-Completion */}
        <div className="sm:col-span-2 relative">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="location" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Location (Worldwide Auto-Completion & Manual)</span>
            </label>
            <span className="text-[10px] text-blue-600 font-medium">
              e.g. type &ldquo;arak&rdquo; for Karak, KPK, Pakistan
            </span>
          </div>
          <div className="relative">
            <input
              id="location"
              type="text"
              placeholder="e.g. Karak, KPK, Pakistan or Riyadh, Saudi Arabia"
              value={data.location}
              onFocus={() => setShowLocationSuggestions(true)}
              onChange={(e) => {
                updateField('location', e.target.value);
                setShowLocationSuggestions(true);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
            />
            {data.location && (
              <button
                type="button"
                onClick={() => updateField('location', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Suggestions Dropdown */}
          {showLocationSuggestions && locationMatches.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-stone-200 z-40 overflow-hidden max-h-64 overflow-y-auto">
              <div className="p-2 bg-stone-50 border-b border-stone-100 text-[11px] font-semibold text-stone-500 flex items-center justify-between">
                <span>Select Hierarchical Location:</span>
                <button
                  type="button"
                  onClick={() => setShowLocationSuggestions(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              </div>
              {locationMatches.map((loc, idx) => (
                <div
                  key={`${loc.city}-${loc.region}-${idx}`}
                  onClick={() => handleSelectLocation(loc)}
                  className="p-2.5 hover:bg-blue-50 cursor-pointer border-b border-stone-50 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {loc.city} <span className="font-normal text-stone-500">• {loc.region}</span>
                      </div>
                      <div className="text-[11px] text-blue-700 font-medium">{loc.country}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-0.5 rounded transition">
                    Auto-Fill
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Photo */}
      <div className="pt-2">
        <label htmlFor="photo" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Profile Photo
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 border border-dashed border-stone-300 rounded-lg bg-stone-50/60">
          {data.photoUrl ? (
            <div className="relative group shrink-0">
              <img
                src={data.photoUrl}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow transition"
                title="Remove photo"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-stone-200 border-2 border-stone-300 flex items-center justify-center text-stone-400 shrink-0">
              <Upload className="w-6 h-6" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <input
              id="photo"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Supports JPG, PNG, WebP (Max 5MB). Photo location can be customized above.
            </p>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="about" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            About Me / Professional Summary
          </label>
          <button
            type="button"
            onClick={() => handleAiEnhance('about')}
            disabled={aiLoadingField === 'about'}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-0.5 rounded transition disabled:opacity-50"
            title="Use AI to polish and rewrite your professional summary"
          >
            {aiLoadingField === 'about' ? (
              <Loader2 className="w-3 h-3 animate-spin text-purple-700" />
            ) : (
              <Sparkles className="w-3 h-3 text-purple-600" />
            )}
            <span>Enhance with AI</span>
          </button>
        </div>
        <textarea
          id="about"
          rows={3}
          placeholder="Write something about yourself"
          value={data.about}
          onChange={(e) => updateField('about', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
        />
      </div>

      {/* Work Experience */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="experience" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Work Experience
          </label>
          <button
            type="button"
            onClick={() => handleAiEnhance('experience')}
            disabled={aiLoadingField === 'experience'}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-0.5 rounded transition disabled:opacity-50"
            title="Use AI to polish your work experience into impactful bullet points"
          >
            {aiLoadingField === 'experience' ? (
              <Loader2 className="w-3 h-3 animate-spin text-purple-700" />
            ) : (
              <Sparkles className="w-3 h-3 text-purple-600" />
            )}
            <span>Enhance with AI</span>
          </button>
        </div>
        <textarea
          id="experience"
          rows={5}
          placeholder={`Example:
Civil Engineer
ABC Construction Company, Riyadh
2024 - Present
• Responsibility 1
• Responsibility 2`}
          value={data.experience}
          onChange={(e) => updateField('experience', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
        />
      </div>

      {/* Education */}
      <div>
        <label htmlFor="education" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Education
        </label>
        <textarea
          id="education"
          rows={4}
          placeholder={`Example:
BS Civil Engineering
University Name
2020 - 2024`}
          value={data.education}
          onChange={(e) => updateField('education', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
        />
      </div>

      {/* Skills & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Skills
          </label>
          <textarea
            id="skills"
            rows={4}
            placeholder={`AutoCAD
Revit
MS Office
Project Management`}
            value={data.skills}
            onChange={(e) => updateField('skills', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
          />
          <p className="text-[11px] text-stone-400 mt-1">One skill per line</p>
        </div>

        {/* Languages: Full Auto Selection System + Manual Textarea Mode */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="languages" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <LanguagesIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Languages</span>
            </label>
            {/* Mode Switcher: Auto vs Manual */}
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-md border border-stone-200 text-[11px]">
              <button
                type="button"
                onClick={() => setLanguageMode('auto')}
                className={`px-2 py-0.5 rounded font-medium transition ${
                  languageMode === 'auto'
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Auto Selection
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('manual')}
                className={`px-2 py-0.5 rounded font-medium transition ${
                  languageMode === 'manual'
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Manual Text
              </button>
            </div>
          </div>

          {/* AUTO SELECTION SYSTEM */}
          {languageMode === 'auto' ? (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
              {/* Language Selection Row */}
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedLangName}
                  onChange={(e) => setSelectedLangName(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-md border border-stone-300 text-xs bg-white text-stone-800"
                >
                  {WORLD_LANGUAGES.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
                <select
                  value={selectedProficiency}
                  onChange={(e) => setSelectedProficiency(e.target.value)}
                  className="w-full sm:w-36 px-2 py-1.5 rounded-md border border-stone-300 text-xs bg-white text-stone-800"
                >
                  {PROFICIENCY_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Quick Add Regional Languages */}
              <div className="flex flex-wrap gap-1 text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700 mr-0.5">Quick Add:</span>
                {[
                  { name: 'English', prof: 'Fluent' },
                  { name: 'Urdu', prof: 'Native' },
                  { name: 'Pashto', prof: 'Native' },
                  { name: 'Arabic', prof: 'Fluent' },
                  { name: 'Punjabi', prof: 'Native' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleQuickAddLanguage(item.name, item.prof)}
                    className="px-1.5 py-0.5 bg-white hover:bg-blue-100 text-stone-700 rounded border border-stone-200 transition text-[10px]"
                  >
                    + {item.name}
                  </button>
                ))}
              </div>

              {/* Selected Language Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Active Languages ({parsedLanguages.length}):
                </span>
                {parsedLanguages.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">No languages added yet. Use dropdown above.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {parsedLanguages.map((l) => (
                      <span
                        key={l.id}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-stone-300 text-xs font-medium text-stone-800 shadow-2xs"
                      >
                        <Globe2 className="w-3 h-3 text-blue-600" />
                        <span>{l.name}</span>
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-1 py-0.2 rounded">
                          {l.proficiency}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(l.name)}
                          className="text-stone-400 hover:text-red-600 transition"
                          title="Remove language"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hidden textarea with exact user id="languages" for 100% strict test & DOM compatibility */}
              <textarea
                id="languages"
                value={data.languages}
                onChange={(e) => updateField('languages', e.target.value)}
                className="hidden"
              />
            </div>
          ) : (
            /* MANUAL TEXTAREA MODE */
            <div>
              <textarea
                id="languages"
                rows={4}
                placeholder={`English
Arabic
Urdu`}
                value={data.languages}
                onChange={(e) => updateField('languages', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-stone-400 bg-white"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                One language per line (e.g. &ldquo;English (Fluent)&rdquo; or &ldquo;Urdu (Native)&rdquo;)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Template Select Dropdown matching exact user id="template" */}
      <div className="pt-2 border-t border-stone-100 space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="template" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Template (1,000 Templates Available)
          </label>
          <button
            type="button"
            onClick={onOpenStylesModal}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Open 1,000 Gallery
          </button>
        </div>
        <select
          id="template"
          value={data.template}
          onChange={(e) => updateField('template', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-white"
        >
          <optgroup label="Featured Layouts">
            <option value="template-1">#1 Top-to-Bottom Color Left Sidebar (Executive Navy)</option>
            <option value="template-3">#3 Top-to-Bottom Color Left Sidebar (Emerald Forest)</option>
            <option value="template-4">#4 Top-to-Bottom Color Left Sidebar (Regal Crimson)</option>
            <option value="template-5">#5 Top-to-Bottom Color Left Sidebar (Silicon Cobalt)</option>
            <option value="blue">Professional Blue</option>
            <option value="black">Classic Black (ATS Minimal)</option>
            <option value="green">Modern Green</option>
          </optgroup>
          <optgroup label="Popular Presets (1-1000)">
            <option value="executive-slate">#4 Executive Slate</option>
            <option value="silicon-valley">#17 Silicon Valley</option>
            <option value="creative-coral">#31 Creative Coral</option>
            <option value="ats-pure-white">#46 ATS Pure White</option>
            <option value="clinical-white">#61 Clinical White</option>
            <option value="fintech-mint">#72 FinTech Mint</option>
            <option value="wall-street">#86 Wall Street</option>
            <option value="template-250">#250 Modern Amber Minimal</option>
            <option value="template-500">#500 Executive Crimson Grid</option>
            <option value="template-750">#750 Cyber Cyan Timeline</option>
            <option value="template-1000">#1000 Sovereign Platinum Top</option>
          </optgroup>
        </select>
      </div>

      {/* Print CV & Create PDF Buttons */}
      <div className="pt-3 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onDirectPrint || onDownload}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 text-sm sm:text-base cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Print CV</span>
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 text-sm sm:text-base cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Create PDF</span>
          </button>
        </div>
        <p className="text-center text-xs text-stone-500">
          Standard <strong className="font-semibold text-stone-700">A4 Portrait</strong> layout. Choose &ldquo;Save as PDF&rdquo; in the print dialog to export high-quality vector PDF.
        </p>
      </div>
    </div>
  );
}
