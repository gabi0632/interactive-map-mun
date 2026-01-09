# Context #2
**Created**: 2026-01-09
**Task**: Technology stack decision for MUN Interactive Map

## Progress
- [x] Evaluate package manager options (pnpm vs Bun)
- [x] Evaluate frontend framework options
- [x] Evaluate data storage options
- [x] Document final decisions

## Decisions Made

### Runtime/Package Manager: Bun
- **Rationale**: Extremely fast, all-in-one solution (runtime + bundler + package manager)
- Easy to install and use
- Great for new projects without legacy dependencies

### Frontend Framework: Next.js
- **Rationale**:
  - Easy deployment to Vercel (one-click from GitHub)
  - Static Site Generation (SSG) for fast, SEO-friendly pages
  - Great developer experience
  - Large ecosystem and community

### Data Storage: Static JSON
- **Rationale**:
  - No backend/database needed
  - Zero hosting costs
  - Easy to edit and version control
  - Perfect for relatively static MUN data
  - Can be imported at build time for type safety

### Map Library: Leaflet (react-leaflet)
- **Rationale**:
  - Free and open-source
  - Well-documented
  - Works great with Next.js
  - Good TypeScript support

### Styling: TailwindCSS
- **Rationale**:
  - Built into Next.js setup
  - Rapid prototyping
  - Responsive design utilities

## Deployment Strategy
- Primary: Vercel (free tier, automatic deployments)
- Alternative: Static export to GitHub Pages/Netlify

## Notes
- Bun is fully compatible with Next.js
- Static JSON files will be in `src/data/countries/`
- GeoJSON for map boundaries in `public/geo/`

## Status: COMPLETED
