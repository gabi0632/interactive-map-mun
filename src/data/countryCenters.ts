/**
 * Geographic center coordinates for each country
 * Used for zoom-to-country functionality
 * Format: [longitude, latitude]
 */
export const COUNTRY_CENTERS: Record<string, [number, number]> = {
  // Producer countries
  COL: [-74.3, 4.5],    // Colombia
  PER: [-76.0, -9.2],   // Peru
  BOL: [-64.7, -16.3],  // Bolivia

  // Transit countries
  MEX: [-102.5, 23.6],  // Mexico
  GTM: [-90.2, 15.8],   // Guatemala
  HND: [-86.2, 14.1],   // Honduras
  SLV: [-88.9, 13.8],   // El Salvador
  CRI: [-84.0, 9.7],    // Costa Rica
  PAN: [-80.1, 8.4],    // Panama
  DOM: [-70.2, 18.7],   // Dominican Republic

  // Mixed role countries
  ECU: [-78.2, -1.8],   // Ecuador
  VEN: [-66.6, 6.4],    // Venezuela
  BRA: [-51.9, -14.2],  // Brazil
  ARG: [-64.0, -34.0],  // Argentina (centered on Buenos Aires area)
  CHL: [-70.6, -33.4],  // Chile (centered on Santiago - narrow country)

  // Consumer countries
  USA: [-95.7, 37.1],   // United States
  CAN: [-106.3, 56.1],  // Canada
  GBR: [-3.4, 55.4],    // United Kingdom
  DEU: [10.5, 51.2],    // Germany
  FRA: [2.2, 46.2],     // France
  ESP: [-3.7, 40.5],    // Spain
  ITA: [12.6, 41.9],    // Italy
  AUT: [14.6, 47.5],    // Austria

  // Other countries
  CHN: [104.2, 35.9],   // China
  RUS: [105.3, 61.5],   // Russia
};

/**
 * Get center coordinates for a country
 */
export function getCountryCenter(countryId: string): [number, number] | undefined {
  return COUNTRY_CENTERS[countryId];
}

/**
 * Default map center (focused on Latin America)
 */
export const DEFAULT_CENTER: [number, number] = [-60, -5];

/**
 * Default center for mobile (more focused on South America)
 */
export const DEFAULT_CENTER_MOBILE: [number, number] = [-65, -10];

/**
 * Zoom levels for different views
 */
export const ZOOM_LEVELS = {
  MIN: 0.8,
  MAX: 8,
  DEFAULT: 1.5,
  DEFAULT_MOBILE: 1.8,
  COUNTRY_FOCUS: 3,
  REGION_FOCUS: 2,
} as const;
