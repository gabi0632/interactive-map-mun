import { Country } from "@/types/country";

/**
 * Dominican Republic Country Data
 * Role: Caribbean transit bridge to North America and Europe
 */
export const dominicanRepublic: Country = {
  id: "DOM",
  name: "Dominican Republic",
  capital: "Santo Domingo",
  population: 11332972,
  flag: "🇩🇴",
  role: "transit",
  roleDescription:
    "The Dominican Republic serves as a crucial Caribbean transit bridge for cocaine trafficking from South America to North America and Europe. The country's extensive coastline, busy airports, and commercial seaports make it a strategic transshipment point. Traffickers exploit both maritime routes (go-fast boats, fishing vessels) and air cargo to move cocaine through Dominican territory. The country has invested significantly in detection technology at ports and airports.",
  stats: {
    seizures: 15000, // kg per year (approximate)
    traffickingRoutes: ["USA", "PRI", "ESP", "NLD", "BEL"], // Primary destinations
  },
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description:
        "Focuses on strengthening inspection capabilities at Las Américas International Airport, Punta Cana Airport, and seaports including Santo Domingo and Haina. Provides advanced scanning technology, canine units, and risk profiling training to detect cocaine concealed in cargo and passenger luggage.",
      startYear: 2016,
    },
    {
      name: "CRIMJUST",
      description:
        "Supports Dominican Republic's participation in regional investigative case forums, enhancing cooperation with Colombian, Venezuelan, and European law enforcement to track and prosecute transnational trafficking networks.",
      startYear: 2017,
    },
    {
      name: "Airport and Seaport Security Enhancement",
      description:
        "Technical assistance program providing training for customs officials, port authorities, and airport security personnel. Focuses on detection of narcotics in commercial shipments, postal services, and passenger traffic.",
      startYear: 2015,
    },
  ],
  policyStance:
    "The country invests in airport and seaport security with UNODC support. It also works with regional task forces and has expanded surveillance and container-control units.",
  sources: [
    "https://www.unodc.org/documents/data-and-analysis/Studies/TOC_Central_America_and_the_Caribbean_english.pdf",
    "https://insightcrime.org/dominican-republic-organized-crime-news/",
    "https://www.state.gov/bureaus-offices/under-secretary-for-civilian-security-democracy-and-human-rights/bureau-of-international-narcotics-and-law-enforcement-affairs/",
    "https://www.unodc.org/ropan/en/BorderControl/CRIMJUST/index.html",
  ],
};
