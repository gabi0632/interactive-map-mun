// Map center and scale for Latin America view
export const MAP_CENTER: [number, number] = [-60, -15];
export const MAP_SCALE = 400;

// ISO 3166-1 alpha-3 codes for countries in scope (broader list)
export const COUNTRIES_IN_SCOPE = [
  'COL', 'PER', 'BOL',           // Producers
  'MEX', 'GTM', 'HND', 'SLV',    // Transit
  'CRI', 'PAN',                  // Transit
  'ECU', 'VEN', 'BRA',           // Mixed
  'DOM', 'ARG', 'CHL',           // Mixed/Transit
  'GUF',                         // Overseas territory
  'USA', 'CAN',                  // Consumer
  'GBR', 'DEU', 'FRA',           // Consumer (Europe)
  'ESP', 'ITA', 'AUT',           // Consumer/Diplomatic (Europe)
  'NLD', 'BEL',                  // Consumer (Europe)
  'CHN', 'RUS'                   // Other
] as const;

// Countries clickable on map (Latin America + Europe + Key Players)
export const LATIN_AMERICA_COUNTRIES = [
  'COL', 'PER', 'BOL',           // Producers
  'MEX', 'GTM', 'HND', 'SLV',    // Transit
  'CRI', 'PAN',                  // Transit
  'ECU', 'VEN', 'BRA',           // Mixed
  'DOM', 'ARG', 'CHL',           // Mixed/Transit
  'GUF',                         // Overseas territory
  'USA', 'CAN',                  // Consumer (North America)
  'GBR', 'DEU', 'FRA',           // Consumer (Europe)
  'ESP', 'ITA', 'AUT',           // Consumer (Europe)
  'NLD', 'BEL',                  // Consumer (Europe)
  'CHN', 'RUS'                   // Other key players
] as const;

// Role-based color mapping (vintage palette for SVG compatibility)
export const ROLE_COLORS = {
  producer: '#4A7C59',   // Forest green
  transit: '#D4A84B',    // Golden yellow
  mixed: '#C4A35A',      // Amber
  consumer: '#CD5C5C',   // Indian red
  other: '#8B7355',      // Brown
  inactive: '#E8DCC8'    // Parchment beige
} as const;

// Route colors for drug trafficking lines
export const ROUTE_COLORS = {
  land: '#2D5016',       // Dark green
  maritime: '#1E5F8A',   // Navy blue
  air: '#8B2323',        // Dark red
} as const;

// Country label configuration for map display
export interface CountryLabelConfig {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  offsetX?: number;
  offsetY?: number;
  fontSize?: 'sm' | 'md' | 'lg';
}

// Country labels with coordinates (centroids) - using official names matching country data
export const COUNTRY_LABELS: CountryLabelConfig[] = [
  // Producers (South America)
  { id: 'COL', name: 'REPUBLIC OF COLOMBIA', coordinates: [-74, 4], fontSize: 'md' },
  { id: 'PER', name: 'REPUBLIC OF PERU', coordinates: [-76, -10], fontSize: 'md' },
  { id: 'BOL', name: 'PLURINATIONAL STATE OF BOLIVIA', coordinates: [-65, -17], fontSize: 'sm' },

  // Transit (Central America & Caribbean)
  { id: 'MEX', name: 'UNITED MEXICAN STATES', coordinates: [-102, 24], fontSize: 'md' },
  { id: 'GTM', name: 'REPUBLIC OF GUATEMALA', coordinates: [-90.5, 15], fontSize: 'sm' },
  { id: 'HND', name: 'REPUBLIC OF HONDURAS', coordinates: [-86, 15], fontSize: 'sm' },
  { id: 'SLV', name: 'REPUBLIC OF EL SALVADOR', coordinates: [-89, 13], fontSize: 'sm' },
  { id: 'CRI', name: 'REPUBLIC OF COSTA RICA', coordinates: [-84, 9.5], fontSize: 'sm' },
  { id: 'PAN', name: 'REPUBLIC OF PANAMA', coordinates: [-80, 8.5], fontSize: 'sm' },
  { id: 'DOM', name: 'DOMINICAN REPUBLIC', coordinates: [-70, 19], fontSize: 'sm' },

  // Mixed (South America)
  { id: 'ECU', name: 'REPUBLIC OF ECUADOR', coordinates: [-78.5, -1.5], fontSize: 'sm' },
  { id: 'VEN', name: 'BOLIVARIAN REPUBLIC OF VENEZUELA', coordinates: [-66, 8], fontSize: 'md' },
  { id: 'BRA', name: 'FEDERATIVE REPUBLIC OF BRAZIL', coordinates: [-52, -10], fontSize: 'lg' },
  { id: 'ARG', name: 'ARGENTINE REPUBLIC', coordinates: [-65, -38], fontSize: 'md' },
  { id: 'CHL', name: 'REPUBLIC OF CHILE', coordinates: [-70, -30], fontSize: 'sm' },

  // Overseas Territories (South America)
  { id: 'GUF', name: 'FRENCH GUIANA', coordinates: [-53, 4], fontSize: 'sm' },

  // Consumer (North America)
  { id: 'USA', name: 'UNITED STATES OF AMERICA', coordinates: [-98, 39], fontSize: 'lg' },
  { id: 'CAN', name: 'CANADA', coordinates: [-106, 56], fontSize: 'lg' },

  // Consumer (Europe)
  { id: 'GBR', name: 'UNITED KINGDOM', coordinates: [-2, 54], fontSize: 'sm' },
  { id: 'DEU', name: 'FEDERAL REPUBLIC OF GERMANY', coordinates: [10, 51], fontSize: 'sm' },
  { id: 'FRA', name: 'FRENCH REPUBLIC', coordinates: [2, 47], fontSize: 'sm' },
  { id: 'ESP', name: 'KINGDOM OF SPAIN', coordinates: [-4, 40], fontSize: 'sm' },
  { id: 'ITA', name: 'ITALIAN REPUBLIC', coordinates: [12, 43], fontSize: 'sm' },
  { id: 'AUT', name: 'REPUBLIC OF AUSTRIA', coordinates: [14, 47.5], fontSize: 'sm' },
  { id: 'NLD', name: 'KINGDOM OF THE NETHERLANDS', coordinates: [5.5, 52.5], fontSize: 'sm' },
  { id: 'BEL', name: 'KINGDOM OF BELGIUM', coordinates: [4.5, 50.5], fontSize: 'sm' },

  // Other
  { id: 'CHN', name: "PEOPLE'S REPUBLIC OF CHINA", coordinates: [104, 35], fontSize: 'lg' },
  { id: 'RUS', name: 'RUSSIAN FEDERATION', coordinates: [100, 60], fontSize: 'lg' },
];

// Mapping from ISO 3166-1 numeric codes to alpha-3 codes
// (world-110m.json uses numeric codes)
export const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  // Latin America - Producers
  '170': 'COL', // Colombia
  '604': 'PER', // Peru
  '068': 'BOL', // Bolivia
  // Latin America - Transit
  '484': 'MEX', // Mexico
  '320': 'GTM', // Guatemala
  '340': 'HND', // Honduras
  '222': 'SLV', // El Salvador
  '188': 'CRI', // Costa Rica
  '591': 'PAN', // Panama
  '214': 'DOM', // Dominican Republic
  // Latin America - Mixed
  '218': 'ECU', // Ecuador
  '862': 'VEN', // Venezuela
  '076': 'BRA', // Brazil
  '032': 'ARG', // Argentina
  '152': 'CHL', // Chile
  // Consumer - North America
  '840': 'USA', // United States
  '124': 'CAN', // Canada
  // Consumer - Europe
  '826': 'GBR', // United Kingdom
  '276': 'DEU', // Germany
  '250': 'FRA', // France
  '724': 'ESP', // Spain
  '380': 'ITA', // Italy
  '040': 'AUT', // Austria
  '528': 'NLD', // Netherlands
  '056': 'BEL', // Belgium
  // Other
  '156': 'CHN', // China
  '643': 'RUS', // Russia
  // Overseas Territories
  '254': 'GUF', // French Guiana
};

export const GEO_URL = '/geo/world-110m.json';
export const FRENCH_GUIANA_GEO_URL = '/geo/french-guiana.json';
