import { Country } from "@/types/country";

/**
 * Uruguay Country Data
 * Role: Transit
 *
 * Uruguay is an emerging transit point for cocaine shipments to Europe and Africa.
 * Known for progressive drug policy including full cannabis legalization.
 * The Port of Montevideo has become a key export hub for cocaine destined for Europe.
 */
export const uruguay: Country = {
  id: "URY",
  name: "Oriental Republic of Uruguay",
  capital: "Montevideo",
  population: 3500000,
  flag: "🇺🇾",
  role: "transit",
  roleDescription:
    "Uruguay is an emerging transit point for cocaine shipments destined for Europe and West Africa. While historically one of South America's safest countries, its strategic coastal location and busy ports — especially Montevideo — have increasingly attracted international trafficking networks. Record amounts of cocaine have been intercepted in containers, with shipments traced to European destinations like Belgium, Netherlands, and Germany. Uruguay is also internationally known as the first country to fully legalize and regulate cannabis (2013), creating a unique public-health focused drug governance model.",
  stats: {
    seizures: 4500, // 2022 data - more representative of transit hub role (peaked at ~12,000 kg in 2019)
    traffickingRoutes: ["BEL", "NLD", "DEU", "ESP"],
  },
  outgoingRoutes: [
    {
      toCountryId: "BEL",
      toCountryName: "Belgium",
      type: "maritime",
      volume: "medium",
      description:
        "Montevideo to Antwerp - major route, 2.16 tons seized December 2023",
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "maritime",
      volume: "medium",
      description: "Montevideo to Rotterdam via container shipping",
    },
    {
      toCountryId: "DEU",
      toCountryName: "Germany",
      type: "maritime",
      volume: "medium",
      description:
        "Montevideo to Hamburg - 4 tons seized (largest German seizure in history)",
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "maritime",
      volume: "low",
      description: "Maritime route to Spanish ports",
    },
  ],
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description:
        "Uruguay participates in CRIMJUST to enhance transnational drug trafficking investigations and judicial cooperation. The program includes Joint Investigation Teams with Argentina, training on financial investigations, and information-sharing forums. In May 2022, Uruguay participated in an Experts Working Group on best practices for drug trafficking investigation and prosecution.",
      startYear: 2020,
    },
  ],
  policyStance:
    "Uruguay follows a public-health and human-rights focused approach, emphasizing prevention, regulation, and harm reduction rather than militarized enforcement. The country maintains strict regulatory control over cannabis through IRCCA (Instituto de Regulación y Control del Cannabis), believing that state oversight reduces criminal involvement. Regarding cocaine trafficking, Uruguay cooperates closely with UNODC, INTERPOL, and regional partners to strengthen port security, container monitoring, and financial-crime investigation. The country invests in intelligence-led policing and advocates for balanced international drug policies combining enforcement with social development, human rights, and public-health programs.",
  criminalOrganizations: [
    {
      name: "Primeiro Comando da Capital (PCC)",
      description:
        "Brazilian criminal organization with active presence in Uruguay, operating through Montevideo port and expanding influence in the prison system. Coordinates with European networks for transatlantic cocaine shipments.",
    },
    {
      name: "'Ndrangheta",
      description:
        "Italian mafia organization that coordinates cocaine shipments from South America to Europe, using Montevideo as a key transit point. The 2017 arrest of 'Ndrangheta leader Rocco Morabito in Uruguay highlighted the connection between South American transit countries and European organized crime.",
    },
  ],
  sources: [
    "https://www.cia.gov/the-world-factbook/countries/uruguay/",
    "https://insightcrime.org/news/uruguay-faces-rising-threat-organized-crime/",
    "https://insightcrime.org/news/insight-crimes-cocaine-seizure-round-up-2022/",
    "https://www.occrp.org/en/news/uruguay-emerges-as-new-center-of-international-drug-trade",
    "https://ocindex.net/country/uruguay",
    "https://www.unodc.org/unodc/en/drug-trafficking/crimjust/",
    "https://centreforpublicimpact.org/public-impact-fundamentals/marijuana-legalisation-in-uruguay/",
  ],
};
