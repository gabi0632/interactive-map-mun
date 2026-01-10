import { Country } from "@/types/country";

/**
 * Ecuador Country Data
 * Role: Mixed (Transit and Export Hub)
 *
 * Ecuador has transformed into a critical export platform for cocaine,
 * especially through Guayaquil's ports and the emerging Posorja port.
 */
export const ecuador: Country = {
  id: "ECU",
  name: "Ecuador",
  capital: "Quito",
  population: 18190484,
  flag: "🇪🇨",
  role: "mixed",
  roleDescription: "Ecuador has transformed into a critical export platform for cocaine, especially through Guayaquil's ports and the emerging Posorja facility. The country faces an escalating security crisis as criminal organizations exploit its strategic location and port infrastructure. Violence has surged dramatically, with 2025 projecting 9,100 deaths (a 40% increase). The Port of Posorja emerged as the #1 loading port in Latin America for cocaine seized in Rotterdam (2024), surpassing Guayaquil. Approximately 80% of cocaine now heads to Europe and 20% to the U.S., a reversal from pre-pandemic patterns.",
  stats: {
    seizures: 95000,
    traffickingRoutes: ["BEL", "DEU", "NLD", "ESP", "GBR"]
  },
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description: "Ecuador actively participates in UNODC's PCCP program to strengthen capacity at seaports and airports. The program builds law enforcement and customs capabilities to identify and inspect high-risk cargo containers and passengers, focusing on major hubs like Guayaquil and Posorja.",
      startYear: 2015
    },
    {
      name: "CRIMJUST",
      description: "Ecuador participates in CRIMJUST investigative case forums to enhance transnational investigations and strengthen judicial capacity to prosecute transnational organized crime. The program promotes post-seizure investigations to trace illicit financial flows.",
      startYear: 2016
    }
  ],
  policyStance: "Ecuador focuses on port-security reforms and anti-corruption initiatives, works with UNODC's PCCP program, and has increased the military presence in high-crime zones. The government is pushing for judicial reform due to cartel infiltration into state institutions.",
  criminalOrganizations: [
    {
      name: "Los Choneros",
      description: "Major Ecuadorian criminal organization controlling cocaine trafficking routes through Guayaquil ports. Allied with Mexican cartels, particularly Sinaloa Cartel."
    },
    {
      name: "Los Lobos",
      description: "Rival gang competing for control of port facilities and cocaine export routes. Allied with Jalisco New Generation Cartel (CJNG)."
    },
    {
      name: "Albanian Mafia Networks",
      description: "European criminal groups with growing presence in Ecuador's ports, facilitating cocaine shipments to European markets through established networks in Belgium, Netherlands, and Germany."
    }
  ],
  sources: [
    "https://www.crisisgroup.org/latin-america-caribbean/ecuador/109-paradise-lost-ecuadors-battle-organised-crime",
    "https://globalinitiative.net/analysis/ecuadors-criminal-crisis/",
    "https://www.europol.europa.eu/media-press/newsroom/news/europol-supports-operation-leading-to-12-arrests-in-ecuador",
    "https://insightcrime.org/news/brief/ecuador-seizes-4-tons-of-cocaine/",
    "https://www.unodc.org/documents/Strategy_2022-2025_LAC.pdf"
  ]
};
