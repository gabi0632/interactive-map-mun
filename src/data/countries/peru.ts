import { Country } from "@/types/country";

/**
 * Peru Country Data
 * Second-largest coca cultivator globally
 * Data sources: UNODC Peru Coca Monitoring Report 2023, US Treasury, InSight Crime
 */
export const peru: Country = {
  id: "PER",
  name: "Republic of Peru",
  capital: "Lima",
  population: 34352719,
  flag: "🇵🇪",
  role: "producer",
  roleDescription:
    "Peru is the world's second-largest coca cultivator and cocaine producer, accounting for approximately 27% of global coca cultivation and an estimated 25-30% of global cocaine production. Coca cultivation reached an all-time high of 95,000 hectares in 2022, increasing 18% from 2021. Remote valleys in the VRAEM region (Apurimac, Ene, and Mantaro rivers valley) serve as the primary production zones. Almost 90% of Peru's coca production is destined for the illicit drug trade, with most cocaine exported to European markets.",
  stats: {
    cocaCultivation: 95000,
    cocaineProduction: 686,
    seizures: 45000,
    eradicationEfforts: 22000,
    traffickingRoutes: ["BRA", "BOL", "ECU", "COL", "ESP", "BEL", "NLD"],
  },
  unodcPrograms: [
    {
      name: "CRIMJUST",
      description:
        "Strengthens international cooperation and judicial capacity to disrupt transnational cocaine trafficking networks operating through Peru's ports and borders.",
      startYear: 2016,
    },
    {
      name: "Alternative Development Programme",
      description:
        "Supports rural communities in VRAEM and other coca-growing regions with sustainable livelihoods through coffee, cacao, and other legal crops, combined with infrastructure and market access improvements.",
      startYear: 2002,
    },
    {
      name: "Container Control Programme (now PCCP)",
      description:
        "Enhances capacity of port and border authorities to detect and intercept cocaine shipments concealed in commercial cargo at major export hubs like Callao.",
      startYear: 2009,
    },
    {
      name: "Coca Monitoring Programme",
      description:
        "Annual surveys using satellite imagery and ground verification to track coca cultivation trends, production estimates, and socioeconomic factors driving cultivation. Published in partnership with DEVIDA (Peru's anti-narcotics agency).",
      startYear: 1999,
    },
  ],
  policyStance:
    "Peru uses a mix of eradication, alternative development projects, and security operations. It has strengthened cooperation with the U.S. and UNODC and increased air-interdiction measures but faces difficulties due to mountainous terrain and strong criminal networks.",
  criminalOrganizations: [
    {
      name: "Shining Path (Sendero Luminoso) - VRAEM Faction",
      description:
        "Remnants of the Maoist terrorist group that evolved into a narco-terrorist organization. Controls coca-growing territories in the VRAEM region, levying taxes of approximately $5,000 per ton on 200 tons of annual cocaine production, generating $10 million yearly. Provides armed security and transportation for cocaine trafficking organizations. Designated as narco-terrorist organization by U.S. Treasury in 2024.",
    },
    {
      name: "Los Cafeteros (Colombian Traffickers)",
      description:
        "Colombian drug trafficking cells operating in Peru that work closely with Shining Path remnants. Provide expertise in coca processing to cocaine and contract killing services. Facilitate transportation of Peruvian cocaine to Colombian trafficking routes.",
    },
    {
      name: "Family Clans (Local Criminal Networks)",
      description:
        "Decentralized local criminal organizations that coordinate with international groups including Mexican Sinaloa Cartel, Los Zetas, Brazilian PCC (Primeiro Comando da Capital), and Colombian bands. Control cultivation zones and intermediate coca product processing in rural areas.",
    },
    {
      name: "Primeiro Comando da Capital (PCC)",
      description:
        "Brazilian mega-gang that has established major presence in Peru to secure cocaine supplies for Brazilian and European markets. Coordinates with local clans and provides logistical support for transporting cocaine through Brazil to Europe.",
    },
  ],
  sources: [
    "https://perusupportgroup.org.uk/2024/06/unodc-report-highlights-a-further-increase-in-coca-production/",
    "https://home.treasury.gov/news/press-releases/jl10066",
    "https://insightcrime.org/news/brief/us-blacklists-peru-shining-path-for-drug-trafficking/",
    "https://ceeep.mil.pe/2023/09/07/shining-path-and-its-alliance-with-drug-trafficking-in-the-vraem/?lang=en",
    "https://www.unodc.org/unodc/en/crop-monitoring/",
  ],
};
