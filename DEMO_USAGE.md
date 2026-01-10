# InteractiveMap Component Usage Demo

## Overview
The InteractiveMap and MapLegend components are now ready to use. This document shows how to integrate them into your application.

## Basic Usage Example

```tsx
'use client';

import { useState } from 'react';
import { InteractiveMap, MapLegend } from '@/components/Map';
import type { CountryRole } from '@/types';

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Mock country roles (replace with actual data from API/JSON)
  const mockCountryRoles: Record<string, CountryRole> = {
    // Producers
    COL: 'producer',
    PER: 'producer',
    BOL: 'producer',

    // Transit
    MEX: 'transit',
    GTM: 'transit',
    HND: 'transit',
    SLV: 'transit',
    NIC: 'transit',
    CRI: 'transit',
    PAN: 'transit',

    // Mixed
    ECU: 'mixed',
    VEN: 'mixed',
    BRA: 'mixed',

    // Consumer
    USA: 'consumer',
    CAN: 'consumer',
  };

  const handleCountryClick = (countryId: string) => {
    console.log('Country clicked:', countryId);
    setSelectedCountry(countryId === selectedCountry ? null : countryId);
  };

  return (
    <div className="w-full h-screen relative">
      <InteractiveMap
        onCountryClick={handleCountryClick}
        selectedCountry={selectedCountry}
        countryRoles={mockCountryRoles}
      />
      <MapLegend />
    </div>
  );
}
```

## Component Props

### InteractiveMap

| Prop | Type | Description |
|------|------|-------------|
| `onCountryClick` | `(countryId: string) => void` | Callback fired when a clickable country is clicked. Receives ISO 3166-1 alpha-3 country code. |
| `selectedCountry` | `string \| null` | Currently selected country ID. Pass `null` for no selection. |
| `countryRoles` | `Record<string, CountryRole>` | Mapping of country ISO codes to their roles (`'producer'`, `'transit'`, `'mixed'`, or `'consumer'`). |

### MapLegend

No props required. The legend automatically displays all country role categories with their colors and descriptions.

## Features

### Interactive Behavior
- **Click**: Select a country by clicking on it (only works for countries in `LATIN_AMERICA_COUNTRIES`)
- **Hover**: Pointer cursor and subtle highlight on hover for clickable countries
- **Selection**: Selected country remains highlighted, while non-selected countries fade to gray
- **Zoom/Pan**: Built-in zoom and pan controls via `ZoomableGroup`

### Visual Styling
- Countries are colored by role using CSS custom properties from `globals.css`:
  - Producer: Red (`#EF4444`)
  - Transit: Orange (`#F97316`)
  - Mixed: Yellow (`#EAB308`)
  - Consumer: Blue (`#3B82F6`)
  - Inactive/Faded: Gray (`#E5E7EB` when not selected, `#D1D5DB` for countries without roles)

- Selected countries have enhanced visual feedback with drop shadow
- Smooth transitions on hover and selection state changes

### Clickable Countries
Only the following countries are interactive (defined in `LATIN_AMERICA_COUNTRIES`):
- **Producers**: COL, PER, BOL
- **Transit**: MEX, GTM, HND, SLV, NIC, CRI, PAN
- **Mixed**: ECU, VEN, BRA
- **Consumers**: USA, CAN

## Integration with Country Data

When you have actual country data, pass it to the map:

```tsx
import { countries } from '@/data/countries'; // Your country data

// Transform to role mapping
const countryRoles = countries.reduce((acc, country) => {
  acc[country.id] = country.role;
  return acc;
}, {} as Record<string, CountryRole>);

<InteractiveMap
  onCountryClick={handleCountryClick}
  selectedCountry={selectedCountry}
  countryRoles={countryRoles}
/>
```

## Next Steps

To complete the interactive map experience:
1. Create country detail panel component that displays when a country is selected
2. Load actual country data from JSON files in `src/data/countries/`
3. Add trafficking route visualizations (polylines between countries)
4. Implement zoom-to-country functionality on selection
5. Add search/filter functionality

## Testing Recommendations

1. **Visual Testing**: Use the ui-tester agent to verify:
   - Map renders correctly centered on Latin America
   - Colors match the legend
   - Hover states work properly
   - Click interactions respond correctly
   - Selected state visual feedback is clear

2. **Interaction Testing**:
   - Click different countries and verify selection state
   - Click same country twice to deselect
   - Hover over clickable vs non-clickable countries
   - Test zoom and pan functionality

3. **Responsive Testing**:
   - Test on different screen sizes
   - Verify legend positioning on mobile
   - Check touch interactions on mobile devices
