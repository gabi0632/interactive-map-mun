/**
 * Country Types for MUN Interactive Map
 * UNODC Drug Trafficking in Latin America
 */

/**
 * Classification of a country's role in drug trafficking
 */
export type CountryRole = "producer" | "transit" | "consumer" | "mixed" | "other";

/**
 * Statistical data related to drug trafficking activities
 */
export interface CountryStats {
  /** Coca cultivation area in hectares */
  cocaCultivation?: number;

  /** Cocaine production in metric tons */
  cocaineProduction?: number;

  /** Drug seizures in kilograms per year */
  seizures?: number;

  /** Eradication efforts in hectares */
  eradicationEfforts?: number;

  /** Array of destination country codes (ISO 3166-1 alpha-3) */
  traffickingRoutes?: string[];
}

/**
 * UNODC (United Nations Office on Drugs and Crime) Program
 */
export interface UNODCProgram {
  /** Program name (e.g., "PCCP", "CRIMJUST") */
  name: string;

  /** Detailed description of the program */
  description: string;

  /** Year the program started in this country */
  startYear?: number;
}

/**
 * Criminal organization operating in a country
 */
export interface CriminalOrganization {
  /** Organization name */
  name: string;

  /** Description of activities and influence */
  description: string;
}

/**
 * Official status of a territory/country
 * Used to distinguish sovereign nations from territories
 */
export type OfficialStatus =
  | "sovereign"
  | "overseas_department"
  | "overseas_territory"
  | "autonomous_region"
  | "dependent_territory";

/**
 * Main Country interface - represents all data for a country
 * in the drug trafficking context
 */
export interface Country {
  /** ISO 3166-1 alpha-3 country code (e.g., "COL", "MEX") */
  id: string;

  /** Full country name */
  name: string;

  /** Official status (sovereign nation, territory, etc.) */
  officialStatus?: OfficialStatus;

  /** Parent country code if this is a territory (e.g., "FRA" for French Guiana) */
  sovereigntyOf?: string;

  /** Capital city */
  capital: string;

  /** Population count */
  population: number;

  /** Country flag emoji or path to flag image */
  flag: string;

  /** Country's role in drug trafficking */
  role: CountryRole;

  /** Detailed description of the country's role */
  roleDescription: string;

  /** Drug trafficking statistics */
  stats: CountryStats;

  /** Active UNODC programs in the country */
  unodcPrograms: UNODCProgram[];

  /** Country's policy stance on drug trafficking */
  policyStance: string;

  /** Major criminal organizations operating in the country */
  criminalOrganizations?: CriminalOrganization[];

  /** Data sources and references */
  sources: string[];
}
