/**
 * CountryPanel Demo/Test Component
 *
 * This file demonstrates how to use the CountryPanel component
 * and provides a mock country object for testing.
 *
 * Usage in a page/component:
 *
 * import { CountryPanel } from '@/components/CountryPanel';
 * import { useState } from 'react';
 *
 * function MyPage() {
 *   const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
 *   const [isPanelOpen, setIsPanelOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => {
 *         setSelectedCountry(mockColombia);
 *         setIsPanelOpen(true);
 *       }}>
 *         View Colombia Info
 *       </button>
 *
 *       <CountryPanel
 *         country={selectedCountry}
 *         isOpen={isPanelOpen}
 *         onClose={() => setIsPanelOpen(false)}
 *       />
 *     </>
 *   );
 * }
 */

import type { Country } from '@/types';

/**
 * Mock Country Data - Colombia
 * Use this for testing the CountryPanel component
 */
export const mockColombia: Country = {
  id: 'COL',
  name: 'Colombia',
  capital: 'Bogotá',
  population: 51874024,
  flag: '🇨🇴',
  role: 'producer',
  roleDescription:
    'Major cocaine producer accounting for approximately 70% of global supply. Colombia has the largest coca cultivation area in the world.',
  stats: {
    cocaCultivation: 204000,
    cocaineProduction: 1400,
    seizures: 500000,
    eradicationEfforts: 130000,
  },
  unodcPrograms: [
    {
      name: 'PCCP',
      description:
        'Paris Pact Consultative Group for counter-narcotics cooperation in Afghanistan and neighboring countries',
      startYear: 2019,
    },
    {
      name: 'CRIMJUST',
      description:
        'Strengthening criminal justice systems and fostering the rule of law to counter terrorism and organized crime',
      startYear: 2016,
    },
  ],
  policyStance:
    'Colombia pursues a comprehensive strategy combining strong law enforcement, alternative development programs for coca farmers, and international cooperation through UNODC programs.',
  criminalOrganizations: [
    {
      name: 'Gulf Clan (Clan del Golfo)',
      description:
        'Largest drug trafficking organization in Colombia, controlling major cocaine production and trafficking routes',
    },
    {
      name: 'ELN (National Liberation Army)',
      description:
        'Guerrilla group heavily involved in drug trafficking and coca cultivation taxation',
    },
  ],
  sources: [
    'https://www.unodc.org/colombia',
    'https://www.state.gov/bureau-of-international-narcotics-and-law-enforcement-affairs/',
  ],
};

/**
 * Mock Country Data - Mexico (Transit Country)
 */
export const mockMexico: Country = {
  id: 'MEX',
  name: 'Mexico',
  capital: 'Mexico City',
  population: 128932753,
  flag: '🇲🇽',
  role: 'transit',
  roleDescription:
    'Primary transit country for cocaine from South America to the United States. Also produces heroin and synthetic drugs.',
  stats: {
    seizures: 800000,
  },
  unodcPrograms: [
    {
      name: 'CRIMJUST',
      description:
        'Strengthening criminal justice cooperation to counter transnational organized crime',
      startYear: 2017,
    },
  ],
  policyStance:
    'Military-led approach to combating drug cartels, with increasing focus on addressing corruption and strengthening institutions.',
  criminalOrganizations: [
    {
      name: 'Sinaloa Cartel',
      description:
        'One of the most powerful drug trafficking organizations globally, controlling major routes to the US',
    },
    {
      name: 'Jalisco New Generation Cartel (CJNG)',
      description:
        'Rapidly expanding cartel known for violence and control of synthetic drug production',
    },
  ],
  sources: ['https://www.unodc.org/mexico', 'https://www.dea.gov/'],
};

/**
 * Mock Country Data - Peru (Producer)
 */
export const mockPeru: Country = {
  id: 'PER',
  name: 'Peru',
  capital: 'Lima',
  population: 33715471,
  flag: '🇵🇪',
  role: 'producer',
  roleDescription:
    'Second-largest coca producer globally. Coca is primarily cultivated in the VRAEM region and the Apurímac valley.',
  stats: {
    cocaCultivation: 88200,
    cocaineProduction: 500,
    seizures: 120000,
    eradicationEfforts: 25000,
  },
  unodcPrograms: [
    {
      name: 'PCCP',
      description:
        'Alternative development programs targeting coca-growing communities',
      startYear: 2018,
    },
  ],
  policyStance:
    'Balanced approach combining forced eradication, alternative development, and interdiction efforts.',
  criminalOrganizations: [
    {
      name: 'Shining Path Remnants',
      description:
        'Former insurgent group operating in VRAEM, now primarily involved in protecting coca cultivation',
    },
  ],
  sources: ['https://www.unodc.org/peru'],
};
