import { Country } from "@/types/country";

export const china: Country = {
  id: "CHN",
  name: "People's Republic of China",
  capital: "Beijing",
  population: 1412000000,
  flag: "🇨🇳",
  role: "other",
  roleDescription: "Key source of precursor chemicals used in synthetic drug production globally, particularly for fentanyl and methamphetamine. While not a major cocaine trafficking actor, China plays a critical role in the global drug supply chain through chemical exports.",
  stats: {
    seizures: 15000
  },
  unodcPrograms: [
    {
      name: "Precursor Control Programme",
      description: "Collaboration with UNODC on monitoring and controlling the export of precursor chemicals used in synthetic drug production",
      startYear: 2015
    },
    {
      name: "Chemical Monitoring Systems",
      description: "Enhanced chemical tracking and export control systems in partnership with international agencies",
      startYear: 2018
    }
  ],
  policyStance: "China strictly enforces chemical controls and collaborates with UNODC on precursor monitoring. It emphasizes sovereignty and rejects external pressure. Domestic drug laws are severe, with focus on enforcement and education. The government maintains strict death penalty provisions for drug trafficking and has implemented comprehensive precursor chemical control regulations.",
  criminalOrganizations: [
    {
      name: "Chinese Chemical Suppliers",
      description: "Networks of chemical manufacturers and exporters that supply precursor chemicals for fentanyl and methamphetamine production, operating through complex international shipping routes"
    }
  ],
  sources: [
    "https://www.unodc.org/unodc/en/data-and-analysis/precursors.html",
    "https://www.dea.gov/sites/default/files/2020-03/DEA_GOV_DIR-008-20%20Fentanyl%20Flow%20in%20the%20United%20States_0.pdf",
    "UNODC World Drug Report 2024",
    "countries_data.txt - China policy context"
  ]
};
