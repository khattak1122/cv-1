import { CVData } from '@/types/cv';
import { LayoutStructure } from './cv-styles';

export type CVDensityLevel = 'spacious' | 'normal' | 'compact' | 'dense';

export interface CVDensityConfig {
  level: CVDensityLevel;
  // Margins in mm and CSS classes
  pageMarginMm: { top: number; bottom: number; left: number; right: number };
  containerPaddingClass: string;
  sidebarPaddingClass: string;
  mainPaddingClass: string;
  headerPaddingClass: string;
  // Header elements
  nameFontSize: string;
  namePt: number;
  jobTitleFontSize: string;
  jobPt: number;
  contactFontSize: string;
  contactPt: number;
  avatarSize: string;
  // Headings
  sectionHeadingClass: string;
  sectionHeadingPt: number;
  sectionHeadingMarginBottom: string;
  sectionHeadingPaddingBottom: string;
  // Section spacing
  sectionSpacingClass: string;
  sectionSpacingPx: number;
  // Body text
  bodyFontSize: string;
  bodyPt: number;
  bodyLineHeight: string;
  // Summary
  summaryFontSize: string;
  summaryLineHeight: string;
  summarySpacing: string;
  // Experience / Education entries
  jobSpacingClass: string;
  jobSpacingPx: number;
  jobTitleSize: string;
  jobCompanySize: string;
  jobDateSize: string;
  bulletSpacingClass: string;
  bulletLineHeight: string;
  // Skills / Languages
  skillsGapClass: string;
  skillChipClass: string;
  skillChipPadding: string;
  skillChipText: string;
}

/**
 * Intelligent algorithm to evaluate content density and select optimal typography & spacing
 */
export function calculateCVDensity(
  data: CVData,
  layout: LayoutStructure,
  forcedDensity?: 'auto' | 'spacious' | 'normal' | 'compact'
): CVDensityConfig {
  // If user explicitly chose a density override in settings
  const explicit = forcedDensity || data.spacingDensity;
  if (explicit && explicit !== 'auto') {
    return getPresetDensity(explicit as CVDensityLevel);
  }

  // Calculate content volume
  const aboutText = (data.about || '').trim();
  const expText = (data.experience || '').trim();
  const eduText = (data.education || '').trim();
  const skillsText = (data.skills || '').trim();
  const langText = (data.languages || '').trim();

  const aboutWords = aboutText ? aboutText.split(/\s+/).length : 0;
  const expLines = expText ? expText.split('\n').filter(l => l.trim().length > 0).length : 0;
  const eduLines = eduText ? eduText.split('\n').filter(l => l.trim().length > 0).length : 0;
  const skillsCount = skillsText ? skillsText.split(/[\n,]+/).filter(s => s.trim().length > 0).length : 0;
  const langCount = langText ? langText.split('\n').filter(s => s.trim().length > 0).length : 0;

  // In sidebar layouts, skills & languages live on the side, leaving more room in the main column
  const isSidebarLayout = layout === 'full-height-sidebar' || layout === 'left-sidebar' || layout === 'right-sidebar';

  // Compute estimated line weight
  let mainColumnUnits = 0;
  // Summary: ~14 words per line in main column, ~10 in 2-column
  mainColumnUnits += Math.ceil(aboutWords / (isSidebarLayout ? 11 : 16)) + 2; // +2 for section heading

  // Experience: each line is an entry or bullet
  mainColumnUnits += expLines + 3; // +3 for section heading & spacing

  // Education: each line
  mainColumnUnits += eduLines + 2;

  // If single column or timeline, skills & languages add to the vertical height of main column
  if (!isSidebarLayout) {
    mainColumnUnits += Math.ceil(skillsCount / 4) + Math.ceil(langCount / 3) + 4;
  }

  // Choose level based on calculated visual weight
  // Short CV: < 24 visual units (1-2 jobs, brief summary)
  // Medium CV: 24 - 38 visual units (2-3 jobs, full summary)
  // Long CV: 39 - 52 visual units (3-4 jobs, extensive bullets)
  // Dense CV: > 52 visual units (5+ jobs or massive text)
  if (mainColumnUnits <= 24) {
    return getPresetDensity('spacious');
  } else if (mainColumnUnits <= 38) {
    return getPresetDensity('normal');
  } else if (mainColumnUnits <= 52) {
    return getPresetDensity('compact');
  } else {
    return getPresetDensity('dense');
  }
}

function getPresetDensity(level: CVDensityLevel): CVDensityConfig {
  switch (level) {
    case 'spacious':
      return {
        level: 'spacious',
        pageMarginMm: { top: 15, bottom: 15, left: 16, right: 16 },
        containerPaddingClass: 'p-6 sm:p-8',
        sidebarPaddingClass: 'p-6 sm:p-7 space-y-6',
        mainPaddingClass: 'p-6 sm:p-8 space-y-6',
        headerPaddingClass: 'p-6 sm:p-8',
        nameFontSize: 'text-2xl sm:text-3xl font-extrabold',
        namePt: 24,
        jobTitleFontSize: 'text-sm sm:text-base font-bold',
        jobPt: 12.5,
        contactFontSize: 'text-xs sm:text-[13px]',
        contactPt: 10,
        avatarSize: 'w-24 h-24 sm:w-28 sm:h-28',
        sectionHeadingClass: 'text-[13px] sm:text-[14px] font-bold tracking-wider uppercase',
        sectionHeadingPt: 13,
        sectionHeadingMarginBottom: 'mb-3',
        sectionHeadingPaddingBottom: 'pb-1.5',
        sectionSpacingClass: 'space-y-6 mb-6',
        sectionSpacingPx: 24,
        bodyFontSize: 'text-[13px] sm:text-[14px]',
        bodyPt: 11,
        bodyLineHeight: 'leading-relaxed', // ~1.55
        summaryFontSize: 'text-[13.5px] sm:text-[14.5px]',
        summaryLineHeight: 'leading-relaxed',
        summarySpacing: 'mb-4',
        jobSpacingClass: 'space-y-4 mb-4',
        jobSpacingPx: 16,
        jobTitleSize: 'text-[14px] sm:text-[15px] font-bold text-stone-900',
        jobCompanySize: 'text-[12.5px] sm:text-[13px] font-semibold text-stone-700',
        jobDateSize: 'text-[11.5px] sm:text-[12px] font-medium text-stone-500',
        bulletSpacingClass: 'my-1.5',
        bulletLineHeight: 'leading-normal', // ~1.4
        skillsGapClass: 'gap-2 mt-2',
        skillChipClass: 'text-xs font-semibold px-2.5 py-1 rounded-md shadow-2xs',
        skillChipPadding: 'px-2.5 py-1',
        skillChipText: 'text-xs',
      };

    case 'normal':
      return {
        level: 'normal',
        pageMarginMm: { top: 13, bottom: 13, left: 15, right: 15 },
        containerPaddingClass: 'p-5 sm:p-7',
        sidebarPaddingClass: 'p-5 sm:p-6 space-y-5',
        mainPaddingClass: 'p-5 sm:p-7 space-y-5',
        headerPaddingClass: 'p-5 sm:p-7',
        nameFontSize: 'text-xl sm:text-2xl font-extrabold',
        namePt: 21,
        jobTitleFontSize: 'text-xs sm:text-sm font-semibold',
        jobPt: 11.5,
        contactFontSize: 'text-[11.5px] sm:text-xs',
        contactPt: 9.5,
        avatarSize: 'w-20 h-20 sm:w-24 sm:h-24',
        sectionHeadingClass: 'text-[12px] sm:text-[13px] font-bold tracking-wider uppercase',
        sectionHeadingPt: 12,
        sectionHeadingMarginBottom: 'mb-2.5',
        sectionHeadingPaddingBottom: 'pb-1',
        sectionSpacingClass: 'space-y-4.5 mb-4.5',
        sectionSpacingPx: 18,
        bodyFontSize: 'text-[12px] sm:text-[12.5px]',
        bodyPt: 10,
        bodyLineHeight: 'leading-relaxed', // ~1.45
        summaryFontSize: 'text-[12.5px] sm:text-[13px]',
        summaryLineHeight: 'leading-relaxed',
        summarySpacing: 'mb-3',
        jobSpacingClass: 'space-y-3 mb-3',
        jobSpacingPx: 12,
        jobTitleSize: 'text-[13px] sm:text-[13.5px] font-bold text-stone-900',
        jobCompanySize: 'text-[11.5px] sm:text-[12px] font-semibold text-stone-700',
        jobDateSize: 'text-[10.5px] sm:text-[11px] font-medium text-stone-500',
        bulletSpacingClass: 'my-1',
        bulletLineHeight: 'leading-normal',
        skillsGapClass: 'gap-1.5 mt-1.5',
        skillChipClass: 'text-[11.5px] font-medium px-2 py-0.5 rounded',
        skillChipPadding: 'px-2 py-0.5',
        skillChipText: 'text-[11.5px]',
      };

    case 'compact':
      return {
        level: 'compact',
        pageMarginMm: { top: 11, bottom: 11, left: 14, right: 14 },
        containerPaddingClass: 'p-4 sm:p-5',
        sidebarPaddingClass: 'p-4 sm:p-5 space-y-3.5',
        mainPaddingClass: 'p-4 sm:p-6 space-y-3.5',
        headerPaddingClass: 'p-4 sm:p-5',
        nameFontSize: 'text-lg sm:text-xl font-bold',
        namePt: 18,
        jobTitleFontSize: 'text-[11px] sm:text-xs font-semibold',
        jobPt: 10.5,
        contactFontSize: 'text-[10.5px] sm:text-[11px]',
        contactPt: 9,
        avatarSize: 'w-18 h-18 sm:w-20 sm:h-20',
        sectionHeadingClass: 'text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase',
        sectionHeadingPt: 11,
        sectionHeadingMarginBottom: 'mb-1.5',
        sectionHeadingPaddingBottom: 'pb-0.5',
        sectionSpacingClass: 'space-y-3 mb-3',
        sectionSpacingPx: 13,
        bodyFontSize: 'text-[11px] sm:text-[11.5px]',
        bodyPt: 9.2,
        bodyLineHeight: 'leading-normal', // ~1.38
        summaryFontSize: 'text-[11px] sm:text-[11.5px]',
        summaryLineHeight: 'leading-normal',
        summarySpacing: 'mb-2',
        jobSpacingClass: 'space-y-2 mb-2',
        jobSpacingPx: 9,
        jobTitleSize: 'text-[12px] font-bold text-stone-900',
        jobCompanySize: 'text-[11px] font-semibold text-stone-700',
        jobDateSize: 'text-[10px] font-medium text-stone-500',
        bulletSpacingClass: 'my-0.5',
        bulletLineHeight: 'leading-snug',
        skillsGapClass: 'gap-1 mt-1',
        skillChipClass: 'text-[10.5px] font-medium px-1.5 py-0.5 rounded',
        skillChipPadding: 'px-1.5 py-0.5',
        skillChipText: 'text-[10.5px]',
      };

    case 'dense':
    default:
      return {
        level: 'dense',
        pageMarginMm: { top: 9, bottom: 9, left: 12, right: 12 },
        containerPaddingClass: 'p-3.5 sm:p-4',
        sidebarPaddingClass: 'p-3.5 sm:p-4 space-y-3',
        mainPaddingClass: 'p-3.5 sm:p-5 space-y-3',
        headerPaddingClass: 'p-3 sm:p-4',
        nameFontSize: 'text-base sm:text-lg font-bold',
        namePt: 16,
        jobTitleFontSize: 'text-[10.5px] sm:text-[11px] font-semibold',
        jobPt: 9.5,
        contactFontSize: 'text-[10px]',
        contactPt: 8.5,
        avatarSize: 'w-16 h-16',
        sectionHeadingClass: 'text-[10.5px] font-bold tracking-wider uppercase',
        sectionHeadingPt: 10,
        sectionHeadingMarginBottom: 'mb-1',
        sectionHeadingPaddingBottom: 'pb-0.5',
        sectionSpacingClass: 'space-y-2 mb-2',
        sectionSpacingPx: 9,
        bodyFontSize: 'text-[10px] sm:text-[10.5px]',
        bodyPt: 8.5,
        bodyLineHeight: 'leading-tight', // ~1.3
        summaryFontSize: 'text-[10px] sm:text-[10.5px]',
        summaryLineHeight: 'leading-tight',
        summarySpacing: 'mb-1.5',
        jobSpacingClass: 'space-y-1.5 mb-1.5',
        jobSpacingPx: 6,
        jobTitleSize: 'text-[11px] font-bold text-stone-900',
        jobCompanySize: 'text-[10px] font-semibold text-stone-700',
        jobDateSize: 'text-[9.5px] text-stone-500',
        bulletSpacingClass: 'my-0.5',
        bulletLineHeight: 'leading-tight',
        skillsGapClass: 'gap-1 mt-0.5',
        skillChipClass: 'text-[9.5px] font-medium px-1.5 py-0.2 rounded',
        skillChipPadding: 'px-1.5 py-0.2',
        skillChipText: 'text-[9.5px]',
      };
  }
}
