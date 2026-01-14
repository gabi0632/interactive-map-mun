import { Country, IncomingRoute } from "@/types/country";

/**
 * Canada
 * Growing market for synthetic drugs and cocaine
 */
export const canada: Country = {
  id: "CAN",
  name: "Canada",
  capital: "Ottawa",
  population: 40500000,
  flag: "🇨🇦",
  role: "consumer",
  roleDescription:
    "Growing market for synthetic drugs and cocaine. About 2.6% of Canadians aged 15+ reported cocaine use in 2020, making Canada one of the higher-consumption countries. In 2023, cocaine saw the most police-reported incidents of illegal trafficking at 8,203 incidents (20.46 per 100,000 population), up 11.7% from one year earlier. Wastewater analysis shows 5 Canadian cities would rank among the 10 cities with the highest levels of cocaine in Europe.",
  stats: {
    drugSeizures: {
      cocaine: 239, // kg (Pacific Region Jan-Oct 2023)
      methamphetamine: 7900, // kg (Pacific Region Jan-Oct 2023)
      fentanyl: 5, // kg (2024) - +775% from 2023 indicating very low baseline
      year: 2023,
      note: "Regional data only. Southbound seizures (drugs leaving Canada to US): 25,000 kg total in 2023. Total narcotic seizure incidents: 6,389 (Pacific Region)."
    },
    consumption: {
      cocaine: 1000000, // estimated users - 2.6% prevalence
      year: 2020,
      metric: "users",
      note: "2.6% of Canadians 15+ reported cocaine use in 2020. 8,203 police trafficking incidents (2023, +11.7%). 5 Canadian cities would rank among top 10 European cities for wastewater cocaine levels."
    },
    traffickingRoutes: ["USA", "MEX", "COL"],
  },
  incomingRoutes: [
    {
      fromCountryId: "MEX",
      fromCountryName: "Mexico",
      type: "land",
      volume: "medium",
      description: "Mexico to Canada via US corridor"
    },
    {
      fromCountryId: "VEN",
      fromCountryName: "Venezuela",
      type: "air",
      volume: "low",
      description: "Air route from Venezuela"
    }
  ],
  unodcPrograms: [
    {
      name: "Global Programme Support",
      description:
        "Canada supports UNODC globally with development-oriented funding focused on harm reduction and alternative development in source countries.",
      startYear: 2012,
    },
    {
      name: "Precursor Control Initiative",
      description:
        "Collaboration with UNODC on monitoring and controlling chemical precursors used in synthetic drug production, particularly fentanyl.",
      startYear: 2018,
    },
  ],
  policyStance:
    "Canada balances enforcement with harm-reduction policies. It invests in public-health strategies (e.g., safe supply, treatment access) and supports UNODC globally with development-oriented funding. Focus on addressing opioid crisis while managing cocaine trafficking through border security.",
  criminalOrganizations: [],
  sources: [
    "https://ccsa.ca/sites/default/files/2022-10/CCSA-Canadian-Drug-Summary-Cocaine-2022-en.pdf",
    "https://www.statcan.gc.ca/o1/en/plus/8193-illegal-drugs-and-trafficking-canada",
    "https://worldpopulationreview.com/countries/canada",
    "https://www.cbsa-asfc.gc.ca/security-securite/seizure-saisie-eng.html",
  ],
};
