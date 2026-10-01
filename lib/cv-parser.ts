export interface ParsedJobEntry {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  bullets: string[];
  rawText?: string;
}

export interface ParsedEducationEntry {
  id: string;
  degree: string;
  institution: string;
  dates: string;
  details: string[];
}

/**
 * Parses user experience text into structured job entries
 */
export function parseExperience(text: string): ParsedJobEntry[] {
  if (!text || text.trim() === '') return [];

  // Split by double newline or chunks
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  
  return blocks.map((block, bIdx) => {
    const rawLines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) {
      return { id: `job-${bIdx}`, title: '', subtitle: '', dates: '', bullets: [] };
    }

    // Check if the lines contain bullet markers (•, -, *, ⁃)
    const title = rawLines[0].replace(/^[-*•⁃]\s*/, '');
    let subtitle = '';
    let dates = '';
    const bullets: string[] = [];

    let lineIdx = 1;
    // Check if line 1 or 2 is company / date / location
    if (lineIdx < rawLines.length && !isBullet(rawLines[lineIdx])) {
      subtitle = rawLines[lineIdx];
      lineIdx++;
    }

    // Check if next line is date range (e.g., 2020 - Present, 2018 - 2022)
    if (lineIdx < rawLines.length && !isBullet(rawLines[lineIdx]) && isDateString(rawLines[lineIdx])) {
      dates = rawLines[lineIdx];
      lineIdx++;
    } else if (subtitle && isDateString(subtitle)) {
      dates = subtitle;
      subtitle = '';
    }

    // If subtitle contains date separated by | or comma, extract
    if (subtitle && !dates) {
      const parts = subtitle.split(/\s*\|\s*|\s*—\s*/);
      if (parts.length > 1 && isDateString(parts[parts.length - 1])) {
        dates = parts[parts.length - 1];
        subtitle = parts.slice(0, parts.length - 1).join(' | ');
      }
    }

    // Remaining lines are bullet points or descriptions
    for (; lineIdx < rawLines.length; lineIdx++) {
      const line = rawLines[lineIdx];
      const cleaned = line.replace(/^[-*•⁃\d+.)]\s*/, '').trim();
      if (cleaned) {
        bullets.push(cleaned);
      }
    }

    return {
      id: `job-${bIdx}`,
      title,
      subtitle,
      dates,
      bullets,
      rawText: block,
    };
  });
}

/**
 * Parses user education text into structured education entries
 */
export function parseEducation(text: string): ParsedEducationEntry[] {
  if (!text || text.trim() === '') return [];

  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  return blocks.map((block, bIdx) => {
    const rawLines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) {
      return { id: `edu-${bIdx}`, degree: '', institution: '', dates: '', details: [] };
    }

    const degree = rawLines[0].replace(/^[-*•⁃]\s*/, '');
    let institution = '';
    let dates = '';
    const details: string[] = [];

    let lineIdx = 1;
    if (lineIdx < rawLines.length && !isBullet(rawLines[lineIdx])) {
      institution = rawLines[lineIdx];
      lineIdx++;
    }

    if (lineIdx < rawLines.length && !isBullet(rawLines[lineIdx]) && isDateString(rawLines[lineIdx])) {
      dates = rawLines[lineIdx];
      lineIdx++;
    } else if (institution && isDateString(institution)) {
      dates = institution;
      institution = '';
    }

    // If institution has "| 2020 - 2024"
    if (institution && !dates && institution.includes('|')) {
      const parts = institution.split('|');
      institution = parts[0].trim();
      dates = parts.slice(1).join('|').trim();
    }

    for (; lineIdx < rawLines.length; lineIdx++) {
      const line = rawLines[lineIdx];
      const cleaned = line.replace(/^[-*•⁃\d+.)]\s*/, '').trim();
      if (cleaned) {
        details.push(cleaned);
      }
    }

    return {
      id: `edu-${bIdx}`,
      degree,
      institution,
      dates,
      details,
    };
  });
}

function isBullet(line: string): boolean {
  return /^[-*•⁃]\s+/.test(line);
}

function isDateString(str: string): boolean {
  return /\b(19\d\d|20\d\d|present|current|ongoing)\b/i.test(str);
}
