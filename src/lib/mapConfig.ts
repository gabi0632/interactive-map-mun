// Map center and scale for Latin America view
export const MAP_CENTER: [number, number] = [-60, -15];
export const MAP_SCALE = 400;

// ISO 3166-1 alpha-3 codes for countries in scope (broader list)
export const COUNTRIES_IN_SCOPE = [
  'COL', 'PER', 'BOL',           // Producers
  'MEX', 'GTM', 'HND', 'SLV',    // Transit
  'NIC', 'CRI', 'PAN',           // Transit
  'ECU', 'VEN', 'BRA',           // Mixed
  'DOM', 'ARG', 'CHL',           // Mixed/Transit
  'USA', 'CAN',                  // Consumer
  'GBR', 'DEU', 'FRA',           // Consumer (Europe)
  'ESP', 'ITA', 'AUT',           // Consumer/Diplomatic (Europe)
  'CHN', 'RUS'                   // Other
] as const;

// Latin America countries (clickable on map)
export const LATIN_AMERICA_COUNTRIES = [
  'COL', 'PER', 'BOL',           // Producers
  'MEX', 'GTM', 'HND', 'SLV',    // Transit
  'NIC', 'CRI', 'PAN',           // Transit
  'ECU', 'VEN', 'BRA',           // Mixed
  'USA', 'CAN'                   // Consumer
] as const;

// Role-based color mapping (hex values for SVG compatibility)
export const ROLE_COLORS = {
  producer: '#EF4444',   // red
  transit: '#F97316',    // orange
  mixed: '#EAB308',      // yellow
  consumer: '#3B82F6',   // blue
  other: '#6B7280',      // gray-500
  inactive: '#9CA3AF'    // gray-400
} as const;

// Mapping from ISO 3166-1 numeric codes to alpha-3 codes
// (world-110m.json uses numeric codes)
export const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  '170': 'COL', // Colombia
  '604': 'PER', // Peru
  '068': 'BOL', // Bolivia
  '484': 'MEX', // Mexico
  '320': 'GTM', // Guatemala
  '340': 'HND', // Honduras
  '222': 'SLV', // El Salvador
  '558': 'NIC', // Nicaragua
  '188': 'CRI', // Costa Rica
  '591': 'PAN', // Panama
  '218': 'ECU', // Ecuador
  '862': 'VEN', // Venezuela
  '076': 'BRA', // Brazil
  '840': 'USA', // United States
  '124': 'CAN', // Canada
};

export const GEO_URL = '/geo/world-110m.json';
