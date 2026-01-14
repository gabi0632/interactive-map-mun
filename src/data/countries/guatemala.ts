import { Country, OutgoingRoute } from "@/types/country";

/**
 * Guatemala Country Data
 * Role: Central land corridor for cocaine transit
 */
export const guatemala: Country = {
  id: "GTM",
  name: "Republic of Guatemala",
  capital: "Guatemala City",
  population: 17608483,
  flag: "🇬🇹",
  role: "transit",
  roleDescription:
    "Guatemala serves as a critical land corridor for cocaine moving from South America through Central America to Mexico and the United States. The country faces challenges from weak institutions, corruption, and strong cartel presence. Los Huistas and other local groups facilitate transfers between Colombian producers and Mexican cartels, particularly CJNG.",
  stats: {
    drugSeizures: {
      cocaine: 18200, // kg (2024) - 264% increase under President Arévalo
      cannabis: 1169, // kg (2022)
      year: 2024,
      note: "Dramatic 2024 increase: 5,000 kg (2023) → 18,200 kg (2024). 4 million coca plants destroyed (2022), increased to 7.9 million (2023)."
    },
    transitVolume: {
      cocaine: 50, // metric tons/year estimated - Northern Triangle corridor
      year: 2023,
      note: "2024 increase suggests route shift back to Central America or significantly increased enforcement"
    },
    traffickingRoutes: ["MEX", "USA"],
  },
  outgoingRoutes: [
    {
      toCountryId: "MEX",
      toCountryName: "Mexico",
      type: "land",
      volume: "high",
      description: "Guatemala to Mexico - primary land corridor"
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
        "Builds capacity at border crossings, seaports, and airports to identify and intercept high-risk cargo containers and passengers involved in drug trafficking.",
      startYear: 2019,
    },
    {
      name: "CRIMJUST",
      description:
        "Strengthens transnational investigations and prosecutorial capacity to target organized crime networks operating along trafficking routes.",
      startYear: 2017,
    },
  ],
  policyStance:
    "Guatemala cooperates with both UNODC and U.S. agencies to improve border security, intelligence sharing, and corruption reduction. However, limited resources and political instability hinder long-term progress.",
  criminalOrganizations: [
    {
      name: "Los Huistas",
      description:
        "Local trafficking organization based in Huehuetenango department. Serves as intermediary between Colombian suppliers and Mexican cartels, particularly CJNG. Controls cocaine movement through Guatemala's western highlands toward Mexico.",
    },
    {
      name: "Sinaloa Cartel (Operational Presence)",
      description:
        "Maintains operational cells and partnerships with local groups to secure cocaine transit routes through Guatemala toward the U.S. border.",
    },
    {
      name: "CJNG (Operational Presence)",
      description:
        "Works with local Guatemalan groups like Los Huistas to move cocaine from Colombian sources through Central America. Increasingly active in establishing direct control over transit routes.",
    },
  ],
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
    "https://insightcrime.org/news/central-ameria-drug-flights-fall/",
    "https://www.crisisgroup.org/latin-america-caribbean/colombia-ecuador-guatemala-honduras-mexico/108-curbing-violence-latin-america-drug-trafficking-hotspots",
    "https://traccc.gmu.edu/wp-content/uploads/2024/10/Updated-Central-American-report.pdf",
  ],
};
