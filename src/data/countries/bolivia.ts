import { Country, OutgoingRoute } from "@/types/country";

/**
 * Bolivia Country Data
 * Third-largest coca cultivator with legal coca tradition
 * Data sources: UNODC Bolivia Coca Survey 2024, Organized Crime Index, InSight Crime
 */
export const bolivia: Country = {
  id: "BOL",
  name: "Plurinational State of Bolivia",
  capital: "La Paz",
  population: 12388571,
  flag: "🇧🇴",
  role: "producer",
  roleDescription:
    "Bolivia is the world's third-largest coca cultivator with a unique legal framework permitting cultivation on up to 22,000 hectares for traditional Indigenous uses including coca leaf chewing and herbal infusions. However, actual cultivation reached 34,000 hectares in 2024, exceeding legal limits by 12,000 hectares. This excess production feeds illicit cocaine markets, with potential cocaine production estimated between 143-223 metric tons annually depending on methodology. Bolivia has emerged as a key hub in the global drug trade, providing refuge for high-value traffickers.",
  stats: {
    cocaCultivation: 34000, // hectares (2024 UNODC) - 10% increase from 2023, exceeds legal limit by 12,000 ha
    cocaineProduction: 183, // metric tons (midpoint of 143-223 MT range)
    eradicationEfforts: 10001, // hectares (2024) - 3% decrease
    drugSeizures: {
      cocaine: 45936, // kg (2024) - 115% increase from previous year
      year: 2024,
      note: "Largest ever seizure: 9 tons in December 2023. Bolivia accounts for ~13% of global coca cultivation."
    },
    traffickingRoutes: ["BRA", "ARG", "PER", "PRY", "CHL"],
  },
  outgoingRoutes: [
    {
      toCountryId: "BRA",
      toCountryName: "Brazil",
      type: "land",
      volume: "medium",
      description: "Eastern border route to Brazil"
    },
    {
      toCountryId: "ARG",
      toCountryName: "Argentina",
      type: "land",
      volume: "high",
      description: "Bolivia to Argentina via northern border"
    },
    {
      toCountryId: "PRY",
      toCountryName: "Paraguay",
      type: "land",
      volume: "medium",
      description: "Bolivia to Paraguay - Chaco route"
    },
    {
      toCountryId: "CHL",
      toCountryName: "Chile",
      type: "land",
      volume: "medium",
      description: "Bolivia to Chile via northern border"
    }
  ],
  unodcPrograms: [
    {
      name: "Coca Monitoring Programme",
      description:
        "Annual satellite-based surveys to monitor coca cultivation, distinguish legal from illegal crops, and estimate potential cocaine production. The 2024 report marks the 22nd consecutive year of monitoring. Works with Bolivian government to track cultivation in protected areas.",
      startYear: 2003,
    },
    {
      name: "Alternative Development and Livelihoods",
      description:
        "Supports communities transitioning from excess coca cultivation to legal crops through technical assistance, market linkages, and rural development projects. Focuses on sustainable economic alternatives.",
      startYear: 2005,
    },
    {
      name: "Border Management and Interdiction",
      description:
        "Strengthens capacity of law enforcement and border authorities to detect and intercept cocaine shipments, precursor chemicals, and money laundering operations at Bolivia's porous borders with Brazil, Argentina, and Peru.",
      startYear: 2008,
    },
    {
      name: "Regional Intelligence Cooperation",
      description:
        "Facilitates information sharing and joint operations with neighboring countries to disrupt transnational trafficking networks exploiting Bolivia's landlocked position as a strategic transit hub.",
      startYear: 2012,
    },
  ],
  policyStance:
    "Bolivia promotes 'coca yes, cocaine no', regulating licensed farmers while eradicating illegal crops. It opposes U.S.-style militarization and emphasizes sovereignty. The government works with UNODC for crop monitoring but resists external pressure for harsher eradication.",
  criminalOrganizations: [
    {
      name: "Primeiro Comando da Capital (PCC)",
      description:
        "Brazil's largest criminal organization with significant presence in Bolivia. Police authorities confirmed members of this highly dangerous organization operate in Bolivia, securing cocaine supplies and establishing trafficking routes to Brazilian and European markets. Represents increasing Brazilian organized crime influence.",
    },
    {
      name: "Comando Vermelho (CV)",
      description:
        "Second major Brazilian criminal faction expanded into Bolivia to control cocaine production and trafficking. Competes with PCC for dominance over Bolivian cocaine supply chains and smuggling routes through Brazil.",
    },
    {
      name: "Tren de Aragua",
      description:
        "Venezuelan mega-gang that increased presence in Bolivia, engaging in human trafficking, smuggling operations, and drug trafficking. Exploits Bolivia's weak border controls and porous frontiers with Peru and Brazil.",
    },
    {
      name: "International Cartel Networks",
      description:
        "Albanian, Italian, Mexican, European and Russian mafia groups forge alliances to optimize drug logistics and flow to Europe. These networks exploit Bolivia's role as refuge for high-value traffickers amid widespread impunity. Prominent example: Uruguayan trafficker Sebastian Marset operated freely in Bolivia for nearly a year before escaping failed police operation in 2023.",
    },
  ],
  sources: [
    "https://www.unodc.org/documents/crop-monitoring/Bolivia/Fact_Sheet_Executive_summary_Bolivia_coca_survey_2024.pdf",
    "https://latinoamerica21.com/en/drug-trafficking-in-bolivia-unresolved-doubts-and-debts/",
    "https://ocindex.net/country/bolivia",
    "https://insightcrime.org/news/gamechangers-2024-networks-replace-cartels-cocaine-trade/",
    "https://www.brookings.edu/articles/is-drug-trafficking-on-the-rise-in-bolivias-santa-cruz-region/",
  ],
};
