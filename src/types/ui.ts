/**
 * UI Component Types
 * Props for UI components in the application
 */

import type { Country } from './country';

/**
 * Props for the CountryPanel component
 * Displays detailed country information in a side panel
 */
export interface CountryPanelProps {
  /** Country data to display (null if no country selected) */
  country: Country | null;

  /** Callback to close the panel */
  onClose: () => void;

  /** Whether the panel is currently open */
  isOpen: boolean;
}
