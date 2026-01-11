import { Country, OutgoingRoute } from "@/types/country";

/**
 * Honduras Country Data
 * Role: Major transit point with high crime and corruption
 */
export const honduras: Country = {
  id: "HND",
  name: "Republic of Honduras",
  capital: "Tegucigalpa",
  population: 10278345,
  flag: "🇭🇳",
  role: "transit",
  roleDescription:
    "Honduras is a major transit point for cocaine shipments moving from South America to the United States, facing severe challenges from corruption, gang infiltration, and institutional weakness. The country serves as a key node where drugs arrive via air and sea before continuing overland to Guatemala and Mexico. Recent data shows a shift from aerial to maritime trafficking methods.",
  stats: {
    seizures: 7000, // kg per year (2024 data - first 4 months)
    traffickingRoutes: ["GTM", "MEX", "USA"], // Transit destinations
  },
  outgoingRoutes: [
    {
      toCountryId: "GTM",
      toCountryName: "Guatemala",
      type: "land",
      volume: "high",
      description: "Honduras to Guatemala corridor"
    },
    {
      toCountryId: "MEX",
      toCountryName: "Mexico",
      type: "land",
      volume: "medium",
      description: "Land route to Mexico via Guatemala"
    },
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "air",
      volume: "medium",
      description: "Air route to US"
    }
  ],
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description:
        "Strengthens inspection capabilities at ports and border crossings to detect cocaine shipments arriving by sea and air, focusing on maritime routes along northern and Pacific coasts.",
      startYear: 2018,
    },
    {
      name: "CRIMJUST",
      description:
        "Supports transnational investigations and prosecutorial reform to combat organized crime networks, with emphasis on reducing corruption in law enforcement and judiciary.",
      startYear: 2017,
    },
  ],
  policyStance:
    "Recent administrations have increased extraditions of traffickers and expanded cooperation with U.S. and UNODC. The government is attempting institutional reforms but struggles with corruption within law enforcement.",
  criminalOrganizations: [
    {
      name: "Valle Valle Cartel",
      description:
        "Powerful Honduran trafficking organization led by the Valle Valle family. Controls cocaine transit routes through Honduras, particularly maritime corridors. Multiple family members have been extradited to the United States on drug trafficking charges.",
    },
    {
      name: "Cachiros",
      description:
        "Former major trafficking organization that controlled eastern Honduras. Leadership cooperated with U.S. authorities and the organization has been largely dismantled, but remnants continue operations.",
    },
    {
      name: "Atlantic Cartel (Los Atlanticos)",
      description:
        "Controls drug trafficking operations along Honduras' northern Caribbean coast. Facilitates cocaine shipments arriving from South America and coordinates onward transit to Guatemala.",
    },
    {
      name: "Sinaloa Cartel (Operational Presence)",
      description:
        "Maintains strategic partnerships with local Honduran groups to secure cocaine supplies transiting through the country toward Mexico and the United States.",
    },
  ],
  sources: [
    "https://journals.sagepub.com/doi/10.1177/17488958241289362",
    "https://insightcrime.org/news/central-ameria-drug-flights-fall/",
    "https://www.crisisgroup.org/latin-america-caribbean/colombia-ecuador-guatemala-honduras-mexico/108-curbing-violence-latin-america-drug-trafficking-hotspots",
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
  ],
};
