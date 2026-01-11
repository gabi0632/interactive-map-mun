import { Country, OutgoingRoute } from "@/types/country";

/**
 * Chile Country Data
 * Role: Mixed (Transit Hub and Emerging Consumer Market)
 *
 * Strong institutions but growing vulnerability due to containerized
 * shipping routes through ports like San Antonio and Valparaíso.
 */
export const chile: Country = {
  id: "CHL",
  name: "Republic of Chile",
  capital: "Santiago",
  population: 19629590,
  flag: "🇨🇱",
  role: "mixed",
  roleDescription: "Strong institutions but growing vulnerability due to containerized shipping routes through ports like San Antonio and Valparaíso. Chile serves as a key destination and transit hub for cocaine due to its proximity to major producing countries Peru and Bolivia, and functions as a re-export point for shipments to Europe, the United States, Asia, and Oceania. Traffickers increasingly use non-traditional coastal ports to evade detection. San Antonio port in the Valparaíso region is prioritized by criminal organizations due to border porosity and lack of control. Criminal groups and seizures are concentrated in the Santiago Metropolitan and Valparaíso regions.",
  stats: {
    seizures: 12500,
    traffickingRoutes: ["USA", "ESP", "NLD", "AUS", "NZL", "CHN", "JPN"]
  },
  outgoingRoutes: [
    {
      toCountryId: "USA",
      toCountryName: "United States",
      type: "maritime",
      volume: "medium",
      description: "Chile to US West Coast"
    },
    {
      toCountryId: "ESP",
      toCountryName: "Spain",
      type: "air",
      volume: "medium",
      description: "Air route to Madrid"
    },
    {
      toCountryId: "NLD",
      toCountryName: "Netherlands",
      type: "maritime",
      volume: "medium",
      description: "Maritime route to Rotterdam"
    },
    {
      toCountryId: "AUS",
      toCountryName: "Australia",
      type: "maritime",
      volume: "low",
      description: "Chile to Australia - Pacific route"
    },
    {
      toCountryId: "NZL",
      toCountryName: "New Zealand",
      type: "maritime",
      volume: "low",
      description: "Pacific route to New Zealand"
    },
    {
      toCountryId: "CHN",
      toCountryName: "China",
      type: "maritime",
      volume: "low",
      description: "Chile to China - trans-Pacific"
    },
    {
      toCountryId: "JPN",
      toCountryName: "Japan",
      type: "maritime",
      volume: "low",
      description: "Trans-Pacific route to Japan"
    }
  ],
  unodcPrograms: [
    {
      name: "Port Security Initiative",
      description: "Chile participates in regional port security programs focusing on container scanning technology and risk assessment systems at major ports like San Antonio and Valparaíso.",
      startYear: 2017
    },
    {
      name: "Border Management Programme",
      description: "Technical cooperation to strengthen border controls along Chile's extensive land borders with Peru and Bolivia, focusing on intelligence sharing and coordinated operations."
    }
  ],
  policyStance: "Chile implements robust border controls, invests in port scanning, and participates in regional intelligence sharing. It also works on domestic prevention programs as cocaine consumption increases.",
  criminalOrganizations: [
    {
      name: "Tren de Aragua",
      description: "Venezuelan mega-gang expanding operations in Chile, involved in drug trafficking, human smuggling, and extortion. Growing presence in Santiago and northern border regions."
    },
    {
      name: "Chilean Local Networks",
      description: "Domestic criminal groups coordinating with Peruvian and Bolivian suppliers for cocaine transit. Concentrated in Valparaíso region and Santiago Metropolitan area."
    },
    {
      name: "Sinaloa Cartel Connections",
      description: "Mexican cartel maintaining partnerships with Chilean organizations to facilitate cocaine shipments to North America and Asia-Pacific markets through Chilean ports."
    }
  ],
  sources: [
    "https://link.springer.com/article/10.1007/s12117-021-09441-y",
    "https://insightcrime.org/news/chile-drug-trafficking-boom/",
    "https://ocindex.net/country/chile",
    "https://www.iiss.org/publications/armed-conflict-survey/2025/armed-conflict-survey-2025/regional-spotlight-americas/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC8723814/"
  ]
};
