import { Country } from "@/types/country";

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
  roleDescription: "A major South American export hub to Europe, particularly through ports like Santos, which handles the majority of international drug trade from Colombia, Peru, and Bolivia. Estimates suggest 80% of cocaine arriving in Europe transits through Brazilian ports. The Port of Santos is one of the most important trafficking arteries to Europe. PCC (First Capital Command) controls trafficking networks and has established links with Italian 'Ndrangheta. Brazil also faces growing domestic cocaine consumption and trafficking to West Africa. The country plays a dual role as both a transit hub and an emerging consumer market.",
  stats: {
    seizures: 5982,
    traffickingRoutes: ["NLD", "BEL", "ESP", "PRT", "ITA", "GBR", "AGO", "NGA"]
  },
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
