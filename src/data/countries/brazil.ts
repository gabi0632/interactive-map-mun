import { Country, OutgoingRoute } from "@/types/country";

/**
 * Brazil Country Data
 * Role: Mixed (Transit, Export Hub, and Growing Consumer Market)
 *
 * Major South American export hub to Europe, particularly through
 * ports like Santos, Paranaguá, and Rio de Janeiro.
 */
export const brazil: Country = {
  id: "BRA",
  name: "Federative Republic of Brazil",
  capital: "Brasília",
  population: 216422446,
  flag: "🇧🇷",
  role: "mixed",
  roleDescription: "Brazil is one of the world's most important cocaine export hubs to Europe, with major ports—particularly Santos—serving as primary departure points for cocaine originating in Colombia, Peru, and Bolivia. A large share of Europe-bound cocaine transits through Brazilian ports, alongside secondary routes to West Africa. The Primeiro Comando da Capital (PCC) plays a central role in coordinating exports and maintains long-standing partnerships with Italy's 'Ndrangheta. Brazil also faces rising domestic cocaine consumption, giving it a dual role as both transit hub and consumer market. Government policy emphasizes port inspections, border control, anti-money-laundering measures, and international cooperation through UNODC initiatives, while domestic debates continue over enforcement versus decriminalization.",
  stats: {
    seizures: 45000, // kg per year - Brazil routinely seizes tens of metric tons annually
    traffickingRoutes: ["NLD", "BEL", "ESP", "PRT", "ITA", "GBR", "AGO", "NGA"]
  },
  outgoingRoutes: [
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "maritime",
      volume: "high",
      description: "Brazil to Europe via Atlantic"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "maritime",
      volume: "high",
      description: "Brazil to Rotterdam - major cocaine entry point"
    },
    {
      toCountryId: "BEL",
      toCountryName: "Belgium",
      type: "maritime",
      volume: "high",
      description: "Brazil to Antwerp - major European port"
    },
    {
      toCountryId: "PRT",
      toCountryName: "Portugal",
      type: "maritime",
      volume: "medium",
      description: "Brazil to Portugal - historic trade route"
    },
    {
      toCountryId: "ITA",
      toCountryName: "Italy",
      type: "maritime",
      volume: "medium",
      description: "Brazil to Italy - Ndrangheta connection"
    },
    {
      toCountryId: "AGO",
      toCountryName: "Angola",
      type: "maritime",
      volume: "medium",
      description: "Brazil to Angola - Africa transit route"
    },
    {
      toCountryId: "NGA",
      toCountryName: "Nigeria",
      type: "maritime",
      volume: "medium",
      description: "Brazil to Nigeria - West Africa hub"
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "air",
      volume: "high",
      description: "Air route to Madrid"
    },
    {
      toCountryId: "GBR",
      toCountryName: "United Kingdom",
      type: "air",
      volume: "medium",
      description: "Brazil to UK"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "air",
      volume: "medium",
      description: "Air route via Schiphol Airport"
    }
  ],
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description: "Brazil takes an active role in UNODC's CRIMJUST program, participating in investigative case forums and training sessions. The program strengthens transnational investigations and enhances prosecutor capacity to target high-value criminal networks and trace illicit financial flows.",
      startYear: 2016
    },
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description: "Brazil participates in port security initiatives at Santos and other major ports to strengthen container inspection capabilities and risk assessment systems.",
      startYear: 2014
    },
    {
      name: "Maritime Crime Programme",
      description: "Focuses on enhancing maritime interdiction capabilities and coastal surveillance to combat drug trafficking along Brazil's extensive coastline."
    }
  ],
  policyStance: "Brazil emphasizes port inspections, border operations, and anti-money-laundering efforts. Domestically, drug policy debates surround decriminalization vs. strict enforcement. Brazil takes an active role in UNODC initiatives, especially CRIMJUST.",
  criminalOrganizations: [
    {
      name: "PCC (Primeiro Comando da Capital / First Capital Command)",
      description: "Brazil's largest organized crime group, controlling cocaine trafficking through Santos port. Has established international links with Italian 'Ndrangheta and Colombian suppliers. Operates sophisticated logistics networks for European exports."
    },
    {
      name: "Comando Vermelho (Red Command)",
      description: "Rio de Janeiro-based criminal organization competing with PCC for control of trafficking routes. Strong presence in port areas and favelas."
    },
    {
      name: "'Ndrangheta (Italian Mafia)",
      description: "Calabrian mafia with established partnerships with Brazilian PCC for cocaine distribution in Europe. Controls major European ports receiving Brazilian shipments."
    }
  ],
  sources: [
    "https://insightcrime.org/news/analysis/report-spotlights-drug-trafficking-at-santos-port-brazil-drug-policies/",
    "https://www.rusi.org/explore-our-research/publications/commentary/brazils-drugs-trafficking-ignored-europes-peril",
    "https://dialogo-americas.com/articles/brazil-cocaine-exports-from-santos-port-at-all-time-high/",
    "https://defense.info/highlight-of-the-week/brazils-drug-gangs-from-sao-paulo-streets-to-global-cocaine-empire/",
    "https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2025.html"
  ]
};
