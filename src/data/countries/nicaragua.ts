import { Country } from "@/types/country";

/**
 * Nicaragua Country Data
 * Role: Transit corridor (limited public data)
 */
export const nicaragua: Country = {
  id: "NIC",
  name: "Nicaragua",
  capital: "Managua",
  population: 6948392,
  flag: "🇳🇮",
  role: "transit",
  roleDescription:
    "Nicaragua serves as a transit corridor for cocaine moving through Central America, though the country maintains relatively lower visibility in trafficking operations compared to neighboring Honduras and Guatemala. The government's authoritarian control and limited international cooperation create challenges for transparency regarding drug trafficking activities. Both Caribbean and Pacific coastlines are exploited for maritime smuggling.",
  stats: {
    seizures: 3000, // kg per year (approximate estimate)
    traffickingRoutes: ["GTM", "MEX", "USA"], // Transit destinations
  },
  unodcPrograms: [
    {
      name: "Maritime Drug Interdiction Support",
      description:
        "Limited UNODC technical cooperation focusing on coastal surveillance and maritime interdiction capabilities along Pacific and Caribbean coasts.",
      startYear: 2015,
    },
  ],
  policyStance:
    "Nicaragua emphasizes sovereignty and maintains limited cooperation with international drug enforcement efforts. The government publicly opposes drug trafficking but faces criticism for lack of transparency and insufficient engagement with multilateral initiatives.",
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
    "https://insightcrime.org/nicaragua-organized-crime-news/",
    "https://www.state.gov/bureaus-offices/under-secretary-for-civilian-security-democracy-and-human-rights/bureau-of-international-narcotics-and-law-enforcement-affairs/",
  ],
};
