import { Country } from "@/types/country";

/**
 * United States of America
 * Major destination market for cocaine, methamphetamine, and fentanyl
 */
export const usa: Country = {
  id: "USA",
  name: "United States",
  capital: "Washington, D.C.",
  population: 345290757,
  flag: "🇺🇸",
  role: "consumer",
  roleDescription:
    "Major destination market for cocaine, methamphetamine, and fentanyl. North America had an estimated 6.5 million cocaine users in 2022, representing 28% of global users. Cocaine consumption has increased significantly between 2019-2025, with cocaine-involved overdose deaths reaching about 29,000 in 2023. The U.S. is cheaper, purer, and more widespread than in decades.",
  stats: {
    seizures: 145000, // kg per year (estimated based on interdiction efforts)
    traffickingRoutes: ["MEX", "COL", "PER", "BOL"],
  },
  unodcPrograms: [
    {
      name: "Border Control and Interdiction",
      description:
        "U.S. supports UNODC programs focused on border security, maritime interdiction, and customs enforcement in source and transit countries.",
      startYear: 2010,
    },
    {
      name: "CRIMJUST",
      description:
        "Global Programme for Strengthening Criminal Investigation and Criminal Justice Cooperation along Cocaine Routes - U.S. is a key partner and intelligence sharing participant.",
      startYear: 2016,
    },
    {
      name: "Financial Intelligence",
      description:
        "U.S. Treasury and DEA work with UNODC on financial flows and money laundering related to transnational drug trafficking organizations.",
      startYear: 2015,
    },
  ],
  policyStance:
    "U.S. drug policy combines law enforcement, interdiction, border control, and public health initiatives. It pressures Latin American partners to strengthen supply-side measures and is a primary donor to UNODC and regional anti-narcotics programs. Recent shifts include increased focus on harm reduction and treatment for opioid crisis.",
  criminalOrganizations: [],
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/WDR_2025/WDR25_B1_Key_findings.pdf",
    "https://www.unodc.org/documents/data-and-analysis/cocaine/Global_cocaine_report_2023.pdf",
    "https://worldpopulationreview.com/countries/united-states",
    "https://countrymeters.info/en/United_States_of_America_(USA)",
  ],
};
