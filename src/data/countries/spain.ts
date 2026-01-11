import { Country, IncomingRoute } from "@/types/country";

/**
 * Spain
 * Primary European entry point from Latin America
 */
export const spain: Country = {
  id: "ESP",
  name: "Kingdom of Spain",
  capital: "Madrid",
  population: 49000000,
  flag: "🇪🇸",
  role: "consumer",
  roleDescription:
    "One of Europe's primary cocaine entry points from Latin America. In 2023, Spain was the European country with the highest volume of cocaine seizures at 142 tonnes, ahead of Belgium (121 tonnes) and Netherlands (60 tonnes). Spain has repositioned itself as the primary point of entry into Europe due to its past as the epicenter of Latin American organized crime in the region. Sailboats, containers, semi-submersibles, airplanes, and boats reach Spanish waters from Latin America, Africa, and Europe. Spanish adults are the most likely to consume cocaine during their lifetime at 11.2%.",
  stats: {
    seizures: 142000, // kg in 2023
    traffickingRoutes: ["COL", "ECU", "PER", "MAR"],
  },
  incomingRoutes: [
    {
      fromCountryId: "COL",
      fromCountryName: "Colombia",
      type: "air",
      volume: "high",
      description: "Colombia to Spain - major European entry point"
    },
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "maritime",
      volume: "high",
      description: "Brazil to Europe via Atlantic"
    },
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "air",
      volume: "high",
      description: "Air route from Brazil"
    },
    {
      fromCountryId: "VEN",
      fromCountryName: "Venezuela",
      type: "maritime",
      volume: "medium",
      description: "Trans-Atlantic route from Venezuela"
    },
    {
      fromCountryId: "ECU",
      fromCountryName: "Ecuador",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Ecuador"
    },
    {
      fromCountryId: "ARG",
      fromCountryName: "Argentina",
      type: "maritime",
      volume: "high",
      description: "Argentina to Spain - primary route"
    },
    {
      fromCountryId: "ARG",
      fromCountryName: "Argentina",
      type: "air",
      volume: "medium",
      description: "Air route from Argentina"
    },
    {
      fromCountryId: "PAN",
      fromCountryName: "Panama",
      type: "maritime",
      volume: "high",
      description: "Panama to Spain"
    },
    {
      fromCountryId: "CRI",
      fromCountryName: "Costa Rica",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Costa Rica"
    },
    {
      fromCountryId: "CHL",
      fromCountryName: "Chile",
      type: "air",
      volume: "medium",
      description: "Air route from Chile"
    },
    {
      fromCountryId: "DOM",
      fromCountryName: "Dominican Republic",
      type: "air",
      volume: "medium",
      description: "Air route from Dominican Republic"
    }
  ],
  unodcPrograms: [
    {
      name: "EU-LATAM Cooperation Programme",
      description:
        "Spain leads European interdiction efforts and participates in EU-LATAM joint operations coordinated through UNODC frameworks.",
      startYear: 2011,
    },
    {
      name: "Port Inspection Enhancement",
      description:
        "UNODC-supported initiatives to increase port inspections and container monitoring at major Spanish ports including Algeciras, Valencia, and Barcelona.",
      startYear: 2014,
    },
    {
      name: "Intelligence Sharing Platform",
      description:
        "Spain works with Latin American countries on intelligence sharing through UNODC's CRIMJUST programme to target trafficking networks.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Spain leads European interdiction efforts, increases port inspections, and participates in EU-LATAM operations. It also works with Latin American countries on intelligence sharing. Focus on disrupting maritime routes and criminal networks exploiting historical and linguistic ties between Spain and Latin America.",
  criminalOrganizations: [
    {
      name: "Galician Clans",
      description:
        "Traditional tobacco smuggling networks from Galicia that evolved into major cocaine trafficking organizations with deep connections to Colombian and Mexican cartels. Control significant portions of maritime cocaine shipments to Spain.",
    },
    {
      name: "Latin American TCOs",
      description:
        "Various transnational criminal organizations from Colombia, Mexico, and other Latin American countries operating in Spain, exploiting cultural and linguistic connections to coordinate large-scale cocaine shipments.",
    },
  ],
  sources: [
    "https://www.euda.europa.eu/publications/european-drug-report/2025/cocaine_en",
    "https://insightcrime.org/news/spain-reclaims-position-as-cocaine-gateway-to-europe/",
    "https://globalinitiative.net/analysis/spain-drug-trafficking-violence-ocindex/",
    "https://euroweeklynews.com/2025/07/12/spain-one-of-the-worlds-biggest-cocaine-consumers/",
  ],
};
