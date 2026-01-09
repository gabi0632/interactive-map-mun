# Product Requirements Document (PRD)
# Interactive Map for MUN - UNODC Drug Trafficking in Latin America

**Version:** 1.0
**Created:** January 9, 2026
**Status:** Draft

---

## 1. Executive Summary

An interactive web-based map application for Model United Nations (MUN) competition focused on UNODC Drug Trafficking in Latin America. The application enables delegates to explore country-specific data, understand trafficking routes, and visualize the complex dynamics of drug production, transit, and consumption across the Americas.

---

## 2. Problem Statement

MUN delegates researching drug trafficking in Latin America face challenges:
- **Scattered information** across multiple sources
- **Lack of visual context** for geographic relationships
- **Difficulty understanding** production-transit-consumption dynamics
- **No centralized tool** for quick country-specific data lookup during debates

---

## 3. Goals & Objectives

### Primary Goals
1. Provide an interactive visual tool for MUN delegates to explore drug trafficking data
2. Enable quick access to country-specific information during debates
3. Illustrate the geographic flow of drug trafficking routes

### Success Metrics
- Delegates can find country data in < 3 clicks
- All 20+ relevant countries have complete data profiles
- Map loads in < 2 seconds
- Mobile-responsive for tablet use during sessions

---

## 4. Target Users

### Primary: MUN Delegates
- High school/university students
- Need quick reference during debates
- Varying levels of technical proficiency
- Use laptops/tablets during sessions

### Secondary: Chairs & Advisors
- Faculty advisors preparing students
- Committee chairs reviewing submissions
- Need comprehensive data overview

---

## 5. Scope

### In Scope
- Interactive map of Latin America and key partner countries
- Country information panels with drug trafficking data
- Visual distinction by country role (producer/transit/consumer)
- UNODC program information per country
- Responsive design for desktop and tablet

### Out of Scope (v1.0)
- User accounts/authentication
- Real-time data updates
- Collaborative features
- Mobile phone optimization (tablet minimum)
- Multi-language support

---

## 6. Features & Requirements

### 6.1 Interactive Map (Core Feature)

| ID | Requirement | Priority |
|----|-------------|----------|
| M-01 | Display world map with focus on Latin America | P0 |
| M-02 | Zoom/pan functionality with Latin America as default view | P0 |
| M-03 | Color-code countries by trafficking role | P0 |
| M-04 | Hover state showing country name tooltip | P0 |
| M-05 | Click country to open detail panel | P0 |
| M-06 | Visual legend for color coding | P1 |
| M-07 | Highlight trafficking routes (optional overlay) | P2 |

**Color Coding Scheme:**
- 🔴 **Red** - Production countries (Colombia, Peru, Bolivia)
- 🟠 **Orange** - Transit countries (Mexico, Central America, Caribbean)
- 🟡 **Yellow** - Mixed role (Ecuador, Venezuela, Brazil)
- 🔵 **Blue** - Consumer markets (USA, Europe)
- ⚪ **Gray** - Other/minimal involvement

### 6.2 Country Information Panel

| ID | Requirement | Priority |
|----|-------------|----------|
| P-01 | Slide-in panel on country click | P0 |
| P-02 | Display country flag and name | P0 |
| P-03 | Show basic info (capital, population) | P1 |
| P-04 | Display trafficking role classification | P0 |
| P-05 | Key statistics (seizures, cultivation, etc.) | P0 |
| P-06 | Active UNODC programs | P0 |
| P-07 | Policy stance summary | P1 |
| P-08 | Major criminal organizations | P1 |
| P-09 | Close panel button | P0 |
| P-10 | Link to external resources | P2 |

### 6.3 User Interface

| ID | Requirement | Priority |
|----|-------------|----------|
| U-01 | Clean, professional design suitable for MUN | P0 |
| U-02 | Responsive layout (desktop + tablet) | P0 |
| U-03 | Header with title and UNODC branding context | P1 |
| U-04 | Loading state while map initializes | P1 |
| U-05 | Search/filter countries (optional) | P2 |

---

## 7. Technical Architecture

### 7.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Runtime** | Bun | Fast package manager, modern runtime |
| **Framework** | Next.js 14+ (App Router) | SSR/SSG, React ecosystem, Vercel deploy |
| **Language** | TypeScript | Type safety, better DX |
| **Map Library** | react-simple-maps | Lightweight, SVG-based, perfect for country selection |
| **Styling** | TailwindCSS | Rapid UI development, consistent design |
| **Data** | Static JSON | No backend needed, fast builds |
| **Deployment** | Vercel | Zero-config Next.js hosting |

### 7.2 Why react-simple-maps over Leaflet?

| Criteria | react-simple-maps | react-leaflet |
|----------|------------------|---------------|
| Bundle size | ~50KB | ~150KB + tiles |
| Country click UX | Native support | Requires GeoJSON setup |
| Choropleth coloring | Trivial | Manual implementation |
| SSR compatibility | Works out of box | Requires dynamic import |
| Use case fit | Data visualization ✅ | Navigation/routing |

### 7.3 Project Structure

```
interactive-map-mun/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page with map
│   │   └── globals.css         # Global styles + Tailwind
│   ├── components/
│   │   ├── Map/
│   │   │   ├── InteractiveMap.tsx    # Main map component
│   │   │   ├── CountryGeography.tsx  # Individual country rendering
│   │   │   └── MapLegend.tsx         # Color legend
│   │   ├── CountryPanel/
│   │   │   ├── CountryPanel.tsx      # Slide-in detail panel
│   │   │   ├── CountryHeader.tsx     # Flag, name, role badge
│   │   │   ├── CountryStats.tsx      # Statistics section
│   │   │   └── CountryPrograms.tsx   # UNODC programs section
│   │   └── UI/
│   │       ├── Tooltip.tsx           # Hover tooltip
│   │       ├── Badge.tsx             # Role badge component
│   │       └── LoadingSpinner.tsx    # Loading state
│   ├── data/
│   │   ├── countries.json            # All country data
│   │   └── geo/
│   │       └── world-110m.json       # TopoJSON world map
│   ├── types/
│   │   └── country.ts                # TypeScript interfaces
│   ├── lib/
│   │   ├── countryUtils.ts           # Helper functions
│   │   └── colors.ts                 # Color scheme constants
│   └── hooks/
│       └── useCountryData.ts         # Data fetching hook
├── public/
│   └── flags/                        # Country flag images
├── PRD.md
├── CLAUDE.md
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 8. Data Requirements

### 8.1 Country Data Schema

```typescript
interface Country {
  // Identification
  id: string;              // ISO 3166-1 alpha-3 (e.g., "COL")
  name: string;            // "Colombia"
  capital: string;         // "Bogotá"
  population: number;      // 51874024
  flag: string;            // URL or emoji

  // Trafficking Classification
  role: "producer" | "transit" | "consumer" | "mixed";
  roleDescription: string; // Brief explanation

  // Statistics
  stats: {
    cocaCultivation?: number;      // hectares
    cocaineProduction?: number;    // metric tons
    seizures?: number;             // kg per year
    eradicationEfforts?: number;   // hectares
    traffickingRoutes?: string[];  // destination countries
  };

  // UNODC Information
  unodcPrograms: {
    name: string;
    description: string;
    startYear?: number;
  }[];

  // Policy & Organizations
  policyStance: string;            // Summary of approach
  criminalOrganizations?: {
    name: string;
    description: string;
  }[];

  // Sources
  sources: string[];               // Reference URLs
}
```

### 8.2 Countries to Include

#### Production Countries (Red)
| Country | ISO | Key Data Points |
|---------|-----|-----------------|
| Colombia | COL | Coca cultivation, cocaine production, FARC legacy |
| Peru | PER | Coca cultivation, cocaine production |
| Bolivia | BOL | Coca cultivation, legal coca policy |

#### Transit Countries (Orange)
| Country | ISO | Key Data Points |
|---------|-----|-----------------|
| Mexico | MEX | Cartels, fentanyl, US border |
| Guatemala | GTM | Northern Triangle, transit routes |
| Honduras | HND | Northern Triangle, gang activity |
| El Salvador | SLV | Gang policy, transit |
| Nicaragua | NIC | Maritime routes |
| Costa Rica | CRI | Maritime transit |
| Panama | PAN | Darien Gap, maritime |

#### Mixed Role (Yellow)
| Country | ISO | Key Data Points |
|---------|-----|-----------------|
| Ecuador | ECU | Port trafficking, violence surge |
| Venezuela | VEN | Transit, weak enforcement |
| Brazil | BRA | Transit, consumption, Amazon routes |

#### Consumer Markets (Blue)
| Country | ISO | Key Data Points |
|---------|-----|-----------------|
| United States | USA | Largest consumer market |
| Canada | CAN | Growing market |

---

## 9. User Interface Specifications

### 9.1 Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  🌐 UNODC Drug Trafficking in Latin America              [?]     │
├────────────────────────────────────────────┬─────────────────────┤
│                                            │                     │
│                                            │   Country Panel     │
│                                            │   (slides in on     │
│            Interactive Map                 │    country click)   │
│         (centered on Latin America)        │                     │
│                                            │   - Flag & Name     │
│                                            │   - Role Badge      │
│    [Zoom +]                                │   - Statistics      │
│    [Zoom -]                                │   - UNODC Programs  │
│                                            │   - Organizations   │
│                                            │                     │
│   ┌─────────────────────────────┐          │         [X Close]   │
│   │ Legend                      │          │                     │
│   │ 🔴 Producer  🟠 Transit     │          │                     │
│   │ 🟡 Mixed     🔵 Consumer    │          │                     │
│   └─────────────────────────────┘          │                     │
└────────────────────────────────────────────┴─────────────────────┘
```

### 9.2 Color Palette

```css
:root {
  /* Role Colors */
  --color-producer: #EF4444;    /* Red 500 */
  --color-transit: #F97316;     /* Orange 500 */
  --color-mixed: #EAB308;       /* Yellow 500 */
  --color-consumer: #3B82F6;    /* Blue 500 */
  --color-inactive: #9CA3AF;    /* Gray 400 */

  /* UI Colors */
  --color-bg: #F9FAFB;          /* Gray 50 */
  --color-panel: #FFFFFF;       /* White */
  --color-text: #111827;        /* Gray 900 */
  --color-text-muted: #6B7280;  /* Gray 500 */
  --color-border: #E5E7EB;      /* Gray 200 */

  /* Hover States */
  --color-hover: #FCA5A5;       /* Red 300 */
}
```

### 9.3 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop | ≥1024px | Map + Side Panel |
| Tablet | 768-1023px | Map + Bottom Sheet Panel |
| Mobile | <768px | Not optimized (show warning) |

---

## 10. Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Basic map rendering with react-simple-maps
- [ ] Country click detection
- [ ] Simple country panel (name, role)
- [ ] Color coding by role

### Phase 2: Data Integration
- [ ] Complete country data JSON
- [ ] Country panel with full statistics
- [ ] UNODC programs display
- [ ] Criminal organizations section

### Phase 3: Polish
- [ ] Hover tooltips
- [ ] Map legend
- [ ] Responsive design
- [ ] Loading states
- [ ] Animations/transitions

### Phase 4: Enhancement (Post-MVP)
- [ ] Search functionality
- [ ] Trafficking route visualization
- [ ] Print-friendly view
- [ ] Keyboard navigation

---

## 11. Dependencies

### NPM Packages

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-simple-maps": "^3.0.0",
    "react-tooltip": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

### External Data Sources
- TopoJSON world map: [Natural Earth Data](https://github.com/topojson/world-atlas)
- Country flags: [Flagpedia](https://flagpedia.net/) or emoji flags
- UNODC data: Provided PDF document + [UNODC Data Portal](https://dataunodc.un.org/)

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incomplete country data | High | Start with core 15 countries, expand later |
| Map performance on older devices | Medium | Use simplified TopoJSON, lazy load panel |
| Data accuracy concerns | High | Cite all sources, use official UNODC data |
| Browser compatibility | Low | Test on Chrome, Firefox, Safari |

---

## 13. Open Questions

1. **Data Sources**: Should we include specific statistics from the UNODC PDF, or keep descriptions more general?
2. **Trafficking Routes**: Should we visualize actual routes as lines on the map?
3. **Updates**: How often will data need to be updated after initial deployment?
4. **Branding**: Any specific MUN committee branding requirements?

---

## 14. Appendix

### A. Reference Documents
- UNODC Drug Trafficking.pdf (project root)
- [UNODC World Drug Report](https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2024.html)

### B. Similar Projects for Inspiration
- [UNODC Data Portal](https://dataunodc.un.org/)
- [InSight Crime Maps](https://insightcrime.org/)

---

**Document History**
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-09 | Claude | Initial draft |
