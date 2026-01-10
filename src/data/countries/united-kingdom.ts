import { Country } from "@/types/country";

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
    seizures: 35000, // kg per year (estimated based on UK enforcement data)
    traffickingRoutes: ["ESP", "NLD", "BEL", "COL"],
  },
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
