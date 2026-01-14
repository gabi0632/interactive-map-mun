import { Country, OutgoingRoute } from "@/types/country";

/**
 * Argentina Country Data
 * Role: Mixed (Transit Zone and Money-Laundering Hub)
 *
 * Increasingly used as a transit zone and money-laundering hub for
 * cocaine destined for Europe and other markets.
 */
export const argentina: Country = {
  id: "ARG",
  name: "Argentine Republic",
  capital: "Buenos Aires",
  population: 45773884,
  flag: "🇦🇷",
  role: "mixed",
  roleDescription: "Used increasingly as a transit zone and money-laundering hub. Argentina is one of South America's key transit and launching points for Andean cocaine headed across the Atlantic, leveraging strong trade ties to Europe and strategic location. The country faces money laundering risks from drug trafficking, tax evasion, corruption, and smuggling. Despite not suffering from the high violence levels affecting other regional nations, Argentina struggles with deep-seated corruption across state institutions. The country has become a critical node for financial crimes supporting drug trafficking networks.",
  stats: {
    drugSeizures: {
      cocaine: 8500, // kg (estimated annual)
      year: 2023,
      note: "Key transit and money-laundering hub. Strong trade ties to Europe. Rosario region is trafficking hotspot along Paraná River."
    },
    transitVolume: {
      cocaine: 50, // metric tons/year estimated transiting to Europe
      year: 2023,
      note: "One of South America's key launching points for Andean cocaine to Europe. Money laundering risk from tax evasion, corruption, and smuggling."
    },
    traffickingRoutes: ["ESP", "ITA", "NLD", "BEL", "GBR", "FRA"]
  },
  outgoingRoutes: [
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "maritime",
      volume: "high",
      description: "Argentina to Spain - primary route"
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "air",
      volume: "medium",
      description: "Air route to Madrid"
    },
    {
      toCountryId: "ITA",
      toCountryName: "Italy",
      type: "maritime",
      volume: "medium",
      description: "Maritime route to Italian ports"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "maritime",
      volume: "medium",
      description: "Maritime route to Rotterdam"
    },
    {
      toCountryId: "BEL",
      toCountryName: "Belgium",
      type: "maritime",
      volume: "medium",
      description: "Maritime route to Antwerp"
    },
    {
      toCountryId: "GBR",
      toCountryName: "United Kingdom",
      type: "air",
      volume: "low",
      description: "Air route to London"
    },
    {
      toCountryId: "FRA",
      toCountryName: "France",
      type: "air",
      volume: "low",
      description: "Air route to Paris"
    }
  ],
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description: "Argentina works actively with UNODC on transnational investigations via CRIMJUST. The program focuses on joint intelligence operations, financial crime investigations, and precursor chemical regulation to disrupt trafficking networks.",
      startYear: 2016
    },
    {
      name: "Anti-Money Laundering Technical Assistance",
      description: "UNODC provides support for strengthening Argentina's financial intelligence capabilities and beneficial ownership transparency to combat drug trafficking proceeds laundering."
    }
  ],
  policyStance: "Argentina focuses on financial crimes, precursor regulation, and joint intelligence operations. It works actively with UNODC on transnational investigations via CRIMJUST.",
  criminalOrganizations: [
    {
      name: "Rosario Cartels",
      description: "Network of criminal groups based in Rosario (Argentina's third-largest city), controlling river trafficking routes along the Paraná River. Connected to Brazilian PCC and responsible for escalating violence in the region."
    },
    {
      name: "Los Monos",
      description: "Major criminal organization operating in Rosario and Santa Fe province, involved in cocaine trafficking and money laundering. Has connections to Colombian and Bolivian suppliers."
    },
    {
      name: "Colombian Network Cells",
      description: "Colombian trafficking organizations maintaining operational cells in Buenos Aires and border regions to coordinate shipments to Europe through Argentine ports."
    }
  ],
  sources: [
    "https://insightcrime.org/argentina-organized-crime-news/argentina-profile/",
    "https://www.fatf-gafi.org/en/publications/Mutualevaluations/MER-Argentina-2024.html",
    "https://www.state.gov/wp-content/uploads/2025/03/2025-International-Narcotics-Control-Strategy-Volume-2-Accessible.pdf",
    "https://jied.lse.ac.uk/articles/10.31389/jied.61",
    "https://ocindex.net/assets/downloads/2023/english/ocindex_profile_argentina_2023.pdf"
  ]
};
