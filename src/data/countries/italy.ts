import { Country, IncomingRoute } from "@/types/country";

/**
 * Italy
 * Italian mafia groups central to global cocaine trade
 */
export const italy: Country = {
  id: "ITA",
  name: "Italian Republic",
  capital: "Rome",
  population: 58853482,
  flag: "🇮🇹",
  role: "consumer",
  roleDescription:
    "Italian mafia groups, notably the 'Ndrangheta, remain central actors in the global cocaine trade. The 'Ndrangheta controls up to 80% of Europe's cocaine flow and is considered one of the most powerful criminal organizations in the world. The organization dominates the transnational cocaine trade with strong ties to drug trafficking organizations in Latin America, primarily Colombia, and maintains direct ties with South American cartels, facilitating large-scale shipments through ports including Gioia Tauro, Rotterdam, and Antwerp.",
  stats: {
    seizures: 28000, // kg per year (estimated based on Italian enforcement)
    traffickingRoutes: ["COL", "NLD", "BEL", "ESP"],
  },
  incomingRoutes: [
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "maritime",
      volume: "medium",
      description: "Brazil to Italy - 'Ndrangheta connection"
    },
    {
      fromCountryId: "ARG",
      fromCountryName: "Argentina",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Argentina"
    },
    {
      fromCountryId: "PAN",
      fromCountryName: "Panama",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Panama"
    }
  ],
  unodcPrograms: [
    {
      name: "Anti-Mafia Judicial Cooperation",
      description:
        "Italy works with UNODC on strengthening judicial frameworks and international cooperation to combat transnational organized crime, particularly the 'Ndrangheta's cocaine networks.",
      startYear: 2009,
    },
    {
      name: "Asset Recovery Programme",
      description:
        "UNODC supports Italy's strong asset confiscation laws targeting financial flows from cocaine trafficking and money laundering.",
      startYear: 2012,
    },
    {
      name: "CRIMJUST",
      description:
        "Italy is a key participant in targeting financial flows and transnational networks connecting European mafia groups with Latin American cartels.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Italy uses strong anti-mafia judicial structures, asset confiscation laws, and international cooperation. It supports UNODC programs targeting financial flows and transnational networks. Specialized anti-mafia prosecutors and investigators work closely with international partners to dismantle 'Ndrangheta operations.",
  criminalOrganizations: [
    {
      name: "'Ndrangheta",
      description:
        "Based in Calabria, the 'Ndrangheta controls up to 80% of Europe's cocaine flow. Consists of 160 cells and approximately 6,000-10,000 core members worldwide. Maintains direct ties with Colombian cartels and dominates major European ports. Present on all continents, specializing in cocaine trafficking, political corruption, and investment in legitimate businesses.",
    },
    {
      name: "Camorra",
      description:
        "Neapolitan crime syndicate involved in cocaine distribution networks throughout Italy and Europe, often working in cooperation with South American suppliers.",
    },
    {
      name: "Sacra Corona Unita",
      description:
        "Operates primarily in Puglia region, involved in cocaine trafficking from the Balkans and maritime routes across the Adriatic Sea.",
    },
  ],
  sources: [
    "https://en.wikipedia.org/wiki/'Ndrangheta",
    "https://ocindex.net/country/italy",
    "https://www.europol.europa.eu/sites/default/files/documents/italian_organised_crime_threat_assessment_0.pdf",
    "https://www.occrp.org/en/project/the-ndrangheta/the-ndranghetas-little-kiss-inside-an-organized-crime-clan-that-moved-cocaine-across-europe",
  ],
};
