import { Country, OutgoingRoute } from "@/types/country";

/**
 * French Guiana
 * Overseas department and region of France in South America
 * Important transit point for cocaine heading to Europe
 */
export const frenchGuiana: Country = {
  id: "GUF",
  name: "French Guiana",
  officialStatus: "overseas_department",
  sovereigntyOf: "FRA",
  capital: "Cayenne",
  population: 304557,
  flag: "🇬🇫",
  role: "other",
  roleDescription:
    "French Guiana is an overseas department and region of France located on the northeastern coast of South America. As part of the European Union and using the Euro, it serves as a strategic transit point for cocaine shipments from South America to mainland France and Europe. The territory's unique status as European soil in South America makes it attractive for traffickers seeking to exploit less scrutinized routes to European markets. Drug mules ('mules') frequently attempt to transport cocaine through Cayenne-Félix Eboué Airport to Paris.",
  stats: {
    seizures: 2500, // kg per year (estimated)
    traffickingRoutes: ["FRA", "NLD", "BEL", "BRA", "SUR"],
  },
  outgoingRoutes: [
    {
      toCountryId: "FRA",
      toCountryName: "France",
      type: "air",
      volume: "high",
      description: "French Guiana to Paris - mule route"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "air",
      volume: "medium",
      description: "Air route to Amsterdam"
    },
    {
      toCountryId: "BEL",
      toCountryName: "Belgium",
      type: "air",
      volume: "low",
      description: "Air route to Brussels"
    }
  ],
  unodcPrograms: [
    {
      name: "Caribbean and French Territories Programme",
      description:
        "UNODC cooperation focusing on French Guiana as a key transit point for cocaine shipments to mainland France. Works with French law enforcement to strengthen airport and port security.",
      startYear: 2013,
    },
    {
      name: "Regional Border Control Initiative",
      description:
        "Technical assistance for border security along French Guiana's borders with Brazil and Suriname, focusing on illegal gold mining regions that serve as trafficking corridors.",
      startYear: 2015,
    },
  ],
  policyStance:
    "As an integral part of France and the European Union, French Guiana follows French and EU drug policies. Law enforcement focuses on airport interdiction, border patrols, and cooperation with neighboring countries. The territory benefits from French national anti-narcotics resources and participates in EU-funded security programs.",
  criminalOrganizations: [
    {
      name: "Brazilian Trafficking Networks",
      description:
        "Criminal groups operating across the porous border with Brazil, exploiting illegal gold mining regions to transport cocaine from Brazilian sources through French Guiana to Europe.",
    },
    {
      name: "Surinamese Connections",
      description:
        "Networks operating along the Maroni River border with Suriname, facilitating cocaine transit from Colombian and Venezuelan sources through the Guiana Shield region.",
    },
  ],
  sources: [
    "https://www.ofdt.fr/sites/ofdt/files/2025-07/notebilanoffre_en.pdf",
    "https://www.emcdda.europa.eu/publications/european-drug-report/2025",
    "https://insightcrime.org/news/french-guiana-cocaine-corridor-europe/",
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
  ],
};
