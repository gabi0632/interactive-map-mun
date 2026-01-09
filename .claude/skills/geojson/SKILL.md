---
name: geojson
description: Handle GeoJSON data - download country boundaries, simplify geometries, and optimize for web. Use when working with map geographic data.
allowed-tools: Bash, Read, Write, WebFetch
---

# GeoJSON Skill

Manages geographic data for the interactive map.

## Data Sources

### Natural Earth (Recommended)
Free, public domain map data at multiple resolutions.

```bash
# Download countries (medium resolution, ~1MB)
curl -o public/geo/countries.json \
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
```

### Filtered Latin America Only
Better performance by including only needed countries.

## Country Codes (ISO 3166-1 alpha-3)

### Production Countries
- COL - Colombia
- PER - Peru
- BOL - Bolivia

### Transit Countries
- MEX - Mexico
- GTM - Guatemala
- HND - Honduras
- SLV - El Salvador
- NIC - Nicaragua
- CRI - Costa Rica
- PAN - Panama
- ECU - Ecuador
- VEN - Venezuela
- BRA - Brazil

### Consumer/Partner
- USA - United States
- ARG - Argentina
- DOM - Dominican Republic

## File Structure

```
public/geo/
├── latin-america.json    # Main map data
├── trafficking-routes.json # Optional: route lines
└── README.md             # Data sources
```

## GeoJSON Format

```typescript
interface GeoJSONFeature {
  type: "Feature";
  properties: {
    ISO_A3: string;      // Country code
    NAME: string;        // Country name
    // Custom properties
    role?: "producer" | "transit" | "consumer";
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][];
  };
}
```

## Optimization

### Simplify Geometries
Large GeoJSON files slow down the map. Use mapshaper to simplify:

```bash
# Install mapshaper
bun add -g mapshaper

# Simplify (keep 10% of points)
mapshaper public/geo/countries.json \
  -simplify 10% \
  -o public/geo/countries-simplified.json
```

### Filter Countries
Extract only Latin American countries:

```bash
mapshaper public/geo/countries.json \
  -filter 'ISO_A3 in "COL,PER,BOL,MEX,GTM,HND,SLV,NIC,CRI,PAN,ECU,VEN,BRA,USA,ARG,DOM".split(",")' \
  -o public/geo/latin-america.json
```

## Adding Custom Properties

Merge country data with GeoJSON:

```typescript
// In code
import geoData from '@/public/geo/latin-america.json';
import countryData from '@/data/countries';

const enrichedGeo = {
  ...geoData,
  features: geoData.features.map(feature => ({
    ...feature,
    properties: {
      ...feature.properties,
      ...countryData[feature.properties.ISO_A3]
    }
  }))
};
```

## Leaflet Usage

```tsx
import { GeoJSON } from 'react-leaflet';

<GeoJSON
  data={geoData}
  style={(feature) => ({
    fillColor: getColorByRole(feature.properties.role),
    weight: 1,
    color: '#666',
    fillOpacity: 0.7
  })}
  onEachFeature={(feature, layer) => {
    layer.on('click', () => onCountryClick(feature));
  }}
/>
```

## Checklist

- [ ] Download base GeoJSON
- [ ] Filter to required countries
- [ ] Simplify for performance
- [ ] Add to public/geo/
- [ ] Test in map component
- [ ] Verify all countries render
