import { Country } from "@/types/country";

/**
 * Austria
 * UNODC headquarters host and diplomatic actor
 */
export const austria: Country = {
  id: "AUT",
  name: "Austria",
  capital: "Vienna",
  population: 9042000,
  flag: "🇦🇹",
  role: "consumer",
  roleDescription:
    "Primarily a diplomatic actor as host of UNODC headquarters in Vienna. Austria hosts one of four UN headquarters globally (along with New York, Geneva, and Nairobi). The Vienna International Centre, opened in 1979, serves as the central hub for UNODC operations worldwide, employing around 3,400 people as of 2020. Austria's neutral status and geopolitical position during the Cold War made it an ideal platform for international dialogue, a role it continues to fulfill in coordinating global responses to drug trafficking.",
  stats: {
    seizures: 800, // kg per year (estimated, limited transit route)
    traffickingRoutes: ["DEU", "ITA", "SVN"],
  },
  unodcPrograms: [
    {
      name: "UNODC Headquarters Operations",
      description:
        "Austria hosts UNODC headquarters in Vienna, serving as the operational and diplomatic center for all global UNODC programmes including PCCP, CRIMJUST, and regional initiatives.",
      startYear: 1997,
    },
    {
      name: "European Drug Monitoring",
      description:
        "Austria supports multilateral dialogue and European drug monitoring initiatives, emphasizing human-rights-based approaches to drug policy.",
      startYear: 2005,
    },
    {
      name: "Capacity Building Initiatives",
      description:
        "As host country, Austria provides diplomatic and logistical support for UNODC capacity building programmes worldwide, particularly in Latin America and Africa.",
      startYear: 2000,
    },
  ],
  policyStance:
    "Austria supports multilateral dialogue, capacity building, and European drug monitoring, emphasizing human-rights-based approaches. As host of UNODC headquarters, Austria plays a crucial diplomatic role in facilitating international cooperation on drug control. Austria is also a candidate for a non-permanent seat on the UN Security Council for 2027-2028.",
  criminalOrganizations: [],
  sources: [
    "https://unis.unvienna.org/unis/en/about/unvienna.html",
    "https://www.unvienna.org/",
    "https://www.bmeia.gv.at/en/european-foreign-policy/austria-and-the-united-nations/",
    "https://en.wikipedia.org/wiki/United_Nations_Office_on_Drugs_and_Crime",
  ],
};
