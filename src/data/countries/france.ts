import { Country } from "@/types/country";

/**
 * France
 * High cocaine demand and major entry via maritime routes
 */
export const france: Country = {
  id: "FRA",
  name: "France",
  capital: "Paris",
  population: 65584518,
  flag: "🇫🇷",
  role: "consumer",
  roleDescription:
    "High cocaine demand and major entry via maritime routes. In 2023, cocaine seizures in France amounted to 23.2 tonnes, representing a 16% decrease from the record 27.7 tonnes seized in 2022. Maritime transport is the main route for cocaine entering the country, accounting for 75.4% of seizures in 2022, though this dropped to 55% in 2023 due to enhanced security measures. The port of Le Havre is the main entry point with over 10 tonnes seized in 2021-2022, accounting for 78% of all cocaine seized in French ports.",
  stats: {
    seizures: 23200, // kg in 2023
    traffickingRoutes: ["GUF", "MTQ", "ESP", "COL", "BRA"],
  },
  unodcPrograms: [
    {
      name: "Caribbean and French Territories Programme",
      description:
        "UNODC cooperation focusing on French Guiana and French Antilles as key transit points for cocaine shipments to mainland France.",
      startYear: 2013,
    },
    {
      name: "Port Security Enhancement",
      description:
        "France works with UNODC to improve container inspection and maritime security at major commercial ports including Le Havre, Dunkirk, Saint-Nazaire, and Marseille.",
      startYear: 2016,
    },
    {
      name: "Europol-UNODC Coordination",
      description:
        "France actively participates in expanding Europol cooperation with UNODC for dismantling organized crime networks operating Atlantic routes.",
      startYear: 2015,
    },
  ],
  policyStance:
    "France focuses on maritime interdiction, organized-crime dismantling, and expanding Europol cooperation. It also supports UNODC capacity-building in Latin America. Recent focus on enhanced port security measures following record seizures.",
  criminalOrganizations: [],
  sources: [
    "https://www.ofdt.fr/sites/ofdt/files/2025-07/notebilanoffre_en.pdf",
    "https://www.statista.com/topics/7909/drugs-in-france/",
    "https://www.euda.europa.eu/publications/european-drug-report/2025/cocaine_en",
    "https://www.gard.no/insights/maritime-cocaine-smuggling-a-european-perspective/",
  ],
};
