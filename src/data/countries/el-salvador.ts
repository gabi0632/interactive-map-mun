import { Country } from "@/types/country";

/**
 * El Salvador Country Data
 * Role: Gang-related trafficking and transit
 */
export const elSalvador: Country = {
  id: "SLV",
  name: "El Salvador",
  capital: "San Salvador",
  population: 6336392,
  flag: "🇸🇻",
  role: "transit",
  roleDescription:
    "El Salvador is not a cocaine producer but is heavily affected by gang-related drug trafficking and violence. The country serves as a secondary transit corridor for drugs moving through Central America, with powerful gangs like MS-13 and Barrio 18 controlling local distribution and providing logistical support to international trafficking organizations.",
  stats: {
    seizures: 2500, // kg per year (approximate)
    traffickingRoutes: ["GTM", "MEX", "USA"], // Transit destinations
  },
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description:
        "Supports strengthening of criminal justice institutions and transnational cooperation to combat gang-related organized crime and drug trafficking networks.",
      startYear: 2018,
    },
    {
      name: "Gang Prevention and Rehabilitation Programs",
      description:
        "UNODC technical assistance for gang intervention strategies, focusing on prevention, rehabilitation, and reducing gang involvement in drug trafficking.",
      startYear: 2016,
    },
  ],
  policyStance:
    "Government policy is centered on strict anti-gang crackdowns, expanded policing, and incarceration. Internationally, El Salvador supports regional cooperation but prioritizes domestic security first.",
  criminalOrganizations: [
    {
      name: "Mara Salvatrucha (MS-13)",
      description:
        "One of the most notorious transnational gangs in the Americas, designated as a Foreign Terrorist Organization by the U.S. in 2025. While primarily focused on extortion and territorial control, MS-13 provides logistical support to drug traffickers, controls local distribution networks, and taxes drug shipments passing through gang territory. Strong presence in El Salvador, Honduras, Guatemala, and the United States.",
    },
    {
      name: "Barrio 18 (18th Street Gang)",
      description:
        "Rival gang to MS-13, also involved in drug trafficking support activities including local distribution, logistics, and territorial control. Operates in El Salvador and throughout Central America with connections to Mexican cartels.",
    },
  ],
  sources: [
    "https://www.state.gov/designation-of-international-cartels",
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
    "https://insightcrime.org/el-salvador-organized-crime-news/",
    "https://www.crisisgroup.org/latin-america-caribbean/colombia-ecuador-guatemala-honduras-mexico/108-curbing-violence-latin-america-drug-trafficking-hotspots",
  ],
};
