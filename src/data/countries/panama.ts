import { Country } from "@/types/country";

/**
 * Panama Country Data
 * Role: Panama Canal maritime chokepoint and port hub
 */
export const panama: Country = {
  id: "PAN",
  name: "Panama",
  capital: "Panama City",
  population: 4408581,
  flag: "🇵🇦",
  role: "transit",
  roleDescription:
    "Panama serves as a critical maritime chokepoint for global cocaine trafficking due to the Panama Canal and extensive port infrastructure. The country's strategic position bridging the Pacific and Caribbean makes it a focal point for traffickers shipping cocaine to North America, Europe, Asia, and Africa. Colombian and Mexican cartels exploit Panama's advanced logistics infrastructure, free trade zones, and busy commercial ports. Record cocaine seizures in 2025 highlight the escalating use of Panamanian ports, particularly Colón.",
  stats: {
    seizures: 85000, // kg per year (2025 estimates - record highs)
    traffickingRoutes: ["USA", "ESP", "NLD", "BEL", "ITA"], // Global destinations
  },
  unodcPrograms: [
    {
      name: "PCCP (Passenger and Cargo Control Programme)",
      description:
        "Major focus on Panama's six concessioned ports on both coasts, strengthening container inspection technology, x-ray scanners, and risk profiling systems. Works with Panama Canal Authority and port operators to combat cocaine smuggling in commercial cargo.",
      startYear: 2015,
    },
    {
      name: "CRIMJUST",
      description:
        "Supports Panama's role as regional hub for transnational investigations. Facilitates intelligence sharing between Panamanian, Colombian, Mexican, and European law enforcement agencies targeting international trafficking networks.",
      startYear: 2016,
    },
    {
      name: "Maritime Interdiction and Port Security",
      description:
        "Provides technical assistance for naval patrol operations, port security reforms, and anti-corruption measures targeting infiltration of port workers and officials by criminal organizations.",
      startYear: 2014,
    },
  ],
  policyStance:
    "Panama prioritizes port-inspection technology, maritime patrol cooperation, and container-monitoring systems. It works closely with UNODC and the World Customs Organization. Anti-money-laundering laws have also been strengthened to combat criminal financing networks.",
  criminalOrganizations: [
    {
      name: "Colombian Cartels (Operational Presence)",
      description:
        "Multiple Colombian trafficking organizations maintain operations in Panama to coordinate cocaine exports through the Canal and ports. Use Panama's logistics infrastructure and free trade zones to dispatch shipments globally.",
    },
    {
      name: "Mexican Cartels (Operational Presence)",
      description:
        "Sinaloa Cartel and CJNG maintain strategic presence in Panama to secure cocaine supplies and coordinate transshipment to Mexican territory and onward to the United States.",
    },
  ],
  sources: [
    "https://ticotimes.net/2025/08/27/panama-sees-record-cocaine-flow-through-ports-bound-for-europe",
    "https://newsroompanama.com/2025/03/23/panamas-ports-have-become-a-booming-route-for-cocaine-trafficking/",
    "https://traccc.gmu.edu/wp-content/uploads/2024/10/Updated-Central-American-report.pdf",
    "https://insightcrime.org/panama-organized-crime-news/panama/",
    "https://www.unodc.org/ropan/en/BorderControl/container-control/panama.html",
  ],
};
