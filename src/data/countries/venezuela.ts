import { Country } from "@/types/country";

/**
 * Venezuela Country Data
 * Role: Mixed (Transit and Processing)
 *
 * Political instability, porous borders with Colombia, and presence of
 * armed groups create conditions that facilitate drug trafficking.
 */
export const venezuela: Country = {
  id: "VEN",
  name: "Venezuela",
  capital: "Caracas",
  population: 28838499,
  flag: "🇻🇪",
  role: "mixed",
  roleDescription: "Political instability, porous borders, and presence of armed groups create conditions that facilitate trafficking. Venezuela shares an extensive 1,378-mile porous land border with Colombia, the world's largest coca-cultivating nation. Approximately 24% of worldwide cocaine production circulates through Venezuela toward international markets. Between 200-250 metric tons of cocaine are trafficked through Venezuela annually. Over 80% of drug seizures occur at the border with Colombia. Venezuela detected and dismantled about 260 illegal cocaine processing facilities from 2019-2023, ranking fifth globally.",
  stats: {
    seizures: 225000,
    traffickingRoutes: ["USA", "EUR", "BRA", "CAN"]
  },
  unodcPrograms: [
    {
      name: "Technical Cooperation on Drug Monitoring",
      description: "Venezuela collaborates with UNODC at the technical level on drug monitoring and data collection, despite political tensions. The cooperation focuses on capacity building for drug seizure reporting and processing facility detection.",
      startYear: 2010
    }
  ],
  policyStance: "Venezuela officially denies involvement in trafficking and emphasizes sovereignty. It supports multilateral, non-military cooperation but rejects unilateral interventions. Drug-policy structures weakened during political crises, though collaboration with UNODC continues at the technical level.",
  criminalOrganizations: [
    {
      name: "Cartel de los Soles",
      description: "Alleged network involving Venezuelan military and government officials facilitating cocaine trafficking. Named after the sun insignia worn by high-ranking generals."
    },
    {
      name: "ELN (National Liberation Army)",
      description: "Colombian guerrilla group operating along Venezuela-Colombia border, controlling cocaine production and trafficking routes, taxing drug shipments."
    },
    {
      name: "Tren de Aragua",
      description: "Venezuelan mega-gang originating in Aragua state, expanded into drug trafficking, human smuggling, and extortion across Latin America."
    },
    {
      name: "FARC Dissidents",
      description: "Former FARC members who rejected the 2016 peace deal, operating in Venezuelan border regions and controlling coca cultivation and processing facilities."
    }
  ],
  sources: [
    "https://www.state.gov/wp-content/uploads/2025/03/2025-International-Narcotics-Control-Strategy-Volume-2-Accessible.pdf",
    "https://ocindex.net/assets/downloads/2025/english/ocindex_profile_venezuela_2025.pdf",
    "https://transparenciave.org/economias-ilicitas/wp-content/uploads/2025/03/Drug-Trafficking-in-Venezuela-2024.-Transparencia-Venezuela-en-el-exilio.pdf",
    "https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2025.html"
  ]
};
