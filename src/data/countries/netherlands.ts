import { Country, IncomingRoute } from "@/types/country";

/**
 * Netherlands
 * Major European cocaine entry point via Port of Rotterdam
 */
export const netherlands: Country = {
  id: "NLD",
  name: "Kingdom of the Netherlands",
  capital: "Amsterdam",
  population: 18346819,
  flag: "🇳🇱",
  role: "consumer",
  roleDescription:
    "The Netherlands serves as one of Europe's primary cocaine entry points and distribution hubs, with the Port of Rotterdam functioning as the main gateway for cocaine shipments from Latin America. In 2023, authorities seized a record 60,000 kg of cocaine, though seizures declined to 35,000 kg in 2024 as traffickers diversified routes to smaller European ports. The country faces unprecedented challenges from violent organized crime groups, particularly the Moroccan-Dutch criminal networks known as the Mocro Mafia, which control a significant portion of Europe's cocaine trade.",
  stats: {
    drugSeizures: {
      cocaine: 60000, // kg (2023) - record year, declined to 35,000 kg in 2024 as traffickers shifted routes
      heroin: 2426, // kg (2022) Rotterdam Port
      cannabis: 3149, // kg (2022) Rotterdam Port
      year: 2023,
      note: "2022: Rotterdam Port 46,789 kg, Vlissingen Port 4,157 kg. Largest ever single seizure: 8,000 kg from Ecuador via Panama. Airport seizures doubled to 2,250 kg (2023). Container scans increased 40%."
    },
    consumption: {
      cocaine: 650000, // estimated users - 3.5% young adult prevalence
      year: 2022,
      metric: "users",
      note: "Cocaine prevalence (young adults 15-34): 3.5% (2021-2022). Part of broader 14 million EU adults who tried cocaine."
    },
    traffickingRoutes: ["COL", "ECU", "BRA", "VEN", "PER"],
  },
  incomingRoutes: [
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "maritime",
      volume: "high",
      description: "Brazil to Rotterdam - major cocaine entry point"
    },
    {
      fromCountryId: "BRA",
      fromCountryName: "Brazil",
      type: "air",
      volume: "medium",
      description: "Air route via Schiphol"
    },
    {
      fromCountryId: "ECU",
      fromCountryName: "Ecuador",
      type: "maritime",
      volume: "high",
      description: "Ecuador to Rotterdam"
    },
    {
      fromCountryId: "ARG",
      fromCountryName: "Argentina",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Argentina"
    },
    {
      fromCountryId: "CHL",
      fromCountryName: "Chile",
      type: "maritime",
      volume: "medium",
      description: "Maritime route from Chile"
    },
    {
      fromCountryId: "PAN",
      fromCountryName: "Panama",
      type: "maritime",
      volume: "high",
      description: "Panama to Rotterdam"
    },
    {
      fromCountryId: "CRI",
      fromCountryName: "Costa Rica",
      type: "maritime",
      volume: "medium",
      description: "Costa Rica to Netherlands"
    },
    {
      fromCountryId: "VEN",
      fromCountryName: "Venezuela",
      type: "air",
      volume: "medium",
      description: "Air route from Venezuela"
    },
    {
      fromCountryId: "PER",
      fromCountryName: "Peru",
      type: "air",
      volume: "medium",
      description: "Air route from Peru"
    },
    {
      fromCountryId: "DOM",
      fromCountryName: "Dominican Republic",
      type: "air",
      volume: "medium",
      description: "Air route from Dominican Republic"
    },
    {
      fromCountryId: "GUF",
      fromCountryName: "French Guiana",
      type: "air",
      volume: "medium",
      description: "Air route from French Guiana"
    }
  ],
  unodcPrograms: [
    {
      name: "PCCP Donor and Partner",
      description:
        "The Netherlands is a major financial donor and in-kind contributor to the UNODC Passenger and Cargo Control Programme (PCCP), providing customs expertise and hosting study tours for international law enforcement officials.",
      startYear: 2010,
    },
    {
      name: "Port Security Enhancement",
      description:
        "Advanced scanning technology at Rotterdam, intelligence-led risk profiling of containers, and real-time information sharing with Colombian and Ecuadorian authorities.",
      startYear: 2016,
    },
    {
      name: "International Law Enforcement Cooperation",
      description:
        "Active participation in Europol-UNODC coordination efforts for dismantling organized crime networks operating along Atlantic cocaine trafficking routes.",
      startYear: 2015,
    },
  ],
  policyStance:
    "The Netherlands has shifted from its historically liberal, harm-reduction approach toward an increasingly law enforcement-oriented strategy in response to the cocaine trafficking crisis. The government has implemented stricter sentencing for serious drug offenses, enhanced port surveillance technology, and unprecedented cooperation with Latin American source countries including Colombia and Ecuador.",
  criminalOrganizations: [
    {
      name: "Mocro Mafia",
      description:
        "Consortium of Moroccan-Dutch criminal networks controlling a significant portion of European cocaine trade through Rotterdam and Antwerp ports. Responsible for extreme violence including assassinations of journalists and lawyers. Key figure Ridouan Taghi was sentenced to life imprisonment in 2024.",
    },
  ],
  sources: [
    "https://www.government.nl/latest/news/2024/01/17/cocaine-seizures-by-customs-see-sharp-rise-in-2023",
    "https://www.euda.europa.eu/publications/european-drug-report/2025/cocaine_en",
    "https://maritime-executive.com/article/nearly-1b-in-drugs-seized-at-dutch-ports-as-smuggling-was-reduced-in-2024",
    "https://insightcrime.org/news/cocaine-seizures-europe-netherlands-belgium/",
    "https://greydynamics.com/mocro-mafia-the-cocaine-kingpins-of-europe/",
  ],
};
