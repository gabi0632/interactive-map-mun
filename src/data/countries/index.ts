/**
 * Country Data Index
 * Aggregates and exports all country data for the MUN Interactive Map
 */

import { Country } from "@/types/country";

// Producer countries (3)
import { colombia } from "./colombia";
import { peru } from "./peru";
import { bolivia } from "./bolivia";

// Transit countries (8)
import { mexico } from "./mexico";
import { guatemala } from "./guatemala";
import { honduras } from "./honduras";
import { elSalvador } from "./el-salvador";
import { costaRica } from "./costa-rica";
import { panama } from "./panama";
import { dominicanRepublic } from "./dominican-republic";
import { uruguay } from "./uruguay";

// Mixed role countries (5)
import { ecuador } from "./ecuador";
import { venezuela } from "./venezuela";
import { brazil } from "./brazil";
import { argentina } from "./argentina";
import { chile } from "./chile";

// Consumer countries (10)
import { usa } from "./usa";
import { canada } from "./canada";
import { unitedKingdom } from "./united-kingdom";
import { germany } from "./germany";
import { france } from "./france";
import { spain } from "./spain";
import { italy } from "./italy";
import { austria } from "./austria";
import { netherlands } from "./netherlands";
import { belgium } from "./belgium";

// Other role countries (2)
import { china } from "./china";
import { russia } from "./russia";

// Overseas territories (1)
import { frenchGuiana } from "./french-guiana";

/**
 * Producer countries (cocaine production)
 */
export const producerCountries: Country[] = [colombia, peru, bolivia];

/**
 * Transit countries (drug trafficking routes)
 */
export const transitCountries: Country[] = [
  mexico,
  guatemala,
  honduras,
  elSalvador,
  costaRica,
  panama,
  dominicanRepublic,
  uruguay,
];

/**
 * Mixed role countries (production, transit, and/or consumption)
 */
export const mixedCountries: Country[] = [
  ecuador,
  venezuela,
  brazil,
  argentina,
  chile,
];

/**
 * Consumer countries (major destination markets)
 */
export const consumerCountries: Country[] = [
  usa,
  canada,
  unitedKingdom,
  germany,
  france,
  spain,
  italy,
  austria,
  netherlands,
  belgium,
];

/**
 * Other role countries (diplomatic actors, precursor sources, territories)
 */
export const otherCountries: Country[] = [china, russia, frenchGuiana];

/**
 * All countries in the dataset (29 total)
 */
export const allCountries: Country[] = [
  ...producerCountries,
  ...transitCountries,
  ...mixedCountries,
  ...consumerCountries,
  ...otherCountries,
];

/**
 * Country lookup by ISO 3166-1 alpha-3 code
 */
export const countryById: Record<string, Country> = allCountries.reduce(
  (acc, country) => {
    acc[country.id] = country;
    return acc;
  },
  {} as Record<string, Country>
);

/**
 * Get country by ID
 */
export function getCountryById(id: string): Country | undefined {
  return countryById[id];
}

/**
 * Get countries by role
 */
export function getCountriesByRole(role: Country["role"]): Country[] {
  switch (role) {
    case "producer":
      return producerCountries;
    case "transit":
      return transitCountries;
    case "mixed":
      return mixedCountries;
    case "consumer":
      return consumerCountries;
    case "other":
      return otherCountries;
    default:
      return [];
  }
}

// Re-export individual countries for direct access
export {
  // Producers
  colombia,
  peru,
  bolivia,
  // Transit
  mexico,
  guatemala,
  honduras,
  elSalvador,
  costaRica,
  panama,
  dominicanRepublic,
  uruguay,
  // Mixed
  ecuador,
  venezuela,
  brazil,
  argentina,
  chile,
  // Consumer
  usa,
  canada,
  unitedKingdom,
  germany,
  france,
  spain,
  italy,
  austria,
  netherlands,
  belgium,
  // Other
  china,
  russia,
  // Overseas territories
  frenchGuiana,
};
