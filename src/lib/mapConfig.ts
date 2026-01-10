// Map center and scale for Latin America view
export const MAP_CENTER: [number, number] = [-60, -15];
export const MAP_SCALE = 400;

// ISO 3166-1 alpha-3 codes for countries in scope
export const LATIN_AMERICA_COUNTRIES = [
  'COL', 'PER', 'BOL',           // Producers
  'MEX', 'GTM', 'HND', 'SLV',    // Transit
  'NIC', 'CRI', 'PAN',           // Transit
  'ECU', 'VEN', 'BRA',           // Mixed
  'USA', 'CAN'                   // Consumer
] as const;

// Role-based color mapping
export const ROLE_COLORS = {
  producer: 'hsl(var(--producer))',
  transit: 'hsl(var(--transit))',
  mixed: 'hsl(var(--mixed))',
  consumer: 'hsl(var(--consumer))',
  inactive: 'hsl(var(--inactive))'
} as const;

export const GEO_URL = '/geo/world-110m.json';
