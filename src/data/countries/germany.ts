import { Country, IncomingRoute } from "@/types/country";

/**
 * Germany
 * European consumer market and logistics hub
 */
export const germany: Country = {
  id: "DEU",
  name: "Federal Republic of Germany",
  capital: "Berlin",
  population: 83294633,
  flag: "🇩🇪",
  role: "consumer",
  roleDescription:
    "A European consumer market and logistics hub targeted by traffickers. Germany seized 43 tonnes of cocaine in 2023, with large consignments amounting to 25 tonnes seized in the Port of Hamburg that year, double the quantity reported in 2022. The Port of Hamburg serves as a major entry point for cocaine destined for Central and Eastern European markets. Germany is part of the record-breaking EU cocaine seizures of 419 tonnes in 2023.",
  stats: {
    drugSeizures: {
      cocaine: 43000, // kg (2023) - Port of Hamburg alone: 25 tonnes (double 2022)
      year: 2023,
      note: "Part of record EU seizures of 419 tonnes in 2023. Hamburg is main entry point for Central/Eastern Europe."
    },
    consumption: {
      cocaine: 700000, // estimated users
      year: 2022,
      metric: "users",
      note: "Part of 14 million EU adults who tried cocaine. Germany is major logistics hub for onward distribution."
    },
    traffickingRoutes: ["NLD", "BEL", "ESP", "COL"],
  },
  incomingRoutes: [
    {
      fromCountryId: "ECU",
      fromCountryName: "Ecuador",
      type: "maritime",
      volume: "medium",
      description: "Ecuador to Hamburg"
    }
  ],
  unodcPrograms: [
    {
      name: "Port Control Programme (PCCP)",
      description:
        "Germany participates in UNODC's container control initiative, with Hamburg as a critical inspection point for cocaine shipments from Latin America.",
      startYear: 2015,
    },
    {
      name: "Evidence-Based Drug Policy Support",
      description:
        "Germany is a key UNODC donor advocating evidence-based drug policy and harm reduction approaches in international forums.",
      startYear: 2008,
    },
    {
      name: "CRIMJUST",
      description:
        "Active in transnational investigations targeting cocaine trafficking networks operating between Latin America and Europe.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Germany prioritizes financial controls, customs enforcement, organized-crime investigations, and public-health approaches. It is a key UNODC donor advocating evidence-based drug policy. Focus on disrupting logistics chains and money laundering networks supporting cocaine trade.",
  criminalOrganizations: [],
  sources: [
    "https://www.euda.europa.eu/publications/european-drug-report/2025/cocaine_en",
    "https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2025-maps.html",
    "https://unis.unvienna.org/unis/en/pressrels/2025/unisnar1499.html",
  ],
};
