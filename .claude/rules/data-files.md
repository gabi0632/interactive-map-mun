---
paths: src/data/**/*.{json,ts}
---

# Data Files Rules

## Country Data
- Store in `src/data/countries/{ISO-CODE}.json`
- Use ISO 3166-1 alpha-2 codes (CO, PE, MX, etc.)
- Follow the CountryData interface exactly

## GeoJSON
- Store in `src/data/geo/`
- Use TopoJSON format for smaller files
- Include only necessary properties

## Index Files
- Each data folder needs an `index.ts` exporting all data
- Use barrel exports for clean imports

## Data Validation
- All country data must have required fields
- Use TypeScript to enforce structure at build time
