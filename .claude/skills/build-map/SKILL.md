---
name: build-map
description: Creates or modifies map components for the interactive MUN map. Use for map rendering, country interactions, and geographic visualizations.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Build Map Skill

Develops interactive map components using React and Leaflet/MapboxGL.

## Tech Stack

- **React** with TypeScript
- **Leaflet** (react-leaflet) or **MapboxGL** (react-map-gl)
- **TailwindCSS** for styling
- **GeoJSON** for country boundaries

## Component Architecture

```
src/components/
├── Map/
│   ├── InteractiveMap.tsx      # Main map container
│   ├── CountryLayer.tsx        # GeoJSON country boundaries
│   ├── CountryPopup.tsx        # Popup on click
│   └── MapControls.tsx         # Zoom, pan controls
├── CountryPanel/
│   ├── CountryPanel.tsx        # Side panel with country details
│   ├── DrugTraffickingInfo.tsx # Drug-related statistics
│   ├── UNODCPrograms.tsx       # UNODC programs display
│   └── PolicyStance.tsx        # Policy information
└── UI/
    ├── Modal.tsx
    ├── Card.tsx
    └── Badge.tsx
```

## Key Features to Implement

### 1. Country Click Interaction
```tsx
// When user clicks a country:
// 1. Highlight the selected country
// 2. Fade/dim other countries
// 3. Open side panel with country data
// 4. Optionally zoom to the country
```

### 2. Visual Encoding
- **Color by role**: Producer (red), Transit (orange), Consumer (blue)
- **Opacity**: Based on data availability or importance
- **Borders**: Highlight trafficking routes

### 3. Data Panel
Display when country is selected:
- Flag and basic info (population, capital)
- Drug trafficking role and statistics
- Active UNODC programs
- Policy stance
- Related countries (trafficking routes)

## GeoJSON Source

Use Natural Earth data or similar for country boundaries:
- High resolution for Latin America
- Lower resolution for other regions

## Responsive Design

- Desktop: Map with side panel
- Mobile: Map with bottom sheet

## Usage

When invoked:
1. Determine which component/feature to build
2. Check existing code structure
3. Implement with proper TypeScript types
4. Update context file with progress
5. Test the component renders correctly
