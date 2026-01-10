import { Country } from "@/types/country";

export const russia: Country = {
  id: "RUS",
  name: "Russia",
  capital: "Moscow",
  population: 144000000,
  flag: "🇷🇺",
  role: "other",
  roleDescription: "Faces significant domestic drug trafficking and consumption challenges, primarily involving heroin from Afghanistan and synthetic drugs. Russia serves as both a transit route and major consumer market for illicit substances from Central Asia and other regions.",
  stats: {
    seizures: 45000,
    traffickingRoutes: ["AFG", "KAZ", "UZB"]
  },
  unodcPrograms: [
    {
      name: "Regional Anti-Drug Programme",
      description: "Participation in UNODC regional initiatives targeting drug trafficking routes from Central Asia",
      startYear: 2010
    },
    {
      name: "Drug Treatment and Prevention",
      description: "Support for developing evidence-based drug prevention and treatment programs",
      startYear: 2012
    }
  ],
  policyStance: "Russia supports prohibition-based policies, strict law enforcement, and opposes drug decriminalization. It advocates for strong state-led initiatives and regional anti-trafficking operations. The government maintains harsh criminal penalties for drug offenses and promotes international cooperation focused on supply-side interdiction rather than harm reduction approaches.",
  criminalOrganizations: [
    {
      name: "Afghan-Russian Trafficking Networks",
      description: "Organized crime groups facilitating heroin and opiate trafficking from Afghanistan through Central Asian republics into Russia"
    },
    {
      name: "Synthetic Drug Producers",
      description: "Domestic and transnational networks producing and distributing synthetic drugs including synthetic opioids and designer drugs"
    }
  ],
  sources: [
    "https://www.unodc.org/unodc/en/frontpage/2021/June/unodc-and-russian-federation-strengthen-cooperation-on-drug-control.html",
    "UNODC World Drug Report 2024",
    "https://www.emcdda.europa.eu/",
    "countries_data.txt - Russia policy context"
  ]
};
