import { CVData } from '@/types/cv';

export interface JobProfile {
  id: string;
  title: string;
  category: string;
  data: Omit<CVData, 'template'> & { recommendedTemplate: string };
}

export const JOB_PROFILES: JobProfile[] = [
  // --- TRADES, AUTOMOTIVE & VOCATIONAL ---
  {
    id: 'plumber',
    title: 'Plumber',
    category: 'Trades & Construction',
    data: {
      name: 'Rashid Khan',
      job: 'Master Plumber & Sanitary Technician',
      phone: '+966 55 234 5678',
      email: 'rashid.plumbing@servicepro.sa',
      location: 'Karak, KPK, Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Licensed Master Plumber with 8+ years of hands-on experience in residential, commercial, and industrial plumbing systems. Expert in pipe installation (PVC, PPR, copper, PEX), advanced leak diagnostics, high-pressure water heaters, drainage networks, and booster pump maintenance.',
      education: `Diploma in Plumbing & Sanitary Engineering (DAE)
Technical Education & Vocational Training Authority (TEVTA) | 2014 - 2017

Occupational Safety & Health Administration (OSHA 30)
Certified Site Safety | 2021`,
      experience: `Lead Commercial Plumber
Al-Bawani Contracting & Maintenance, Riyadh
2021 - Present
• Installed sanitary piping, fire suppression sprinklers, and drainage infrastructure for an 18-story apartment tower.
• Performed hydrostatic pressure testing and sewer camera inspections, eliminating 100% of pipeline blockages.
• Supervised a crew of 8 apprentice plumbers, delivering rough-in plumbing 10 days ahead of schedule.

Senior Residential Plumber
Modern Plumbing & Facilities, Peshawar
2017 - 2021
• Diagnosed and repaired hidden slab leaks, malfunctioning water heaters, sewer ejector pumps, and water filtration units.
• Maintained 99% client satisfaction rating across 850+ residential plumbing repair service calls.`,
      skills: `PPR, PEX, Copper & PVC Pipe Installation
Hydrostatic Pressure Testing & Leak Detection
Drainage, Venting & Sewer Line Diagnostics
Electric & Gas Water Heater Installation
Booster Pumps & Water Treatment Systems
Blueprint & Schematic Interpretation
Power Threading Machines & Pipe Cutters`,
      languages: `Pashto (Native)
Urdu (Fluent)
Arabic (Working Proficiency)
English (Basic)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'car-mechanic',
    title: 'Car Mechanic',
    category: 'Automotive',
    data: {
      name: 'Tariq Mehmood',
      job: 'Lead Automotive Technician & Car Mechanic',
      phone: '+966 54 876 5432',
      email: 'tariq.mechanic@autocare.com',
      location: 'Karak, KPK, Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'ASE-Certified Automotive Technician with 9+ years diagnosing and repairing petrol, diesel, and hybrid passenger vehicles and light trucks. Specialized in engine overhauls, automatic and manual transmissions, electronic fuel injection (EFI), ABS brake systems, and computerized OBD-II scanning.',
      education: `Associate Diploma in Automotive & Diesel Technology
National Vocational & Technical Training Commission (NAVTTC) | 2013 - 2016

Automotive Service Excellence (ASE Certified Master Tech)
Engine & Electrical Specialist | 2020`,
      experience: `Head Mechanic & Workshop Supervisor
Al-Jazirah Ford & Toyota Service Center, Jeddah
2020 - Present
• Diagnose complex engine misfires, transmission slippage, and electrical CAN-bus faults using Launch X431 and Autel MaxiSys.
• Rebuild 4-cylinder and V6/V8 internal combustion engines, cylinder head resurfacing, and timing belt calibrations.
• Increased monthly workshop job completion throughput by 22% while maintaining a 98% first-time-fix rate.

Senior Auto Mechanic
Speedy Motors Workshop, Rawalpindi
2016 - 2020
• Executed complete brake overhauls, steering rack replacements, suspension strut repairs, and clutch plate adjustments.
• Performed comprehensive multi-point safety inspections, wheel alignments, and A/C refrigerant recovery.`,
      skills: `Computerized Diagnostics (OBD-II, Autel, Launch)
Engine Overhauls (Pistons, Valves, Gaskets)
Automatic & Manual Transmission Repairs
EFI & Common Rail Diesel Injection
ABS, Hydraulic Brakes & Rotor Resurfacing
Auto Electrical & Alternator/Starter Troubleshooting
Automotive HVAC Charging (R134a/R1234yf)`,
      languages: `Urdu (Native)
Pashto (Fluent)
English (Professional Working)
Arabic (Conversational)`,
      recommendedTemplate: 'template-4',
    },
  },
  {
    id: 'car-washer',
    title: 'Car Washer & Auto Detailer',
    category: 'Automotive & Service',
    data: {
      name: 'Bilal Ahmad',
      job: 'Professional Auto Detailer & Car Wash Specialist',
      phone: '+971 50 112 9988',
      email: 'bilal.detailer@autospa.ae',
      location: 'Dubai, UAE',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Meticulous Automotive Detailing Specialist and Car Wash Expert with 5+ years of experience in luxury car spas and fleet washing facilities. Expert in high-pressure steam cleaning, pH-neutral snow foam washing, two-bucket hand washes, machine paint correction, and 9H ceramic coating applications.',
      education: `Certificate in Professional Auto Detailing & Ceramic Coatings
International Detailing Association (IDA) | 2021

Secondary School Certificate
Government High School, Karak | 2018`,
      experience: `Lead Detailing Specialist
Grand Auto Spa & Detailing Lounge, Dubai
2022 - Present
• Perform comprehensive exterior washes, clay bar decontaminations, multi-stage rotary buffing, and ceramic sealants for luxury supercars (Ferrari, Porsche, Rolls-Royce).
• Steam-clean leather upholstery, shampoo carpets, and sanitize A/C ducts using ozone generators with zero chemical residue.
• Trained a crew of 6 junior washers on swirl-free washing techniques and scratch prevention methods.

Car Wash Technician & Valet
CleanCar Auto Services, Abu Dhabi
2019 - 2022
• Managed high-volume automated and manual wash bays processing 65+ vehicles daily with pristine attention to wheels and glass.
• Hand-applied carnauba waxes, tire dressings, and cleaned engine bays with dielectric degreasers.`,
      skills: `High-Pressure Foam & Steam Cleaning
Dual-Action & Rotary Machine Paint Correction
9H Ceramic & Graphene Coating Application
Interior Leather Cleaning & Carpet Extraction
Clay Bar & Iron Fallout Decontamination
Swirl-Free Hand Wash Techniques
Chemical Dilution & Paint Thickness Gauge Use`,
      languages: `Urdu (Native)
Pashto (Native)
English (Conversational)
Arabic (Basic)`,
      recommendedTemplate: 'template-5',
    },
  },
  {
    id: 'electrician-tech',
    title: 'Electrician',
    category: 'Trades & Construction',
    data: {
      name: 'Farhan Ullah',
      job: 'Licensed Electrical Technician & Wireman',
      phone: '+966 50 998 7766',
      email: 'farhan.electrician@wiringpro.sa',
      location: 'Dammam, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Certified Industrial & Residential Electrician with 7+ years of experience installing distribution panels, conduit pipes, 3-phase commercial wiring, emergency backup generators, and building management systems (BMS). Strictly adhere to IEEE and National Electrical Code (NEC).',
      education: `Diploma in Electrical Technology (DAE)
Peshawar Institute of Technology | 2014 - 2017

Certified Industrial Electrician License
Saudi Council of Engineers (Technician Grade) | 2021`,
      experience: `Senior Electrical Technician
Al-Fanar Electrical Contracting, Dammam
2020 - Present
• Installed 400V/230V distribution switchboards, main circuit breakers (MCCB), and busbar trunking in commercial warehouses.
• Pulled heavy armor-clad copper cables through cable trays and bent EMT/PVC conduits with exact laser measurements.
• Tested insulation resistance (Megger test), earth grounding loop impedance, and verified phase load balancing.

Maintenance Electrician
Habib Sugar Mills, Punjab
2017 - 2020
• Repaired 3-phase induction electric motors, motor starters (Star-Delta), contractors, and variable speed drives (VFD).`,
      skills: `Single & 3-Phase Electrical Wiring (380V/220V)
Main Distribution Boards (MDB/SMDB) Assembly
Conduit Bending & Cable Tray Routing
Insulation Resistance (Megger) & Earth Pit Testing
VFD & Electric Motor Troubleshooting
Circuit Breakers (MCB, MCCB, ELCB)
Multimeters, Clamp Meters & Electrical Blueprints`,
      languages: `Urdu (Native)
Pashto (Fluent)
Arabic (Working Proficiency)
English (Basic Technical)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'hvac-technician',
    title: 'HVAC Technician',
    category: 'Trades & Construction',
    data: {
      name: 'Kamran Ali',
      job: 'Senior HVAC & Refrigeration Service Technician',
      phone: '+966 54 332 1100',
      email: 'kamran.hvac@coolingsolutions.sa',
      location: 'Riyadh, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Skilled HVAC/R Technician with 8+ years troubleshooting, installing, and servicing central chillers, package units, VRF systems, and split air conditioners in extreme Middle East weather conditions. Certified in refrigerant recovery (R410A, R134a, R32).',
      education: `Diploma in Refrigeration & Air Conditioning (RAC)
Government Polytechnic Institute | 2013 - 2016

EPA Section 608 Universal Certification
HVAC Excellence | 2019`,
      experience: `Senior HVAC Field Technician
Zamil Air Conditioners Service, Riyadh
2020 - Present
• Troubleshoot commercial package units and water-cooled chiller plants up to 250 tons for hospitals and corporate towers.
• Diagnose compressor burnout, replace expansion valves (TXV), recharge refrigerants, and rebuild fan motor bearings.
• Reduced summer emergency breakdown callbacks by 28% through comprehensive preventative quarterly tune-ups.

A/C Installation Specialist
Frostline HVAC Services, Lahore
2016 - 2020
• Installed ductwork, copper refrigerant lines, condensate drain piping, and programmable digital thermostats.`,
      skills: `Chillers, Package Units & VRF Systems
Refrigerant Charging & Vacuum Evacuation
Hermetic & Semi-Hermetic Compressor Diagnostics
Brazing & Oxy-Acetylene Copper Soldering
Electrical Control Wiring, Relays & Contactors
Airflow & Static Pressure Balancing
Digital Manifold Gauges & Leak Detectors`,
      languages: `Urdu (Native)
Punjabi (Native)
English (Professional Technical)
Arabic (Conversational)`,
      recommendedTemplate: 'template-3',
    },
  },
  {
    id: 'heavy-equipment-operator',
    title: 'Heavy Equipment Operator',
    category: 'Trades & Construction',
    data: {
      name: 'Gulzar Khan',
      job: 'Certified Heavy Equipment & Crane Operator',
      phone: '+966 53 445 6677',
      email: 'gulzar.heavyops@construction.sa',
      location: 'Karak, KPK, Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Licensed Heavy Equipment Operator with 10+ years operating hydraulic excavators, wheel loaders, bulldozers, and crawler cranes on mega-infrastructure, highway, and quarry earthmoving projects. Proven track record of zero site safety incidents.',
      education: `Heavy Transport Vehicle (HTV) & Plant Operator License
Traffic Department / Ministry of Transport | Active

Certificate in Construction Plant Operation
Caterpillar Operator Training Center | 2015`,
      experience: `Lead Excavator & Bulldozer Operator
Shibh Al-Jazira Contracting (SAJCO), Riyadh
2019 - Present
• Operate CAT 336D excavators and D8R bulldozers for deep trench excavation, road grading, and embankment compaction.
• Coordinate daily with civil surveyors and site engineers to match laser elevation grades within 10mm tolerances.
• Perform pre-operational mechanical safety checks (hydraulic fluid, tracks, pins, safety interlocks).

Plant Equipment Operator
National Highway Authority (NHA) Projects, Pakistan
2014 - 2019
• Excavated rock formations and moved over 1.2 million cubic meters of earth for motorway construction.`,
      skills: `Hydraulic Excavators (CAT, Komatsu, Volvo)
Bulldozers & Motor Graders (D8/D9)
Wheel Loaders & Backhoes (JCB)
Trenching, Digging & Slope Grading
Laser Level Grade Reading
Daily Plant Pre-Trip Maintenance & Greasing
OSHA Construction Heavy Machine Safety`,
      languages: `Pashto (Native)
Urdu (Fluent)
Arabic (Conversational Working)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'professional-driver',
    title: 'Professional Driver',
    category: 'Transportation & Logistics',
    data: {
      name: 'Mohammad Younas',
      job: 'Heavy Truck & VIP Executive Driver',
      phone: '+966 55 667 8899',
      email: 'younas.driver@transportlogistics.sa',
      location: 'Karak, KPK, Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Professional Heavy Vehicle & VIP Chauffeur with 11+ years of clean driving experience transporting freight trailers and corporate executives across Saudi Arabia and the GCC. Punctual, defensive driving certified, with deep knowledge of GPS routes and vehicle maintenance.',
      education: `Heavy Transport Vehicle (HTV / Public Driver License)
Valid Saudi Arabian Driving License & GCC Permit

Defensive Driving & Road Safety Certification
Saudi Aramco Safety Approved | 2022`,
      experience: `Long-Haul Trailer Driver
Almajdouie Logistics Company, Dammam
2019 - Present
• Safely transport 40-foot container freight and oversized industrial cargo across Dammam, Riyadh, and Jeddah ports.
• Logged over 450,000 accident-free kilometers while strictly complying with cargo tie-down rules and driving hours limits.
• Conduct daily pre-trip brake pressure, tire torque, and fluid inspections.

Executive Company Chauffeur
Private Family & Corporate Office, Riyadh
2015 - 2019
• Provided smooth, safe, and punctual transport for CEO and international guests in luxury Mercedes and Lexus vehicles.`,
      skills: `Heavy Trailer & 40-Foot Container Driving
Defensive Driving & Accident Avoidance
Navigation (Google Maps, Waze & GPS Systems)
Cargo Securing & Weight Distribution
Basic Mechanical & Tire Change Roadside Repairs
Fuel Efficiency & Route Optimization
Punctuality & Professional Etiquette`,
      languages: `Pashto (Native)
Urdu (Fluent)
Arabic (Fluent Speaking)
English (Basic Road Communication)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'welder-fabricator',
    title: 'Welder & Fabricator',
    category: 'Trades & Construction',
    data: {
      name: 'Nawaz Sharif',
      job: 'Certified 6G Pipe Welder & Metal Fabricator',
      phone: '+966 50 778 9900',
      email: 'nawaz.welding@fabrication.sa',
      location: 'Jubail, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'ASME-Certified 6G Pipe and Structural Welder with 8+ years specializing in TIG (GTAW), MIG (GMAW), and Shielded Metal Arc (SMAW) welding for oil refineries, pressure vessels, and steel building frameworks.',
      education: `6G Pipe Welding Certification (ASME Section IX)
National Inspection & Testing Academy | 2017

Vocational Diploma in Mechanical Fabrication
Government Technical Training Center | 2014 - 2016`,
      experience: `Senior 6G Pipe Welder
Sendan International Petrochemical Contractor, Jubail
2020 - Present
• Weld high-pressure carbon steel, stainless steel, and alloy piping passes with a 99.4% radiographic X-ray pass rate.
• Read complex isometric piping diagrams and fabricate custom spool assemblies, flanges, and structural trusses.
• Strictly enforce hot work safety permits, fire watch protocols, and PPE compliance.`,
      skills: `TIG (GTAW) & Stick (SMAW) 6G Position
MIG (GMAW) & Flux-Cored (FCAW)
Pressure Vessel & High-Pressure Pipe Welding
Blueprint & Welding Symbol Reading
Oxy-Acetylene & Plasma Arc Cutting
Angle Grinding, Beveling & Fit-Up
Weld Inspection (Visual, Penetrant & X-Ray)`,
      languages: `Urdu (Native)
Pashto (Fluent)
English (Technical Working)
Arabic (Basic)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'carpenter',
    title: 'Carpenter',
    category: 'Trades & Construction',
    data: {
      name: 'Sardar Wali',
      job: 'Master Carpenter & Joinery Craftsman',
      phone: '+971 52 443 1122',
      email: 'sardar.carpentry@woodcraft.ae',
      location: 'Dubai, UAE',
      photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Accomplished Carpenter and Joinery Craftsman with 9+ years crafting custom wooden cabinetry, architectural millwork, gypsum partitions, hardwood flooring, and structural timber formwork for luxury interior fit-out projects.',
      education: `Certificate in Carpentry & Woodworking Craftsmanship
City & Guilds Vocational Training | 2015

Secondary School Certificate
Government High School, Karak | 2013`,
      experience: `Senior Interior Joiner & Carpenter
Depa Interiors Group, Dubai
2019 - Present
• Fabricate and install bespoke kitchen cabinets, walk-in closets, veneered wall paneling, and acoustic wooden baffles.
• Operate table saws, spindle molders, routers, and edge banders with millimeter precision.
• Supervised finishing carpenters on 5-star hotel luxury suite fit-out completions.`,
      skills: `Custom Cabinetry & Millwork Fabrication
Door & Window Frame Hanging & Hardware
Hardwood & Laminated Parquet Flooring
Timber Formwork & Gypsum Stud Partitions
Wood Finishing, Staining & Sanding
Precision Power Tools (Table Saws, Routers, Miter)
Shop Drawing & Cut-List Calculation`,
      languages: `Pashto (Native)
Urdu (Fluent)
English (Working Proficiency)
Arabic (Conversational)`,
      recommendedTemplate: 'terracotta-warm',
    },
  },
  {
    id: 'security-guard',
    title: 'Security Guard',
    category: 'Security & Safety',
    data: {
      name: 'Asad Ullah',
      job: 'Senior Security Guard & Facility Protection Officer',
      phone: '+966 50 119 2233',
      email: 'asad.security@safetyguard.sa',
      location: 'Riyadh, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Vigilant and physically fit Security Officer with 6+ years protecting commercial complexes, banks, and embassies. Trained in surveillance monitoring (CCTV), access control systems, visitor screening, conflict de-escalation, and emergency fire evacuation procedures.',
      education: `Certified Security Guard License
High Commission for Industrial Security (HCIS) / SIRA | 2020

First Aid & CPR Certification
Saudi Red Crescent Authority | 2022`,
      experience: `Lead Security Guard
Securitas Middle East / Kingdom Tower Post, Riyadh
2021 - Present
• Screen 1,500+ daily building visitors and vehicles using walk-through metal detectors, baggage scanners, and badge badges.
• Monitor a 128-camera IP CCTV control room, detecting and resolving unauthorized access attempts within 2 minutes.
• Conduct foot patrols across 25 floors, inspecting fire exit doors, emergency alarms, and perimeter gates.`,
      skills: `CCTV Monitoring & Control Room Operations
Access Control Systems (Biometric / RFID)
Visitor Screening & Metal Detectors
Emergency Response & Fire Evacuation
First Aid, CPR & AED Certified
Incident Report Writing & Logbook Keeping
Conflict Resolution & De-escalation`,
      languages: `Urdu (Native)
Pashto (Native)
Arabic (Fluent Speaking)
English (Professional Working)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'warehouse-worker',
    title: 'Warehouse Inventory Sided Forklift Operator',
    category: 'Logistics',
    data: {
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
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'commercial-cleaner',
    title: 'Cleaner / Janitor',
    category: 'Facility & Cleaning',
    data: {
      name: 'Arif Hussain',
      job: 'Commercial Cleaner & Housekeeping Specialist',
      phone: '+971 55 998 1122',
      email: 'arif.cleaning@cleanfacility.ae',
      location: 'Dubai, UAE',
      photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Hardworking and detail-oriented Commercial Cleaning Specialist with 5+ years maintaining sterile environments in international hospitals, luxury hotels, and corporate offices. Experienced with industrial floor scrubbers, chemical sanitization, and waste disposal.',
      education: `BICS (British Institute of Cleaning Science) Certificate
Cleaning & Hygiene Standards | 2021`,
      experience: `Lead Housekeeping Associate
Al-Zahra Hospital, Dubai
2021 - Present
• Disinfect surgical wards, patient suites, and public lobbies following rigorous infection control procedures.
• Operate industrial single-disc floor polishers, auto-scrubbers, and commercial carpet steam extractors.
• Restock hygiene supplies, sanitize touch points, and manage biological waste disposal safely.`,
      skills: `Industrial Floor Polishers & Auto-Scrubbers
Chemical Sanitization & Material Safety Data (MSDS)
Hospital Infection Control Protocols
Carpet Deep Cleaning & Stain Extraction
Waste Management & Biohazard Disposal
Window & Glass Cleaning Equipment
Speed, Reliability & Attention to Detail`,
      languages: `Urdu (Native)
Pashto (Native)
English (Basic Workplace)
Arabic (Basic)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'barber-stylist',
    title: 'Barber / Hair Stylist',
    category: 'Grooming & Personal Care',
    data: {
      name: 'Hamza Malik',
      job: 'Master Barber & Men\'s Grooming Specialist',
      phone: '+971 50 889 4433',
      email: 'hamza.barber@mensgrooming.ae',
      location: 'Dubai, UAE',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Passionate and trendy Master Barber with 7+ years delivering premium precision haircuts, beard sculpting, hot towel straight-razor shaves, and hair coloring treatments in high-end gentleman\'s salons.',
      education: `Certificate in Professional Barbering & Men\'s Grooming
Toni & Guy Academy | 2018`,
      experience: `Senior Stylist & Barber
Chaps & Co Barbershop, Dubai Marina
2020 - Present
• Provide custom fades (skin fade, taper, pompadour), scissor over comb styling, and classic Turkish hot towel straight razor shaves.
• Consult with 15+ VIP clients daily on personal hair and beard care regimens and premium grooming products.
• Maintain immaculate tool sterilization standards (Barbicide, UV sterilizers) between appointments.`,
      skills: `Precision Scissor & Clipper Fading
Straight-Razor Shaving & Beard Sculpting
Hair Coloring, Bleaching & Texture Treatments
Facial Cleansing & Hot Towel Therapy
Tool Sterilization & Hygiene Protocol
Customer Consultation & Service Excellence`,
      languages: `Urdu (Native)
Punjabi (Native)
English (Fluent)
Arabic (Conversational)`,
      recommendedTemplate: 'template-2',
    },
  },
  // --- WHITE COLLAR & ENGINEERING PREVIOUS CAREERS ---
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    category: 'Engineering',
    data: {
      name: 'Muhammad Faisal',
      job: 'Civil Engineer',
      phone: '+966 50 123 4567',
      email: 'muhammad.faisal@example.com',
      location: 'Karak, KPK, Pakistan',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Licensed Civil Engineer with 5+ years of infrastructure and structural construction experience across Saudi Arabia, Pakistan, and the GCC. Skilled in directing multimillion-dollar high-rise developments, site safety inspections, subcontractor management, and strict enforcement of the Saudi Building Code (SBC) and ASTM standards.',
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
      languages: `Pashto (Native)
Urdu (Fluent)
English (Fluent / Professional)
Arabic (Conversational)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    data: {
      name: 'Zaid Al-Mansoor',
      job: 'Full Stack Software Engineer',
      phone: '+971 52 987 6543',
      email: 'zaid.mansoor@techdev.io',
      location: 'Dubai, United Arab Emirates',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'High-performing Full Stack Software Engineer with 6+ years architecting scalable cloud-native microservices, fintech payment integrations, and responsive web applications. Passionate about clean code, TypeScript, and high-concurrency systems handling millions of daily API requests.',
      education: `BS in Computer Science
American University of Sharjah
2017 - 2021 | Magna Cum Laude

AWS Certified Solutions Architect – Associate
Amazon Web Services | 2023`,
      experience: `Senior Software Engineer
Careem / Uber Technologies, Dubai
2023 - Present
• Spearheaded backend architecture for real-time dispatch services, reducing p99 latency by 34% across 8 regional markets.
• Built and maintained distributed event pipelines using Node.js, Go, Apache Kafka, and Redis caching.
• Mentored 6 junior engineers and instituted automated CI/CD GitHub Action workflows with 92% unit test coverage.`,
      skills: `TypeScript / JavaScript / Node.js
React / Next.js / Tailwind CSS
Go (Golang) & Python
PostgreSQL, Redis & MongoDB
Docker, Kubernetes & AWS (ECS/EKS)
Microservices & REST/GraphQL APIs
CI/CD Pipelines & Automated Testing`,
      languages: `Arabic (Native)
English (Fluent / Bilingual)
French (Intermediate)`,
      recommendedTemplate: 'template-5',
    },
  },
  {
    id: 'doctor-physician',
    title: 'Doctor / Physician',
    category: 'Medical & Healthcare',
    data: {
      name: 'Dr. Sarah Al-Qasim, MD',
      job: 'Internal Medicine Specialist',
      phone: '+966 56 112 3344',
      email: 'dr.sarah.qasim@medical.sa',
      location: 'Riyadh, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Board-Certified Internal Medicine Specialist with 7+ years of compassionate patient-centric inpatient and outpatient care. Experienced in chronic disease management, diagnostic assessments, and multi-specialty clinical leadership.',
      education: `Saudi Board of Internal Medicine (SBIM)
SCFHS | 2021

Bachelor of Medicine, Bachelor of Surgery (MBBS)
King Saud University College of Medicine | 2012 - 2018`,
      experience: `Specialist Physician – Internal Medicine
King Faisal Specialist Hospital, Riyadh
2021 - Present
• Manage acute medical admissions and outpatient clinics, evaluating 25+ complex patient cases daily.
• Coordinate interdisciplinary treatment protocols with cardiology, endocrinology, and nephrology departments.`,
      skills: `Acute Inpatient & Outpatient Care
Chronic Disease Management (Diabetes & CVD)
Diagnostic Ultrasound & Bedside Procedures
Electronic Health Records (Epic & Cerner)
Patient-Family Counseling & Medical Ethics
ACLS & BLS Certified`,
      languages: `Arabic (Native)
English (Fluent / Medical Terminology)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'Medical & Healthcare',
    data: {
      name: 'Maria Santos, BSN, RN',
      job: 'Critical Care Registered Nurse (ICU)',
      phone: '+966 53 776 5432',
      email: 'maria.santos.rn@healthhub.com',
      location: 'Jeddah, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1594824813583-17684e27f67a?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Dedicated and compassionate Critical Care Registered Nurse with 6+ years of ICU experience monitoring hemodynamically unstable patients, operating life-support ventilators, and administering critical IV medications with zero errors.',
      education: `Bachelor of Science in Nursing (BSN)
University of Santo Tomas, Manila | 2014 - 2018`,
      experience: `Senior ICU Staff Nurse
Dr. Soliman Fakeeh Hospital, Jeddah
2021 - Present
• Provide advanced 1:1 intensive nursing care for post-operative cardiac and neurotrauma critical patients.
• Administer vasoactive infusions, manage mechanical ventilators and arterial lines.`,
      skills: `Critical Care Hemodynamic Monitoring
Ventilator & Airway Management
IV Cannulation & Infusion Pumps
BLS, ACLS & PALS Certified
Patient & Family Health Education`,
      languages: `English (Fluent)
Tagalog (Native)
Arabic (Basic Medical)`,
      recommendedTemplate: 'template-1',
    },
  },
  {
    id: 'accountant-finance',
    title: 'Accountant / Financial Analyst',
    category: 'Finance & Banking',
    data: {
      name: 'Hassan Al-Zahrani, CPA',
      job: 'Senior Financial Accountant',
      phone: '+966 50 554 3322',
      email: 'hassan.zahrani@cpafinance.sa',
      location: 'Riyadh, Saudi Arabia',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80',
      about: 'Certified Public Accountant (CPA) with 7+ years of expertise in corporate tax, IFRS financial statement preparation, VAT compliance (ZATCA), internal controls, and budget variance modeling.',
      education: `Certified Public Accountant (CPA & SOCPA) | 2021
BS in Accounting & Finance | King Abdulaziz University`,
      experience: `Senior Financial Accountant
SABIC Industrial Manufacturing, Riyadh
2021 - Present
• Oversee general ledger reconciliations and monthly closing procedures for business units generating $80M in revenue.
• Prepare consolidated balance sheets, P&L statements, and cash flow forecasts compliant with IFRS standards.`,
      skills: `IFRS & SOCPA Financial Reporting
ZATCA Tax & VAT Filing Compliance
Financial Modeling & Budget Forecasting
SAP ERP & Oracle NetSuite`,
      languages: `Arabic (Native)
English (Fluent / Professional)`,
      recommendedTemplate: 'template-2',
    },
  },
];
