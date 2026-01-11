import { Country } from "@/types/country";

/**
 * Belgium
 * Major European cocaine entry point via Port of Antwerp
 */
export const belgium: Country = {
  id: "BEL",
  name: "Kingdom of Belgium",
  capital: "Brussels",
  population: 11825551,
  flag: "🇧🇪",
  role: "consumer",
  roleDescription:
    "Belgium serves as one of Europe's primary cocaine entry points through the Port of Antwerp-Bruges, Europe's second-largest container port. In 2023, authorities seized a record 121 tonnes of cocaine, declining to 44 tonnes in 2024 as traffickers adapted by splitting shipments into smaller loads. In October 2025, an Antwerp judge warned that Belgium risks becoming Europe's first 'narco-state,' as criminal organizations have established deep-rooted mafia-like structures that challenge law enforcement through systematic corruption, violence, and intimidation.",
  stats: {
    seizures: 44000, // kg in 2024
    traffickingRoutes: ["COL", "ECU", "BRA", "VEN", "PER"],
  },
  unodcPrograms: [
    {
      name: "Container Control Programme (CCP) Partner",
      description:
        "Belgium serves as a key donor and partner for the global CCP/PCCP initiative. The Port of Antwerp hosts study visits and training sessions for international law enforcement officials, with Belgian customs providing expertise worldwide.",
      startYear: 2010,
    },
    {
      name: "European Port Alliance",
      description:
        "Regional initiative launched during Belgium's 2024 EU Council Presidency, addressing drug trafficking through European ports with enhanced cooperation and intelligence sharing.",
      startYear: 2024,
    },
    {
      name: "CRIMJUST Participation",
      description:
        "Belgium participates in international investigations through INTERPOL and CRIMJUST networks to disrupt transnational organized crime along cocaine trafficking routes.",
      startYear: 2018,
    },
  ],
  policyStance:
    "Belgium employs a three-pillar drug control strategy: prevention and early intervention, harm reduction and treatment, and law enforcement. In response to the escalating cocaine crisis, Belgium has significantly enhanced port security measures including AI-assisted cargo screening. Authorities acknowledge that current interdiction efforts capture only an estimated 10% of illicit cocaine entering through Belgian ports, necessitating stronger international cooperation.",
  criminalOrganizations: [
    {
      name: "Mocro Mafia",
      description:
        "Moroccan-Dutch criminal networks controlling approximately one-third of Europe's cocaine market, operating extensively in Antwerp with privileged relationships with Colombian and Mexican cartels. Key figure Othman El Ballouti was arrested in December 2024 with nearly $100 million in laundered assets.",
    },
    {
      name: "Colombian Cartels (La Cordillera, Clan del Golfo)",
      description:
        "Colombian trafficking organizations that deliberately target Antwerp for European cocaine distribution, working with local criminal networks for port operations.",
    },
  ],
  sources: [
    "https://www.belganewsagency.eu/customs-intercepted-44-tonnes-of-cocaine-in-the-port-of-antwerp-in-2024",
    "https://www.euda.europa.eu/publications/european-drug-report/2025/cocaine_en",
    "https://wrdnews.org/belgium-drug-trafficking-ports-fuel-europes-narcotics-crisis/",
    "https://issafrica.org/iss-today/moroccos-mocro-maffia-threatens-europe-and-north-africa",
    "https://insightcrime.org/news/insight-crimes-2024-cocaine-seizure-round-up/",
  ],
};
