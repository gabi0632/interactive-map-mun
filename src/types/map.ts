/**
 * Map Component Types
 * Types for react-simple-maps based interactive map
 */

import type { Country } from './country';

/**
 * Props for the main Map component
 */
export interface MapProps {
  /** Callback when a country is clicked, receives country ID (ISO alpha-3) */
  onCountryClick: (countryId: string) => void;

  /** Currently selected country ID (null if none selected) */
  selectedCountry: string | null;
}

/**
 * Properties from GeoJSON features
 * Used by react-simple-maps for rendering
 */
export interface GeoFeatureProperties {
  /** Country name from GeoJSON */
  name: string;

  /** ISO 3166-1 alpha-3 country code from GeoJSON */
  ISO_A3: string;
}
