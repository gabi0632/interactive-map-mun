import { Country, OutgoingRoute } from "@/types/country";

/**
 * Colombia Country Data
 * World's largest cocaine producer
 * Data sources: UNODC Colombia Coca Survey 2023, InSight Crime, US State Department
 */
export const colombia: Country = {
  id: "COL",
  name: "Republic of Colombia",
  capital: "Bogota",
  population: 52085168,
  flag: "🇨🇴",
  role: "producer",
  roleDescription:
    "Colombia remains the world's largest coca and cocaine producer, accounting for over 60% of global cocaine production. Cultivation is driven by rural poverty, armed conflict, weak state presence in remote areas, and persistent international demand. Despite decades of eradication efforts, coca cultivation reached 253,000 hectares in 2023, with potential cocaine production surging to record levels of 2,664 metric tons annually.",
  stats: {
    cocaCultivation: 253000, // hectares (2023 UNODC)
    cocaineProduction: 2664, // metric tons (2023 UNODC) - 53% increase from 2022
    eradicationEfforts: 20323, // hectares (2023)
    drugSeizures: {
      cocaine: 739500, // kg (2023) - 12.1% increase from 659,000 kg in 2022
      cocaBase: 87300, // kg (2022 data)
      cannabis: 484000, // kg (2022)
      year: 2023,
      note: "Colombia accounts for ~60-67% of global coca cultivation and is the world's largest cocaine producer"
    },
    traffickingRoutes: ["USA", "MEX", "ECU", "VEN", "BRA", "PAN"],
  },
  outgoingRoutes: [
    {
      toCountryId: "PAN",
      toCountryName: "Panama",
      type: "land",
      volume: "high",
      description: "Colombia to Panama via Darien Gap"
    },
    {
      toCountryId: "VEN",
      toCountryName: "Venezuela",
      type: "land",
      volume: "high",
      description: "Eastern border corridor to Venezuela"
    },
    {
      toCountryId: "ECU",
      toCountryName: "Ecuador",
      type: "land",
      volume: "medium",
      description: "Southern border route to Ecuador"
    },
    {
      toCountryId: "BRA",
      toCountryName: "Brazil",
      type: "land",
      volume: "medium",
      description: "Colombia to Brazil via Amazon"
    },
    {
      toCountryId: "DOM",
      toCountryName: "Dominican Republic",
      type: "maritime",
      volume: "high",
      description: "Colombia to Caribbean"
    },
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "maritime",
      volume: "high",
      description: "Direct route to Florida"
    },
    {
      toCountryId: "MEX",
      toCountryName: "Mexico",
      type: "maritime",
      volume: "high",
      description: "Pacific route to Mexican cartels"
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "air",
      volume: "high",
      description: "Colombia to Spain - major European entry point"
    },
    {
      toCountryId: "FRA",
      toCountryName: "France",
      type: "air",
      volume: "medium",
      description: "Air route to Paris"
    },
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "air",
      volume: "high",
      description: "Direct flights to US East Coast"
    }
  ],
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description:
        "Strengthens transnational investigations and enhances capacity of prosecutors and judges to successfully prosecute transnational organized crime cases. Promotes post-seizure investigations to trace illicit financial flows and target high-value figures within criminal networks.",
      startYear: 2016,
    },
    {
      name: "Container Control Programme (now PCCP)",
      description:
        "Builds capacity of law enforcement and customs units to systematically identify and inspect high-risk cargo containers, minimizing exploitation of commercial trade for illicit drug trafficking.",
      startYear: 2004,
    },
    {
      name: "Alternative Development Programme",
      description:
        "Provides rural communities with sustainable economic alternatives to coca cultivation through crop substitution, market access, and infrastructure development.",
      startYear: 2000,
    },
    {
      name: "Anti-Corruption and Judicial Reform",
      description:
        "Technical assistance to strengthen anti-corruption mechanisms, judicial independence, and law enforcement integrity to combat criminal infiltration of state institutions.",
      startYear: 2010,
    },
  ],
  policyStance:
    "Colombia historically relied on forced eradication and U.S.-backed militarized approaches (e.g., Plan Colombia). Recently, the government has shifted toward a more humanitarian and development-oriented strategy focusing on rural reform, crop substitution, and peace-building rather than aggressive eradication alone.",
  criminalOrganizations: [
    {
      name: "Clan del Golfo (Gulf Clan/AGC)",
      description:
        "Colombia's largest drug cartel and neo-paramilitary group with presence in 392 municipalities as of 2024. Likely the single largest distributor of cocaine globally, with direct partnerships with Mexican cartels and European crime groups. Designated as Foreign Terrorist Organization by U.S. in December 2024. Primary income source is cocaine trafficking.",
    },
    {
      name: "National Liberation Army (ELN)",
      description:
        "Leftist guerrilla group active in 232 municipalities across 19 departments with strongholds in Choco, Norte de Santander, and Arauca. Controls territories associated with drug trafficking and uses tactics including armed assaults, extortion, and kidnapping. Increased municipal presence by 56% between 2019-2024.",
    },
    {
      name: "FARC Dissidents",
      description:
        "Former Revolutionary Armed Forces of Colombia members who rejected the 2016 peace agreement. Operate in coca-growing regions and control drug trafficking routes. Increased municipal presence by 141% between 2019-2024, representing the fastest-growing armed group.",
    },
    {
      name: "Mexican Cartel Cells (Sinaloa, CJNG)",
      description:
        "Mexican cartels have expanded presence in Colombia in recent years, establishing direct partnerships with local producers to control cocaine supply chains from production to U.S. and European markets.",
    },
  ],
  sources: [
    "https://www.unodc.org/unodc/press/releases/2024/October/colombia_-potential-cocaine-production-increased-by-53-per-cent-in-2023--according-to-new-unodc-survey.html",
    "https://insightcrime.org/news/colombias-coca-crops-grew-cocaine-production-exploded/",
    "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/terrorist-designations-of-clan-del-golfo",
    "https://www.gov.uk/government/publications/colombia-country-policy-and-information-notes/country-policy-and-information-note-armed-groups-and-criminal-gangs-colombia-november-2024-accessible",
    "https://www.unodc.org/unodc/en/data-and-analysis/statistics/publications.html",
  ],
};
