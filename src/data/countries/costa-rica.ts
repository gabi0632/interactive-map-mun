import { Country, OutgoingRoute } from "@/types/country";

/**
 * Costa Rica Country Data
 * Role: Transit via maritime routes and strong transport infrastructure
 */
export const costaRica: Country = {
  id: "CRI",
  name: "Republic of Costa Rica",
  capital: "San José",
  population: 5180829,
  flag: "🇨🇷",
  role: "transit",
  roleDescription:
    "Costa Rica is increasingly targeted by drug traffickers due to its extensive Pacific and Caribbean coastlines, strong transport infrastructure, and stable democratic institutions. As a non-militarized country, Costa Rica relies on police forces and international partnerships for drug interdiction. Maritime trafficking routes exploit the country's coastal geography for cocaine shipments heading to North America and Europe.",
  stats: {
    drugSeizures: {
      cocaine: 27000, // kg (2024) - increased from 21,400 kg in 2023
      year: 2024,
      note: "Major 2023 seizure: 2,148 kg in Limón (Caribbean port). Homicide rate increased 41% year-on-year due to cocaine trafficking competition. Operation Caribe launched in 2024."
    },
    transitVolume: {
      cocaine: 60, // metric tons/year estimated via Pacific and Caribbean routes
      year: 2023,
      note: "Port of Limón key Caribbean exit point. Criminals hide drugs in legitimate cargo containers."
    },
    traffickingRoutes: ["USA", "MEX", "NLD", "ESP"],
  },
  outgoingRoutes: [
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "maritime",
      volume: "medium",
      description: "Costa Rica to Florida"
    },
    {
      toCountryId: "MEX",
      toCountryName: "Mexico",
      type: "land",
      volume: "medium",
      description: "Land route northward to Mexico"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "maritime",
      volume: "medium",
      description: "Costa Rica to Netherlands"
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "maritime",
      volume: "medium",
      description: "Maritime route to Spain"
    }
  ],
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description:
        "Active program strengthening port security at Limón (Caribbean) and Puntarenas/Caldera (Pacific) to detect cocaine shipments hidden in commercial cargo. Focuses on container inspection technology and risk profiling.",
      startYear: 2017,
    },
    {
      name: "CRIMJUST",
      description:
        "Enhances Costa Rica's participation in transnational investigations and regional intelligence sharing to combat organized crime networks using the country as a transit point.",
      startYear: 2018,
    },
    {
      name: "Maritime Interdiction Support",
      description:
        "Technical cooperation providing training and equipment for coastal patrol operations, focusing on go-fast boats and semi-submersible vessel detection.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Costa Rica focuses on maritime patrols, intelligence-led policing, and regional cooperation. As a non-militarized country, it relies heavily on police forces and international partnerships.",
  sources: [
    "https://www.unodc.org/ropan/en/BorderControl/container-control/costa-rica.html",
    "https://insightcrime.org/costa-rica-organized-crime-news/",
    "https://www.state.gov/bureaus-offices/under-secretary-for-civilian-security-democracy-and-human-rights/bureau-of-international-narcotics-and-law-enforcement-affairs/",
    "https://www.crisisgroup.org/latin-america-caribbean/colombia-ecuador-guatemala-honduras-mexico/108-curbing-violence-latin-america-drug-trafficking-hotspots",
  ],
};
