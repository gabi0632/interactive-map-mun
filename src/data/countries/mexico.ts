import { Country, OutgoingRoute } from "@/types/country";

/**
 * Mexico Country Data
 * Role: Major transit hub and synthetic drug production center
 */
export const mexico: Country = {
  id: "MEX",
  name: "United Mexican States",
  capital: "Mexico City",
  population: 128932753,
  flag: "🇲🇽",
  role: "transit",
  roleDescription:
    "Mexico serves as the primary transit corridor for cocaine moving from South America to the United States, while also emerging as the world's leading producer of synthetic opioids, particularly fentanyl. Major cartels operate as decentralized networks controlling vast territories and trafficking routes. The country faces unprecedented violence as cartels compete for control of lucrative smuggling corridors.",
  stats: {
    seizures: 180000, // kg per year (approximate)
    traffickingRoutes: ["USA", "CAN"], // Primary destination markets
  },
  outgoingRoutes: [
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "land",
      volume: "high",
      description: "Mexico-US border crossing - primary trafficking corridor"
    },
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "air",
      volume: "medium",
      description: "Air routes to US destinations"
    },
    {
      toCountryId: "CAN",
      toCountryName: "Canada",
      type: "land",
      volume: "medium",
      description: "Mexico to Canada via US corridor"
    }
  ],
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description:
        "Strengthens border security at ports of entry, airports, and seaports to detect and interdict drug shipments hidden in legitimate cargo and passenger flows.",
      startYear: 2020,
    },
    {
      name: "Operation Azure",
      description:
        "Targeted initiative to investigate and prosecute synthetic opioid trafficking, focusing on fentanyl production and distribution networks.",
      startYear: 2024,
    },
    {
      name: "CRIMJUST",
      description:
        "Enhances transnational cooperation for investigating and prosecuting organized crime networks, focusing on financial flows and high-value targets.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Mexico focuses on militarized internal security operations but faces criticism for human-rights concerns. It collaborates with the U.S. on precursor control, intelligence sharing, and border security. Current strategy leans toward financial targeting of cartels rather than capturing kingpins.",
  criminalOrganizations: [
    {
      name: "Sinaloa Cartel",
      description:
        "One of the world's most powerful drug trafficking organizations, operating as a franchise-based network. Major producer and trafficker of fentanyl, cocaine, methamphetamine, and heroin to the United States. Currently experiencing internal conflict between the Zambada and Chapitos factions. Co-founder Ismael 'El Mayo' Zambada pled guilty in August 2025 after decades of leadership.",
    },
    {
      name: "Jalisco New Generation Cartel (CJNG)",
      description:
        "Mexico's most violent and rapidly expanding cartel, known for extreme brutality and centralized command structure. Primary supplier of illicit fentanyl to the United States. Designated as a Foreign Terrorist Organization by the U.S. in February 2025. Operates extensive drug trafficking and fuel theft networks generating hundreds of millions of dollars annually.",
    },
    {
      name: "Gulf Cartel",
      description:
        "Historic trafficking organization controlling northeastern Mexico and key Gulf coast routes. Weakened by internal splits and government pressure but remains active in cocaine and methamphetamine trafficking.",
    },
    {
      name: "Northeast Cartel (Cártel del Noreste)",
      description:
        "Emerged from Los Zetas, controls trafficking routes in northeastern Mexico near the Texas border. Known for extreme violence and involvement in fuel theft, extortion, and human smuggling alongside drug trafficking.",
    },
  ],
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/cocaine-trafficking-africa.html",
    "https://www.dea.gov/press-releases/2025/05/15/dea-releases-2025-national-drug-threat-assessment",
    "https://www.state.gov/designation-of-international-cartels",
    "https://gordoninstitute.fiu.edu/news-events/the-policy-spotlight/2025/transnational-organized-crime-in-mexico-and-the-governments-response.html",
    "https://insightcrime.org/mexico-organized-crime-news/",
  ],
};
