import { Country, IncomingRoute } from "@/types/country";

/**
 * United Kingdom
 * Major European market with increasing cocaine consumption and port infiltration
 */
export const unitedKingdom: Country = {
  id: "GBR",
  name: "United Kingdom",
  capital: "London",
  population: 67736802,
  flag: "🇬🇧",
  role: "consumer",
  roleDescription:
    "A major European market with increasing cocaine consumption and port infiltration by organized crime. The UK has a cocaine prevalence rate of 2.7% among the adult population (ages 15-64) reporting past-year consumption according to UNODC data. Self-reported data systematically underestimates true consumption, with validation studies revealing underreporting rates exceeding 50%. Major ports including Felixstowe, Southampton, and London Gateway serve as entry points for cocaine from Latin America.",
  stats: {
    drugSeizures: {
      cocaine: 28000, // kg (FY ending March 2024) - 52% increase from 2023
      heroin: 441, // kg (FY ending March 2024) - down 54% from 950 kg, lowest since 1989
      cannabis: 74000, // kg (FY ending March 2024) - 58% increase, highest since records began 1973
      year: 2024,
      note: "Total 119 tonnes seized (street value ~£3 billion). Border Force powder cocaine: 26.57 tonnes (+75% from 15.22 tonnes in 2023). 217,644 seizure incidents (+13%)."
    },
    consumption: {
      cocaine: 1800000, // estimated users - 2.7% adult prevalence
      year: 2023,
      metric: "users",
      note: "2.7% prevalence among adults 15-64 (past-year). Validation studies show underreporting exceeds 50%."
    },
    traffickingRoutes: ["ESP", "NLD", "BEL", "COL"],
  },
  incomingRoutes: [
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "air",
      volume: "medium",
      description: "Brazil to UK"
    },
    {
      fromCountryId: "ECU",
      fromCountryName: "Ecuador",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Ecuador"
    },
    {
      fromCountryId: "ARG",
      fromCountryName: "Argentina",
      type: "air",
      volume: "low",
      description: "Air route from Argentina"
    }
  ],
  unodcPrograms: [
    {
      name: "Maritime Security Programme",
      description:
        "UK supports UNODC maritime security initiatives to combat drug trafficking through Caribbean and Atlantic routes.",
      startYear: 2014,
    },
    {
      name: "CRIMJUST",
      description:
        "Active participant in global intelligence cooperation on cocaine trafficking routes and transnational organized crime networks.",
      startYear: 2016,
    },
    {
      name: "Financial Action Task Force Support",
      description:
        "Collaboration with UNODC on anti-money laundering measures targeting drug trafficking proceeds.",
      startYear: 2010,
    },
  ],
  policyStance:
    "UK strategy emphasizes anti-money-laundering measures, port surveillance, and global intelligence cooperation. It supports multilateral UNODC frameworks and has increased focus on disrupting organized crime networks infiltrating legitimate maritime trade. The UK maintains both enforcement and public health approaches.",
  criminalOrganizations: [],
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/WDR_2025/WDR25_B1_Key_findings.pdf",
    "https://worldpopulationreview.com/country-rankings/most-cocaine-use-by-country",
    "https://en.wikipedia.org/wiki/List_of_countries_by_prevalence_of_cocaine_use",
  ],
};
