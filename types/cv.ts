import { PhotoPosition } from '@/lib/template-engine';
import { LayoutStructure, FontTheme } from '@/lib/cv-styles';

export type TemplateId = string;

export interface CVData {
  name: string;
  job: string;
  phone: string;
  email: string;
  location: string;
  photoUrl: string;
  about: string;
  education: string;
  experience: string;
  skills: string;
  languages: string;
  template: TemplateId;
  photoPosition?: PhotoPosition;
  layoutOverride?: LayoutStructure;
  fontOverride?: FontTheme;
  colorOverride?: string;
  spacingDensity?: 'auto' | 'spacious' | 'normal' | 'compact';
}

export const SAMPLE_CV_DATA: CVData = {
  name: 'Muhammad Faisal',
  job: 'Civil Engineer',
  phone: '+966 50 123 4567',
  email: 'muhammad.faisal@example.com',
  location: 'Riyadh, Saudi Arabia',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
  about: 'Licensed Civil Engineer with 5+ years of infrastructure and structural construction experience across Saudi Arabia and the GCC. Skilled in directing multimillion-dollar high-rise developments, site safety inspections, subcontractor management, and strict enforcement of the Saudi Building Code (SBC) and ASTM standards.',
  education: `BS in Civil & Environmental Engineering
King Saud University, Riyadh
2018 - 2022 | First Class Honors

Project Management Professional (PMP) Candidate
Saudi Council of Engineers (SCE) | 2023`,
  experience: `Senior Civil Site Engineer
Al-Rashid Construction Group, Riyadh
2023 - Present
• Supervised on-site construction execution for a 32-story mixed-use commercial tower valued at $55M.
• Coordinated multidisciplinary subcontractor teams of 140+ workers, maintaining zero lost-time incidents for 500+ days.
• Accelerated concrete slab casting cycles by 16% through optimized formwork scheduling and batching plant coordination.

Junior Structural Engineer
Gulf Contracting & Infrastructure, Jeddah
2022 - 2023
• Prepared comprehensive AutoCAD and Revit shop drawings for deep foundation piling and retaining wall reinforcements.
• Conducted daily QA/QC inspections, slump tests, and verified steel rebar placement against architectural blueprints.`,
  skills: `AutoCAD & Civil 3D
Revit Architecture
Primavera P6 Scheduling
Structural Modeling (ETABS & SAP2000)
Site QA/QC & Safety Standards (OSHA / SBC)
Quantity Surveying & BOQ Estimation
Bilingual Technical Documentation`,
  languages: `Arabic (Native)
English (Fluent / Professional)
Urdu (Conversational)`,
  template: 'blue',
  photoPosition: 'left',
};

export const BLANK_CV_DATA: CVData = {
  name: '',
  job: '',
  phone: '',
  email: '',
  location: '',
  photoUrl: '',
  about: '',
  education: '',
  experience: '',
  skills: '',
  languages: '',
  template: 'blue',
  photoPosition: 'left',
};
