---
name: country-data
description: Generates or updates country data for the interactive map. Use when adding new country information or updating existing country profiles.
allowed-tools: Read, Write, Edit, WebSearch, WebFetch
---

# Country Data Skill

Creates comprehensive country data profiles for the MUN interactive map.

## Data Structure

Each country should have the following data in JSON format:

```typescript
interface CountryData {
  id: string;                    // ISO 3166-1 alpha-2 code
  name: string;                  // Full country name
  capital: string;
  population: number;
  region: "andean" | "central-america" | "caribbean" | "south-america" | "north-america" | "europe";

  // Drug trafficking specific
  role: "producer" | "transit" | "consumer" | "mixed";

  drugTrafficking: {
    mainSubstances: string[];    // cocaine, cannabis, fentanyl, etc.
    cultivationArea?: number;    // hectares, if producer
    seizuresAnnual?: number;     // kg seized
    majorRoutes?: string[];      // trafficking routes through/from country
    criminalOrganizations?: string[];
  };

  unodcPrograms: {
    name: string;
    description: string;
    status: "active" | "planned" | "completed";
  }[];

  policyStance: {
    approach: "strict-enforcement" | "harm-reduction" | "mixed" | "decriminalization";
    description: string;
    keyPolicies: string[];
  };

  statistics: {
    homicideRate?: number;       // per 100,000
    corruptionIndex?: number;    // Transparency International
    gdpPerCapita?: number;
  };

  flagEmoji: string;
  coordinates: [number, number]; // [lat, lng] for map centering
}
```

## Countries to Include

### Production Countries (Andean)
- Colombia (CO)
- Peru (PE)
- Bolivia (BO)

### Transit Countries
- Mexico (MX)
- Guatemala (GT)
- Honduras (HN)
- El Salvador (SV)
- Nicaragua (NI)
- Costa Rica (CR)
- Panama (PA)
- Ecuador (EC)
- Venezuela (VE)
- Brazil (BR)

### Consumer/Partner Countries
- United States (US)
- Argentina (AR)
- Dominican Republic (DO)

## Usage

1. Specify which country/countries to generate data for
2. Research current statistics (use WebSearch if needed)
3. Generate JSON data following the structure above
4. Save to `src/data/countries/{country-code}.json`
5. Update the index file `src/data/countries/index.ts`

## Reference

Use the UNODC Drug Trafficking PDF as the primary source for drug trafficking information.
