/**
 * Country Types for MUN Interactive Map
 * UNODC Drug Trafficking in Latin America
 */

/**
 * Classification of a country's role in drug trafficking
 */
export type CountryRole = "producer" | "transit" | "consumer" | "mixed" | "other";

/**
 * Type of trafficking route
 */
export type RouteType = "land" | "maritime" | "air";

/**
 * Volume/intensity of trafficking on a route
 */
export type RouteVolume = "high" | "medium" | "low";

/**
 * Outgoing trafficking route from this country
 */
export interface OutgoingRoute {
  /** Destination country ISO 3166-1 alpha-3 code */
  toCountryId: string;

  /** Destination country name for display */
  toCountryName: string;

  /** Type of route (land, maritime, air) */
  type: RouteType;

  /** Volume/intensity of trafficking */
  volume: RouteVolume;

  /** Optional description of the route */
  description?: string;
}

/**
 * Incoming trafficking route to this country (for consumer countries)
 */
export interface IncomingRoute {
  /** Source country ISO 3166-1 alpha-3 code */
  fromCountryId: string;

  /** Source country name for display */
  fromCountryName: string;

  /** Type of route (land, maritime, air) */
  type: RouteType;

  /** Volume/intensity of trafficking */
  volume: RouteVolume;

  /** Optional description of the route */
  description?: string;
}

/**
 * Drug types tracked in statistics
 */
export type DrugType = "cocaine" | "cannabis" | "heroin" | "methamphetamine" | "fentanyl" | "other_synthetics";

/**
 * Seizure data broken down by drug type
 * All values in kilograms unless otherwise noted
 */
export interface DrugSeizures {
  /** Cocaine seizures in kg */
  cocaine?: number;
  /** Cannabis/marijuana seizures in kg */
  cannabis?: number;
  /** Heroin seizures in kg */
  heroin?: number;
  /** Methamphetamine seizures in kg */
  methamphetamine?: number;
  /** Fentanyl seizures in kg */
  fentanyl?: number;
  /** Coca base/paste seizures in kg */
  cocaBase?: number;
  /** Other synthetic drugs in kg */
  otherSynthetics?: number;
  /** Reference year for the data */
  year?: number;
  /** Explanatory note about the data */
  note?: string;
}

/**
 * Estimated transit volume for transit countries
 * All values in metric tons per year unless otherwise noted
 */
export interface TransitVolume {
  /** Cocaine transit in metric tons/year */
  cocaine?: number;
  /** Cannabis transit in metric tons/year */
  cannabis?: number;
  /** Heroin transit in metric tons/year */
  heroin?: number;
  /** Methamphetamine transit in metric tons/year */
  methamphetamine?: number;
  /** Fentanyl transit in metric tons/year */
  fentanyl?: number;
  /** Reference year for the data */
  year?: number;
  /** Explanatory note about the data */
  note?: string;
}

/**
 * Consumption estimates for consumer countries
 * Values can be in metric tons/year or number of users
 */
export interface ConsumptionEstimate {
  /** Cocaine consumption - metric tons/year or users */
  cocaine?: number;
  /** Cannabis consumption - metric tons/year or users */
  cannabis?: number;
  /** Heroin consumption - metric tons/year or users */
  heroin?: number;
  /** Methamphetamine consumption - metric tons/year or users */
  methamphetamine?: number;
  /** Fentanyl consumption - metric tons/year or users */
  fentanyl?: number;
  /** Reference year for the data */
  year?: number;
  /** Unit of measurement: metric_tons or users */
  metric?: "metric_tons" | "users";
  /** Explanatory note about the data */
  note?: string;
}

/**
 * Statistical data related to drug trafficking activities
 */
export interface CountryStats {
  /** Coca cultivation area in hectares */
  cocaCultivation?: number;

  /** Cocaine production in metric tons */
  cocaineProduction?: number;

  /** @deprecated Use drugSeizures for detailed breakdown. Total drug seizures in kg/year */
  seizures?: number;

  /** Detailed drug seizures by type */
  drugSeizures?: DrugSeizures;

  /** Estimated transit volumes (for transit countries) */
  transitVolume?: TransitVolume;

  /** Consumption estimates (for consumer countries) */
  consumption?: ConsumptionEstimate;

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

  /** Outgoing trafficking routes from this country */
  outgoingRoutes?: OutgoingRoute[];

  /** Incoming trafficking routes to this country (for consumer countries) */
  incomingRoutes?: IncomingRoute[];

  /** Active UNODC programs in the country */
  unodcPrograms: UNODCProgram[];

  /** Country's policy stance on drug trafficking */
  policyStance: string;

  /** Major criminal organizations operating in the country */
  criminalOrganizations?: CriminalOrganization[];

  /** Data sources and references */
  sources: string[];
}
