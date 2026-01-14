import { Country, IncomingRoute } from "@/types/country";

/**
 * United States of America
 * Major destination market for cocaine, methamphetamine, and fentanyl
 */
export const usa: Country = {
  id: "USA",
  name: "United States of America",
  capital: "Washington, D.C.",
  population: 345290757,
  flag: "🇺🇸",
  role: "consumer",
  roleDescription:
    "Major destination market for cocaine, methamphetamine, and fentanyl. North America had an estimated 6.5 million cocaine users in 2022, representing 28% of global users. Cocaine consumption has increased significantly between 2019-2025, with cocaine-involved overdose deaths reaching about 29,000 in 2023. The U.S. is cheaper, purer, and more widespread than in decades.",
  stats: {
    drugSeizures: {
      cocaine: 130000, // kg (FY2023 estimate based on CBP/DEA data)
      methamphetamine: 63500, // kg (140,000 lbs FY2023)
      fentanyl: 12250, // kg (27,000 lbs CBP FY2023; 43,000+ lbs DHS total)
      heroin: 2500, // kg (declining trend)
      cannabis: 68000, // kg (150,000 lbs FY2023)
      year: 2023,
      note: "CBP seized ~549,000 lbs total drugs nationwide (FY2023). Fentanyl is primary crisis - 72,776 fentanyl-related deaths in 2023."
    },
    consumption: {
      cocaine: 4300000, // users aged 12+ (2024 NSDUH) - down from 4.8M in 2021
      fentanyl: 29000, // deaths/year (cocaine-involved overdoses reached ~29,000 in 2023)
      year: 2024,
      metric: "users",
      note: "North America has ~6.5 million cocaine users (28% of global users). Cocaine prevalence: 1.5% of population 12+. 87,000 total overdose deaths projected for 2024 (24% decline)."
    },
    traffickingRoutes: ["MEX", "COL", "PER", "BOL"],
  },
  incomingRoutes: [
    {
      fromCountryId: "MEX",
      fromCountryName: "Mexico",
      type: "land",
      volume: "high",
      description: "Mexico-US border crossing - primary trafficking corridor"
    },
    {
      fromCountryId: "MEX",
      fromCountryName: "Mexico",
      type: "air",
      volume: "medium",
      description: "Air routes from Mexico"
    },
    {
      fromCountryId: "COL",
      fromCountryName: "Colombia",
      type: "maritime",
      volume: "high",
      description: "Direct route from Colombia to Florida"
    },
    {
      fromCountryId: "COL",
      fromCountryName: "Colombia",
      type: "air",
      volume: "high",
      description: "Direct flights from Colombia"
    },
    {
      fromCountryId: "DOM",
      fromCountryName: "Dominican Republic",
      type: "maritime",
      volume: "high",
      description: "Caribbean route from Dominican Republic"
    },
    {
      fromCountryId: "DOM",
      fromCountryName: "Dominican Republic",
      type: "air",
      volume: "high",
      description: "Air route from Dominican Republic to East Coast"
    },
    {
      fromCountryId: "VEN",
      fromCountryName: "Venezuela",
      type: "maritime",
      volume: "medium",
      description: "Venezuela to Florida"
    },
    {
      fromCountryId: "PAN",
      fromCountryName: "Panama",
      type: "maritime",
      volume: "high",
      description: "Panama to USA via Caribbean"
    },
    {
      fromCountryId: "CRI",
      fromCountryName: "Costa Rica",
      type: "maritime",
      volume: "medium",
      description: "Costa Rica to Florida"
    },
    {
      fromCountryId: "GTM",
      fromCountryName: "Guatemala",
      type: "air",
      volume: "medium",
      description: "Air route from Guatemala"
    },
    {
      fromCountryId: "HND",
      fromCountryName: "Honduras",
      type: "air",
      volume: "medium",
      description: "Air route from Honduras"
    },
    {
      fromCountryId: "CHL",
      fromCountryName: "Chile",
      type: "maritime",
      volume: "medium",
      description: "Chile to US West Coast"
    }
  ],
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
