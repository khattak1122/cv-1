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
  job: 'Warehouse Inventory Sided Forklift Operator',
  phone: '+966 50 123 4567',
  email: 'muhammad.faisal@example.com',
  location: 'Riyadh, Saudi Arabia',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
  about: 'Certified Counterbalance & Reach Truck Sided Forklift Operator with 6+ years of heavy inventory and fulfillment experience across Saudi Arabia and the GCC. Expert in high-bay pallet racking, precision staging, RF barcode scanning, inventory cycle counts, and OSHA-compliant warehouse safety management.',
  education: `Certified Forklift Operator & Heavy Equipment Safety License
Saudi Logistics & Vocational Training Institute | 2019

High School Diploma (General Science)
Federal Board of Intermediate & Secondary Education | 2017`,
  experience: `Senior Sided Forklift Operator & Warehouse Inventory Lead
Al-Rashid Global Logistics & Distribution Hub, Riyadh
2022 - Present
• Operates specialized high-rack sided reach forklifts and turret trucks across 12-meter high-bay storage aisles with zero accidents.
• Manages daily receipt and dispatch of 45+ truckloads, executing RF barcode scanning and SAP WMS inventory tracking with 99.9% accuracy.
• Leads a team of 14 warehouse associates during peak fulfillment shifts, accelerating staging throughput by 22%.

Warehouse Material Handler & Equipment Operator
Gulf Express Fulfillment & Supply Chain, Jeddah
2019 - 2022
• Handled heavy pallet replenishment, cross-docking, and container unloading using 3-ton counterbalance forklifts.
• Conducted daily pre-shift OSHA vehicle inspections, hydraulic fluid checks, and battery recharging protocols.`,
  skills: `Sided Reach Trucks & Turret Forklifts
Counterbalance Forklifts (Gas & Electric)
SAP Warehouse Management System (WMS)
RF Barcode Scanning & Staging
Pallet Racking & High-Bay Stacking
FIFO Inventory & Cycle Audits
OSHA Warehouse Safety & Hazard Control
Container Loading & Unloading`,
  languages: `English (Fluent / Professional)
Arabic (Working Proficiency)
Urdu (Native)`,
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
