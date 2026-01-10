import { Country } from "@/types/country";

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
    "Growing market for synthetic drugs and cocaine. Canada ranks second in the list of countries whose citizens admitted to regular cocaine use, with about 2.6% of Canadians aged 15+ reporting cocaine use in 2020. In 2023, cocaine saw the most police-reported incidents of illegal trafficking at 8,203 incidents (20.46 per 100,000 population), up 11.7% from one year earlier. Wastewater analysis shows 5 Canadian cities would rank among the 10 cities with the highest levels of cocaine in Europe.",
  stats: {
    seizures: 15000, // kg per year (estimated based on CBSA enforcement)
    traffickingRoutes: ["USA", "MEX", "COL"],
  },
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
