export interface LocationItem {
  city: string;
  region: string; // Province, State, or Governorate
  country: string;
  formatted: string;
}

export const WORLD_LOCATIONS: LocationItem[] = [
  // Pakistan
  { city: 'Karak', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Karak, KPK, Pakistan' },
  { city: 'Peshawar', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Peshawar, KPK, Pakistan' },
  { city: 'Mardan', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Mardan, KPK, Pakistan' },
  { city: 'Abbottabad', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Abbottabad, KPK, Pakistan' },
  { city: 'Swat', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Swat, KPK, Pakistan' },
  { city: 'Kohat', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Kohat, KPK, Pakistan' },
  { city: 'Bannu', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Bannu, KPK, Pakistan' },
  { city: 'Dera Ismail Khan', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Dera Ismail Khan, KPK, Pakistan' },
  { city: 'Nowshera', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Nowshera, KPK, Pakistan' },
  { city: 'Charsadda', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Charsadda, KPK, Pakistan' },
  { city: 'Haripur', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Haripur, KPK, Pakistan' },
  { city: 'Mansehra', region: 'Khyber Pakhtunkhwa (KPK)', country: 'Pakistan', formatted: 'Mansehra, KPK, Pakistan' },
  { city: 'Islamabad', region: 'Federal Capital Territory', country: 'Pakistan', formatted: 'Islamabad, Pakistan' },
  { city: 'Rawalpindi', region: 'Punjab', country: 'Pakistan', formatted: 'Rawalpindi, Punjab, Pakistan' },
  { city: 'Lahore', region: 'Punjab', country: 'Pakistan', formatted: 'Lahore, Punjab, Pakistan' },
  { city: 'Faisalabad', region: 'Punjab', country: 'Pakistan', formatted: 'Faisalabad, Punjab, Pakistan' },
  { city: 'Multan', region: 'Punjab', country: 'Pakistan', formatted: 'Multan, Punjab, Pakistan' },
  { city: 'Gujranwala', region: 'Punjab', country: 'Pakistan', formatted: 'Gujranwala, Punjab, Pakistan' },
  { city: 'Sialkot', region: 'Punjab', country: 'Pakistan', formatted: 'Sialkot, Punjab, Pakistan' },
  { city: 'Bahawalpur', region: 'Punjab', country: 'Pakistan', formatted: 'Bahawalpur, Punjab, Pakistan' },
  { city: 'Sargodha', region: 'Punjab', country: 'Pakistan', formatted: 'Sargodha, Punjab, Pakistan' },
  { city: 'Karachi', region: 'Sindh', country: 'Pakistan', formatted: 'Karachi, Sindh, Pakistan' },
  { city: 'Hyderabad', region: 'Sindh', country: 'Pakistan', formatted: 'Hyderabad, Sindh, Pakistan' },
  { city: 'Sukkur', region: 'Sindh', country: 'Pakistan', formatted: 'Sukkur, Sindh, Pakistan' },
  { city: 'Larkana', region: 'Sindh', country: 'Pakistan', formatted: 'Larkana, Sindh, Pakistan' },
  { city: 'Quetta', region: 'Balochistan', country: 'Pakistan', formatted: 'Quetta, Balochistan, Pakistan' },
  { city: 'Gwadar', region: 'Balochistan', country: 'Pakistan', formatted: 'Gwadar, Balochistan, Pakistan' },
  { city: 'Turbat', region: 'Balochistan', country: 'Pakistan', formatted: 'Turbat, Balochistan, Pakistan' },
  { city: 'Gilgit', region: 'Gilgit-Baltistan', country: 'Pakistan', formatted: 'Gilgit, Gilgit-Baltistan, Pakistan' },
  { city: 'Skardu', region: 'Gilgit-Baltistan', country: 'Pakistan', formatted: 'Skardu, Gilgit-Baltistan, Pakistan' },
  { city: 'Muzaffarabad', region: 'Azad Jammu and Kashmir', country: 'Pakistan', formatted: 'Muzaffarabad, AJK, Pakistan' },
  { city: 'Mirpur', region: 'Azad Jammu and Kashmir', country: 'Pakistan', formatted: 'Mirpur, AJK, Pakistan' },
  // Saudi Arabia (KSA)
  { city: 'Riyadh', region: 'Riyadh Province', country: 'Saudi Arabia', formatted: 'Riyadh, Saudi Arabia' },
  { city: 'Jeddah', region: 'Makkah Province', country: 'Saudi Arabia', formatted: 'Jeddah, Saudi Arabia' },
  { city: 'Mecca', region: 'Makkah Province', country: 'Saudi Arabia', formatted: 'Mecca, Saudi Arabia' },
  { city: 'Medina', region: 'Medina Province', country: 'Saudi Arabia', formatted: 'Medina, Saudi Arabia' },
  { city: 'Dammam', region: 'Eastern Province', country: 'Saudi Arabia', formatted: 'Dammam, Eastern Province, Saudi Arabia' },
  { city: 'Al-Khobar', region: 'Eastern Province', country: 'Saudi Arabia', formatted: 'Al-Khobar, Saudi Arabia' },
  { city: 'Jubail', region: 'Eastern Province', country: 'Saudi Arabia', formatted: 'Jubail Industrial City, Saudi Arabia' },
  { city: 'Dhahran', region: 'Eastern Province', country: 'Saudi Arabia', formatted: 'Dhahran, Saudi Arabia' },
  { city: 'Al-Ahsa', region: 'Eastern Province', country: 'Saudi Arabia', formatted: 'Al-Ahsa, Saudi Arabia' },
  { city: 'Taif', region: 'Makkah Province', country: 'Saudi Arabia', formatted: 'Taif, Saudi Arabia' },
  { city: 'Tabuk', region: 'Tabuk Province', country: 'Saudi Arabia', formatted: 'Tabuk, Saudi Arabia' },
  { city: 'NEOM', region: 'Tabuk Province', country: 'Saudi Arabia', formatted: 'NEOM, Saudi Arabia' },
  { city: 'Abha', region: 'Asir Province', country: 'Saudi Arabia', formatted: 'Abha, Asir, Saudi Arabia' },
  { city: 'Khamis Mushait', region: 'Asir Province', country: 'Saudi Arabia', formatted: 'Khamis Mushait, Saudi Arabia' },
  { city: 'Hail', region: 'Hail Province', country: 'Saudi Arabia', formatted: 'Hail, Saudi Arabia' },
  { city: 'Jazan', region: 'Jazan Province', country: 'Saudi Arabia', formatted: 'Jazan, Saudi Arabia' },
  { city: 'Najran', region: 'Najran Province', country: 'Saudi Arabia', formatted: 'Najran, Saudi Arabia' },
  { city: 'Yanbu', region: 'Medina Province', country: 'Saudi Arabia', formatted: 'Yanbu, Saudi Arabia' },
  { city: 'Al-Ula', region: 'Medina Province', country: 'Saudi Arabia', formatted: 'Al-Ula, Saudi Arabia' },
  { city: 'Buraidah', region: 'Al-Qassim Province', country: 'Saudi Arabia', formatted: 'Buraidah, Al-Qassim, Saudi Arabia' },
  // UAE
  { city: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', formatted: 'Dubai, UAE' },
  { city: 'Abu Dhabi', region: 'Abu Dhabi', country: 'United Arab Emirates', formatted: 'Abu Dhabi, UAE' },
  { city: 'Sharjah', region: 'Sharjah', country: 'United Arab Emirates', formatted: 'Sharjah, UAE' },
  { city: 'Ajman', region: 'Ajman', country: 'United Arab Emirates', formatted: 'Ajman, UAE' },
  { city: 'Ras Al Khaimah', region: 'Ras Al Khaimah', country: 'United Arab Emirates', formatted: 'Ras Al Khaimah, UAE' },
  { city: 'Fujairah', region: 'Fujairah', country: 'United Arab Emirates', formatted: 'Fujairah, UAE' },
  { city: 'Al Ain', region: 'Abu Dhabi', country: 'United Arab Emirates', formatted: 'Al Ain, Abu Dhabi, UAE' },
  // Other Gulf & Middle East
  { city: 'Doha', region: 'Ad-Dawhah', country: 'Qatar', formatted: 'Doha, Qatar' },
  { city: 'Kuwait City', region: 'Al Asimah', country: 'Kuwait', formatted: 'Kuwait City, Kuwait' },
  { city: 'Manama', region: 'Capital Governorate', country: 'Bahrain', formatted: 'Manama, Bahrain' },
  { city: 'Muscat', region: 'Muscat Governorate', country: 'Oman', formatted: 'Muscat, Oman' },
  { city: 'Salalah', region: 'Dhofar', country: 'Oman', formatted: 'Salalah, Oman' },
  { city: 'Cairo', region: 'Cairo Governorate', country: 'Egypt', formatted: 'Cairo, Egypt' },
  { city: 'Alexandria', region: 'Alexandria Governorate', country: 'Egypt', formatted: 'Alexandria, Egypt' },
  { city: 'Amman', region: 'Amman Governorate', country: 'Jordan', formatted: 'Amman, Jordan' },
  { city: 'Beirut', region: 'Beirut Governorate', country: 'Lebanon', formatted: 'Beirut, Lebanon' },
  { city: 'Istanbul', region: 'Marmara', country: 'Turkey', formatted: 'Istanbul, Turkey' },
  { city: 'Ankara', region: 'Central Anatolia', country: 'Turkey', formatted: 'Ankara, Turkey' },
  // United Kingdom
  { city: 'London', region: 'Greater London', country: 'United Kingdom', formatted: 'London, UK' },
  { city: 'Manchester', region: 'Greater Manchester', country: 'United Kingdom', formatted: 'Manchester, UK' },
  { city: 'Birmingham', region: 'West Midlands', country: 'United Kingdom', formatted: 'Birmingham, UK' },
  { city: 'Edinburgh', region: 'Scotland', country: 'United Kingdom', formatted: 'Edinburgh, Scotland, UK' },
  { city: 'Glasgow', region: 'Scotland', country: 'United Kingdom', formatted: 'Glasgow, Scotland, UK' },
  { city: 'Leeds', region: 'West Yorkshire', country: 'United Kingdom', formatted: 'Leeds, UK' },
  { city: 'Cambridge', region: 'Cambridgeshire', country: 'United Kingdom', formatted: 'Cambridge, UK' },
  { city: 'Oxford', region: 'Oxfordshire', country: 'United Kingdom', formatted: 'Oxford, UK' },
  // United States
  { city: 'New York', region: 'NY', country: 'United States', formatted: 'New York, NY, USA' },
  { city: 'San Francisco', region: 'CA', country: 'United States', formatted: 'San Francisco, CA, USA' },
  { city: 'Los Angeles', region: 'CA', country: 'United States', formatted: 'Los Angeles, CA, USA' },
  { city: 'Chicago', region: 'IL', country: 'United States', formatted: 'Chicago, IL, USA' },
  { city: 'Houston', region: 'TX', country: 'United States', formatted: 'Houston, TX, USA' },
  { city: 'Austin', region: 'TX', country: 'United States', formatted: 'Austin, TX, USA' },
  { city: 'Dallas', region: 'TX', country: 'United States', formatted: 'Dallas, TX, USA' },
  { city: 'Seattle', region: 'WA', country: 'United States', formatted: 'Seattle, WA, USA' },
  { city: 'Boston', region: 'MA', country: 'United States', formatted: 'Boston, MA, USA' },
  { city: 'Washington', region: 'DC', country: 'United States', formatted: 'Washington, DC, USA' },
  { city: 'Miami', region: 'FL', country: 'United States', formatted: 'Miami, FL, USA' },
  { city: 'Atlanta', region: 'GA', country: 'United States', formatted: 'Atlanta, GA, USA' },
  // Canada
  { city: 'Toronto', region: 'Ontario', country: 'Canada', formatted: 'Toronto, ON, Canada' },
  { city: 'Vancouver', region: 'British Columbia', country: 'Canada', formatted: 'Vancouver, BC, Canada' },
  { city: 'Montreal', region: 'Quebec', country: 'Canada', formatted: 'Montreal, QC, Canada' },
  { city: 'Calgary', region: 'Alberta', country: 'Canada', formatted: 'Calgary, AB, Canada' },
  { city: 'Ottawa', region: 'Ontario', country: 'Canada', formatted: 'Ottawa, ON, Canada' },
  // Europe
  { city: 'Berlin', region: 'Berlin', country: 'Germany', formatted: 'Berlin, Germany' },
  { city: 'Munich', region: 'Bavaria', country: 'Germany', formatted: 'Munich, Germany' },
  { city: 'Frankfurt', region: 'Hesse', country: 'Germany', formatted: 'Frankfurt, Germany' },
  { city: 'Paris', region: 'Île-de-France', country: 'France', formatted: 'Paris, France' },
  { city: 'Amsterdam', region: 'North Holland', country: 'Netherlands', formatted: 'Amsterdam, Netherlands' },
  { city: 'Rotterdam', region: 'South Holland', country: 'Netherlands', formatted: 'Rotterdam, Netherlands' },
  { city: 'Dublin', region: 'Leinster', country: 'Ireland', formatted: 'Dublin, Ireland' },
  { city: 'Zurich', region: 'Zurich', country: 'Switzerland', formatted: 'Zurich, Switzerland' },
  { city: 'Geneva', region: 'Geneva', country: 'Switzerland', formatted: 'Geneva, Switzerland' },
  { city: 'Stockholm', region: 'Stockholm', country: 'Sweden', formatted: 'Stockholm, Sweden' },
  { city: 'Madrid', region: 'Community of Madrid', country: 'Spain', formatted: 'Madrid, Spain' },
  { city: 'Barcelona', region: 'Catalonia', country: 'Spain', formatted: 'Barcelona, Spain' },
  { city: 'Rome', region: 'Lazio', country: 'Italy', formatted: 'Rome, Italy' },
  { city: 'Milan', region: 'Lombardy', country: 'Italy', formatted: 'Milan, Italy' },
  // Asia & Oceania
  { city: 'Singapore', region: 'Singapore', country: 'Singapore', formatted: 'Singapore' },
  { city: 'Kuala Lumpur', region: 'Federal Territory', country: 'Malaysia', formatted: 'Kuala Lumpur, Malaysia' },
  { city: 'Tokyo', region: 'Tokyo', country: 'Japan', formatted: 'Tokyo, Japan' },
  { city: 'Sydney', region: 'New South Wales', country: 'Australia', formatted: 'Sydney, NSW, Australia' },
  { city: 'Melbourne', region: 'Victoria', country: 'Australia', formatted: 'Melbourne, VIC, Australia' },
  { city: 'Brisbane', region: 'Queensland', country: 'Australia', formatted: 'Brisbane, QLD, Australia' },
  { city: 'Auckland', region: 'Auckland', country: 'New Zealand', formatted: 'Auckland, New Zealand' },
  { city: 'Mumbai', region: 'Maharashtra', country: 'India', formatted: 'Mumbai, Maharashtra, India' },
  { city: 'Delhi', region: 'Delhi NCR', country: 'India', formatted: 'Delhi, India' },
  { city: 'Bangalore', region: 'Karnataka', country: 'India', formatted: 'Bangalore, Karnataka, India' },
  { city: 'Hyderabad', region: 'Telangana', country: 'India', formatted: 'Hyderabad, Telangana, India' },
  { city: 'Dhaka', region: 'Dhaka Division', country: 'Bangladesh', formatted: 'Dhaka, Bangladesh' },
  { city: 'Chittagong', region: 'Chittagong Division', country: 'Bangladesh', formatted: 'Chittagong, Bangladesh' },
  { city: 'Manila', region: 'Metro Manila', country: 'Philippines', formatted: 'Manila, Philippines' },
];

export function searchLocations(query: string, maxResults = 8): LocationItem[] {
  if (!query || query.trim().length === 0) {
    return WORLD_LOCATIONS.slice(0, maxResults);
  }
  const clean = query.toLowerCase().trim();
  const matches = WORLD_LOCATIONS.filter((item) => {
    const c = item.city.toLowerCase();
    const r = item.region.toLowerCase();
    const co = item.country.toLowerCase();
    const f = item.formatted.toLowerCase();
    return c.includes(clean) || r.includes(clean) || co.includes(clean) || f.includes(clean);
  });

  matches.sort((a, b) => {
    const aCityStarts = a.city.toLowerCase().startsWith(clean);
    const bCityStarts = b.city.toLowerCase().startsWith(clean);
    if (aCityStarts && !bCityStarts) return -1;
    if (!aCityStarts && bCityStarts) return 1;
    const aCityInc = a.city.toLowerCase().includes(clean);
    const bCityInc = b.city.toLowerCase().includes(clean);
    if (aCityInc && !bCityInc) return -1;
    if (!aCityInc && bCityInc) return 1;
    return 0;
  });

  return matches.slice(0, maxResults);
}
