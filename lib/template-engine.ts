import { CV_STYLES, CVStyle, LayoutStructure, FontTheme, StyleCategory } from './cv-styles';

export type PhotoPosition = 'left' | 'right' | 'center' | 'sidebar' | 'hidden';

export interface StyleCustomization {
  photoPosition: PhotoPosition;
  layout: LayoutStructure;
  font: FontTheme;
  colorSchemeId: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  category: StyleCategory;
  hex: string;
  headerBg: string;
  headerText: string;
  headerJob: string;
  headerContact: string;
  sectionTitle: string;
  sectionLine: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  cardBorder: string;
  sidebarBg?: string;
  sidebarBorder?: string;
  accentDot?: string;
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: 'deep-navy',
    name: 'Executive Navy',
    category: 'Executive',
    hex: '#1e3a8a',
    headerBg: 'bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900',
    headerText: 'text-white',
    headerJob: 'text-blue-200',
    headerContact: 'text-blue-100',
    sectionTitle: 'text-blue-950 border-blue-600',
    sectionLine: 'border-b-2 border-blue-600',
    tagBg: 'bg-blue-50',
    tagBorder: 'border-blue-200',
    tagText: 'text-blue-900',
    cardBorder: 'border-slate-200',
    sidebarBg: 'bg-blue-50/30',
    sidebarBorder: 'border-blue-100',
  },
  {
    id: 'classic-onyx',
    name: 'Classic Onyx',
    category: 'ATS Minimal',
    hex: '#0f172a',
    headerBg: 'bg-stone-950',
    headerText: 'text-stone-100',
    headerJob: 'text-stone-300',
    headerContact: 'text-stone-300',
    sectionTitle: 'text-stone-950 border-stone-900',
    sectionLine: 'border-b border-stone-900',
    tagBg: 'bg-stone-100',
    tagBorder: 'border-stone-300',
    tagText: 'text-stone-900',
    cardBorder: 'border-stone-300',
    sidebarBg: 'bg-stone-50',
    sidebarBorder: 'border-stone-200',
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    category: 'Modern Startup',
    hex: '#065f46',
    headerBg: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900',
    headerText: 'text-white',
    headerJob: 'text-emerald-200',
    headerContact: 'text-emerald-100',
    sectionTitle: 'text-emerald-950 border-emerald-600',
    sectionLine: 'border-b-2 border-emerald-600',
    tagBg: 'bg-emerald-50',
    tagBorder: 'border-emerald-200',
    tagText: 'text-emerald-900',
    cardBorder: 'border-emerald-100',
    sidebarBg: 'bg-emerald-50/40',
    sidebarBorder: 'border-emerald-100',
  },
  {
    id: 'ruby-crimson',
    name: 'Regal Crimson',
    category: 'Executive',
    hex: '#881337',
    headerBg: 'bg-gradient-to-r from-rose-950 to-pink-950',
    headerText: 'text-white',
    headerJob: 'text-rose-200',
    headerContact: 'text-rose-100',
    sectionTitle: 'text-rose-950 border-rose-700',
    sectionLine: 'border-b-2 border-rose-700',
    tagBg: 'bg-rose-50',
    tagBorder: 'border-rose-200',
    tagText: 'text-rose-900',
    cardBorder: 'border-rose-100',
    sidebarBg: 'bg-rose-50/30',
    sidebarBorder: 'border-rose-100',
  },
  {
    id: 'tech-cobalt',
    name: 'Silicon Cobalt',
    category: 'Tech & Engineering',
    hex: '#2563eb',
    headerBg: 'bg-blue-600',
    headerText: 'text-white',
    headerJob: 'text-blue-100',
    headerContact: 'text-blue-50',
    sectionTitle: 'text-blue-900 border-blue-500',
    sectionLine: 'border-b-2 border-blue-500',
    tagBg: 'bg-blue-50',
    tagBorder: 'border-blue-200',
    tagText: 'text-blue-800',
    cardBorder: 'border-blue-100',
    sidebarBg: 'bg-slate-50',
    sidebarBorder: 'border-slate-200',
  },
  {
    id: 'cyber-terminal',
    name: 'Cyber Terminal',
    category: 'Tech & Engineering',
    hex: '#10b981',
    headerBg: 'bg-black',
    headerText: 'text-emerald-400 font-mono',
    headerJob: 'text-emerald-300 font-mono',
    headerContact: 'text-stone-300 font-mono',
    sectionTitle: 'text-emerald-950 border-emerald-500 font-mono',
    sectionLine: 'border-b-2 border-emerald-500',
    tagBg: 'bg-emerald-950/20 font-mono',
    tagBorder: 'border-emerald-300',
    tagText: 'text-emerald-900',
    cardBorder: 'border-emerald-200',
    sidebarBg: 'bg-stone-900 text-stone-100',
    sidebarBorder: 'border-stone-800',
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    category: 'Creative & Design',
    hex: '#d97706',
    headerBg: 'bg-gradient-to-r from-amber-600 to-orange-600',
    headerText: 'text-white',
    headerJob: 'text-amber-100',
    headerContact: 'text-amber-50',
    sectionTitle: 'text-amber-950 border-amber-500',
    sectionLine: 'border-b-2 border-amber-500',
    tagBg: 'bg-amber-50',
    tagBorder: 'border-amber-200',
    tagText: 'text-amber-900',
    cardBorder: 'border-amber-100',
    sidebarBg: 'bg-amber-50/40',
    sidebarBorder: 'border-amber-100',
  },
  {
    id: 'amethyst-royal',
    name: 'Amethyst Royal',
    category: 'Executive',
    hex: '#7c3aed',
    headerBg: 'bg-gradient-to-r from-purple-950 via-indigo-900 to-violet-950',
    headerText: 'text-white',
    headerJob: 'text-purple-200',
    headerContact: 'text-purple-100',
    sectionTitle: 'text-purple-950 border-purple-600',
    sectionLine: 'border-b-2 border-purple-600',
    tagBg: 'bg-purple-50',
    tagBorder: 'border-purple-200',
    tagText: 'text-purple-950',
    cardBorder: 'border-purple-100',
    sidebarBg: 'bg-purple-50/30',
    sidebarBorder: 'border-purple-100',
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate',
    category: 'ATS Minimal',
    hex: '#475569',
    headerBg: 'bg-slate-900',
    headerText: 'text-white',
    headerJob: 'text-slate-300',
    headerContact: 'text-slate-300',
    sectionTitle: 'text-slate-900 border-slate-700',
    sectionLine: 'border-b-2 border-slate-700',
    tagBg: 'bg-slate-100',
    tagBorder: 'border-slate-300',
    tagText: 'text-slate-900',
    cardBorder: 'border-slate-200',
    sidebarBg: 'bg-slate-50',
    sidebarBorder: 'border-slate-200',
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    category: 'Modern Startup',
    hex: '#0f766e',
    headerBg: 'bg-teal-900',
    headerText: 'text-white',
    headerJob: 'text-teal-200',
    headerContact: 'text-teal-100',
    sectionTitle: 'text-teal-950 border-teal-600',
    sectionLine: 'border-b-2 border-teal-600',
    tagBg: 'bg-teal-50',
    tagBorder: 'border-teal-200',
    tagText: 'text-teal-900',
    cardBorder: 'border-teal-100',
    sidebarBg: 'bg-teal-50/40',
    sidebarBorder: 'border-teal-100',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    category: 'Legal & Finance',
    hex: '#b45309',
    headerBg: 'bg-stone-950 border-b border-amber-500',
    headerText: 'text-amber-100',
    headerJob: 'text-amber-300',
    headerContact: 'text-stone-300',
    sectionTitle: 'text-stone-950 border-amber-600',
    sectionLine: 'border-b-2 border-amber-600',
    tagBg: 'bg-amber-50',
    tagBorder: 'border-amber-200',
    tagText: 'text-amber-950',
    cardBorder: 'border-stone-300',
    sidebarBg: 'bg-amber-50/20',
    sidebarBorder: 'border-amber-200',
  },
  {
    id: 'pure-white-ats',
    name: 'Harvard Pure White',
    category: 'ATS Minimal',
    hex: '#18181b',
    headerBg: 'bg-white border-b-2 border-black',
    headerText: 'text-black',
    headerJob: 'text-stone-700',
    headerContact: 'text-stone-600',
    sectionTitle: 'text-black border-black',
    sectionLine: 'border-b border-black',
    tagBg: 'bg-transparent',
    tagBorder: 'border-stone-400',
    tagText: 'text-stone-900',
    cardBorder: 'border-stone-300',
    sidebarBg: 'bg-stone-50',
    sidebarBorder: 'border-stone-200',
  },
  {
    id: 'terracotta-warm',
    name: 'Terracotta Earth',
    category: 'Creative & Design',
    hex: '#9a3412',
    headerBg: 'bg-orange-950',
    headerText: 'text-orange-50',
    headerJob: 'text-orange-200',
    headerContact: 'text-orange-100',
    sectionTitle: 'text-orange-950 border-orange-600',
    sectionLine: 'border-b-2 border-orange-600',
    tagBg: 'bg-orange-50',
    tagBorder: 'border-orange-200',
    tagText: 'text-orange-900',
    cardBorder: 'border-orange-100',
    sidebarBg: 'bg-orange-50/40',
    sidebarBorder: 'border-orange-100',
  },
  {
    id: 'fuchsia-unicorn',
    name: 'Unicorn Fuchsia',
    category: 'Modern Startup',
    hex: '#d946ef',
    headerBg: 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600',
    headerText: 'text-white',
    headerJob: 'text-purple-100',
    headerContact: 'text-purple-50',
    sectionTitle: 'text-purple-950 border-pink-500',
    sectionLine: 'border-b-2 border-pink-500',
    tagBg: 'bg-purple-50',
    tagBorder: 'border-purple-200',
    tagText: 'text-purple-900',
    cardBorder: 'border-purple-100',
    sidebarBg: 'bg-purple-50/20',
    sidebarBorder: 'border-purple-100',
  },
  {
    id: 'clinical-sky',
    name: 'Clinical Sky',
    category: 'Medical & Academic',
    hex: '#0284c7',
    headerBg: 'bg-sky-800',
    headerText: 'text-white',
    headerJob: 'text-sky-100',
    headerContact: 'text-sky-50',
    sectionTitle: 'text-sky-950 border-sky-600',
    sectionLine: 'border-b-2 border-sky-600',
    tagBg: 'bg-sky-50',
    tagBorder: 'border-sky-200',
    tagText: 'text-sky-900',
    cardBorder: 'border-sky-100',
    sidebarBg: 'bg-sky-50/30',
    sidebarBorder: 'border-sky-100',
  },
  {
    id: 'tokyo-cyber',
    name: 'Cyber Magenta',
    category: 'Creative & Design',
    hex: '#ec4899',
    headerBg: 'bg-slate-950',
    headerText: 'text-pink-400',
    headerJob: 'text-slate-300',
    headerContact: 'text-slate-400',
    sectionTitle: 'text-slate-950 border-pink-500',
    sectionLine: 'border-b-2 border-pink-500',
    tagBg: 'bg-pink-50',
    tagBorder: 'border-pink-200',
    tagText: 'text-pink-900',
    cardBorder: 'border-slate-200',
    sidebarBg: 'bg-slate-900',
    sidebarBorder: 'border-slate-800',
  },
];

const LAYOUT_VARIANTS: LayoutStructure[] = [
  'full-height-sidebar', // Top-to-bottom colored left sidebar with image
  'single-column',
  'left-sidebar',
  'right-sidebar',
  'timeline',
  'top-banner',
  'minimal-ats',
];

const FONT_VARIANTS: FontTheme[] = ['sans', 'serif', 'mono'];
const PHOTO_VARIANTS: PhotoPosition[] = ['left', 'right', 'center', 'sidebar', 'hidden'];

/**
 * Procedural Deterministic Generator for 1,000 Distinct Templates (#1 to #1000)
 */
export function generatePreset(number: number): CVStyle & { photoPosition: PhotoPosition } {
  // If in the original 100 range, return base with enriched attributes
  const base100 = CV_STYLES.find(s => s.number === number);
  const colorIndex = (number - 1) % COLOR_SCHEMES.length;
  const color = COLOR_SCHEMES[colorIndex];
  const layoutIndex = Math.floor((number - 1) / COLOR_SCHEMES.length) % LAYOUT_VARIANTS.length;
  const layout = LAYOUT_VARIANTS[layoutIndex];
  const fontIndex = Math.floor((number - 1) / (COLOR_SCHEMES.length * LAYOUT_VARIANTS.length)) % FONT_VARIANTS.length;
  const font = FONT_VARIANTS[fontIndex];
  const photoIndex = (number * 3) % PHOTO_VARIANTS.length;
  const photoPosition = layout === 'full-height-sidebar' ? 'sidebar' : PHOTO_VARIANTS[photoIndex];

  if (base100) {
    return {
      ...base100,
      photoPosition: base100.layout === 'left-sidebar' ? 'left' : 'left',
    };
  }

  // Procedural preset for 101 to 1000
  const layoutName = layout.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const fontName = font.charAt(0).toUpperCase() + font.slice(1);
  const photoName = photoPosition === 'hidden' ? 'ATS No-Photo' : `${photoPosition.charAt(0).toUpperCase() + photoPosition.slice(1)} Avatar`;

  return {
    id: `template-${number}`,
    number,
    name: `${color.name} ${layoutName}`,
    category: color.category,
    description: `Preset #${number}: ${color.name} color palette paired with ${layoutName} layout and ${fontName} typography (${photoName}).`,
    layout,
    font,
    photoPosition,
    colors: {
      ...color,
      previewHex: color.hex,
    },
  };
}

/**
 * Lookup template by ID, string key, or number (1 to 1000)
 */
export function resolveTemplate(templateId: string): CVStyle & { photoPosition: PhotoPosition } {
  // If it's a number string (e.g. "450" or "template-450")
  const numMatch = templateId.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0], 10);
    if (num >= 1 && num <= 1000) {
      return generatePreset(num);
    }
  }

  // Check 100 static styles
  const found = CV_STYLES.find(s => s.id === templateId);
  if (found) {
    return {
      ...found,
      photoPosition: 'left',
    };
  }

  // Fallbacks
  if (templateId === 'blue') return generatePreset(1);
  if (templateId === 'black') return generatePreset(2);
  if (templateId === 'green') return generatePreset(3);

  return generatePreset(1);
}
