export interface WorldLanguage {
  name: string;
  nativeName: string;
  commonProficiencies: string[];
}

export const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent / Professional',
  'Professional Working',
  'Conversational',
  'Basic / Elementary',
];

export const WORLD_LANGUAGES: WorldLanguage[] = [
  { name: 'English', nativeName: 'English', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Urdu', nativeName: 'اردو', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Pashto', nativeName: 'پښتو', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Arabic', nativeName: 'العربية', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ / پنجابی', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Sindhi', nativeName: 'سنڌي', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Balochi', nativeName: 'بلوچی', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Saraiki', nativeName: 'سرائیکی', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Hindko', nativeName: 'ہندکو', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'French', nativeName: 'Français', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'German', nativeName: 'Deutsch', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Spanish', nativeName: 'Español', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Mandarin Chinese', nativeName: '中文', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Hindi', nativeName: 'हिन्दी', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Turkish', nativeName: 'Türkçe', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Persian / Farsi', nativeName: 'فارسی', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Russian', nativeName: 'Русский', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Japanese', nativeName: '日本語', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Korean', nativeName: '한국어', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Italian', nativeName: 'Italiano', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Portuguese', nativeName: 'Português', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Dutch', nativeName: 'Nederlands', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Swedish', nativeName: 'Svenska', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Bengali', nativeName: 'বাংলা', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Tagalog / Filipino', nativeName: 'Tagalog', commonProficiencies: PROFICIENCY_LEVELS },
  { name: 'Malay / Indonesian', nativeName: 'Bahasa', commonProficiencies: PROFICIENCY_LEVELS },
];

export interface SelectedLanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

/**
 * Format language items array into multiline string for textarea
 */
export function formatLanguagesToString(items: SelectedLanguageItem[]): string {
  return items
    .map((item) => {
      if (item.proficiency) {
        return `${item.name} (${item.proficiency})`;
      }
      return item.name;
    })
    .join('\n');
}

/**
 * Parse multiline string into language items
 */
export function parseLanguagesFromString(text: string): SelectedLanguageItem[] {
  if (!text || text.trim() === '') return [];
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.map((line, idx) => {
    // Check if format is "Language (Proficiency)" or "Language - Proficiency"
    const parenMatch = line.match(/^(.+?)\s*\((.+?)\)$/);
    if (parenMatch) {
      return {
        id: `lang-${idx}-${parenMatch[1].trim().toLowerCase()}`,
        name: parenMatch[1].trim(),
        proficiency: parenMatch[2].trim(),
      };
    }
    const dashMatch = line.match(/^(.+?)\s*[- :]\s*(.+)$/);
    if (dashMatch) {
      return {
        id: `lang-${idx}-${dashMatch[1].trim().toLowerCase()}`,
        name: dashMatch[1].trim(),
        proficiency: dashMatch[2].trim(),
      };
    }
    return {
      id: `lang-${idx}-${line.toLowerCase()}`,
      name: line,
      proficiency: 'Fluent',
    };
  });
}
