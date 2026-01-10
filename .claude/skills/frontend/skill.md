---
name: frontend
description: Comprehensive UI/UX design system and best practices for creating exceptional user experiences. Use when building or reviewing any frontend component.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
---

# Frontend Excellence Skill

A comprehensive guide for creating exceptional UI/UX experiences in the MUN Interactive Map project. This skill embeds industry-leading design principles, accessibility standards, and performance best practices.

---

## Part 1: Core UX Laws

Apply these fundamental laws when designing any interface:

### Essential Laws to Remember

| Law | Principle | Application |
|-----|-----------|-------------|
| **Fitts's Law** | Target acquisition time = f(distance, size) | Make interactive elements large enough (min 44x44px touch targets) and position frequently used actions within easy reach |
| **Hick's Law** | Decision time increases with choices | Limit options, use progressive disclosure, group related items |
| **Miller's Law** | Working memory holds 7±2 items | Chunk information, limit navigation items to 5-7 |
| **Jakob's Law** | Users prefer familiar patterns | Follow established conventions (maps zoom with scroll, panels slide from edges) |
| **Aesthetic-Usability Effect** | Beautiful = perceived as more usable | Invest in visual polish—it directly impacts perceived quality |
| **Von Restorff Effect** | Different items are more memorable | Make CTAs visually distinct from surroundings |
| **Doherty Threshold** | Keep response time under 400ms | Optimize performance, use loading states for longer operations |
| **Peak-End Rule** | Memory = peak moment + final moment | Design memorable interactions and smooth exits |

### Gestalt Principles for Visual Design

```
┌─────────────────────────────────────────────────────────────┐
│  PROXIMITY        SIMILARITY       COMMON REGION            │
│  ● ● ●           ● ● ○ ○ ○       ┌─────┐ ┌─────┐           │
│                  (grouped by     │ ● ● │ │ ○ ○ │           │
│  ● ● ●           shape)          └─────┘ └─────┘           │
│  (grouped by                     (grouped by                │
│   distance)                       boundary)                 │
└─────────────────────────────────────────────────────────────┘
```

### Additional UX Laws Reference

| Law | Description |
|-----|-------------|
| **Cognitive Load** | Minimize mental effort required to use the interface |
| **Law of Proximity** | Objects near each other are perceived as grouped |
| **Law of Similarity** | Similar elements are perceived as related |
| **Law of Common Region** | Elements in a bounded area appear grouped |
| **Serial Position Effect** | Users remember first and last items best |
| **Zeigarnik Effect** | Incomplete tasks are remembered better than completed ones |
| **Goal-Gradient Effect** | Motivation increases as users approach a goal |
| **Tesler's Law** | Every system has irreducible complexity |
| **Postel's Law** | Be liberal in what you accept, conservative in what you send |

---

## Part 2: Mobile-First Responsive Design

### The Mobile-First Approach

**Always start with mobile, then enhance for larger screens.**

```tsx
// Tailwind breakpoints (mobile-first)
// Default styles = mobile
// sm: 640px+
// md: 768px+
// lg: 1024px+
// xl: 1280px+
// 2xl: 1536px+

// Example: Mobile-first component
<div className="
  p-4                    // Mobile: comfortable padding
  sm:p-6                 // Tablet: more breathing room
  lg:p-8                 // Desktop: generous spacing

  grid
  grid-cols-1            // Mobile: single column
  md:grid-cols-2         // Tablet: two columns
  lg:grid-cols-3         // Desktop: three columns

  gap-4 md:gap-6 lg:gap-8
">
```

### Touch-Friendly Guidelines

```
┌─────────────────────────────────────────────────────────────┐
│  TOUCH TARGET SIZES                                         │
│                                                             │
│  Minimum: 44x44px (Apple HIG)                              │
│  Recommended: 48x48px (Material Design)                     │
│  Spacing between targets: 8px minimum                       │
│                                                             │
│  ┌────────────────┐    ┌──────┐                            │
│  │   Good: 48px   │    │ Bad  │ <- Too small (32px)        │
│  │                │    │      │                             │
│  └────────────────┘    └──────┘                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tailwind Touch Classes

```tsx
// Touch-friendly button
<button className="
  min-h-[44px] min-w-[44px]    // Minimum touch target
  px-4 py-3                     // Comfortable padding
  touch-manipulation            // Disable double-tap zoom
  active:scale-95              // Touch feedback
  transition-transform
">

// Touch-friendly link in list
<a className="
  block                         // Full-width touchable
  py-3 px-4                     // Generous tap area
  -mx-4                         // Extend to edges
  active:bg-slate-100          // Touch feedback
">
  Link text here
</a>
```

### Strategic Breakpoints

```tsx
// Content-driven breakpoints
const breakpoints = {
  // Sidebar collapses
  sidebarCollapse: 'lg:block hidden',

  // Map controls reposition
  mapControls: 'bottom-4 right-4 lg:top-4 lg:bottom-auto',

  // Panel behavior
  panel: 'fixed inset-x-0 bottom-0 h-[60vh] lg:relative lg:h-full lg:w-[400px]',
};
```

### Mobile Performance Stats

- **63%** of users abandon sites due to mobile usability issues
- **53%** of mobile users abandon sites taking >3 seconds to load
- **7+ billion** smartphone users globally in 2025

---

## Part 3: Map-Specific UI Patterns

### Map Interaction Layers

```
┌─────────────────────────────────────────────────────────────┐
│  MAP UI HIERARCHY (top to bottom)                           │
│                                                             │
│  Layer 4: Overlays (panels, modals, tooltips)              │
│  Layer 3: Controls (zoom, search, filters)                 │
│  Layer 2: Interactive data (countries, markers, routes)    │
│  Layer 1: Base map (geography, water, terrain)             │
│                                                             │
│  Each layer has distinct interaction patterns!              │
└─────────────────────────────────────────────────────────────┘
```

### Country Interaction States

```tsx
// Comprehensive hover/active states for map regions
const countryStyles = {
  default: {
    fill: 'var(--country-fill)',
    stroke: 'var(--country-stroke)',
    strokeWidth: 0.5,
    transition: 'all 150ms ease-out',
  },
  hover: {
    fill: 'var(--country-fill-hover)',
    strokeWidth: 1,
    filter: 'brightness(1.1)',
    cursor: 'pointer',
  },
  active: {
    fill: 'var(--country-fill-active)',
    strokeWidth: 2,
    stroke: 'var(--accent)',
  },
  disabled: {
    fill: 'var(--country-fill-disabled)',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
```

### Information Panel Patterns

```
┌─────────────────────────────────────────────────────────────┐
│  PANEL LAYOUTS                                              │
│                                                             │
│  MOBILE (Sheet from bottom)      DESKTOP (Side panel)      │
│  ┌─────────────────────┐         ┌────────┬────────────┐   │
│  │        Map          │         │        │            │   │
│  │                     │         │        │   Panel    │   │
│  ├─────────────────────┤         │  Map   │  (fixed    │   │
│  │   ═══ (drag handle) │         │        │   width)   │   │
│  │      Panel          │         │        │            │   │
│  │   (60vh height)     │         │        │            │   │
│  └─────────────────────┘         └────────┴────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Map Control Positioning

```tsx
// Responsive map controls
<div className="
  absolute
  z-10

  // Mobile: bottom corners
  bottom-4 right-4
  flex flex-col gap-2

  // Desktop: top-right
  lg:top-4 lg:bottom-auto
">
  <ZoomControls />
  <LayerToggle />
</div>

// Search bar positioning
<div className="
  absolute
  z-20

  // Mobile: top, full width
  top-4 left-4 right-4

  // Desktop: top-left, fixed width
  lg:right-auto lg:w-[300px]
">
  <SearchBar />
</div>
```

### Map Data Visualization Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Choropleth** | Show density/intensity by region | Color fill with legend |
| **Clustering** | Reduce clutter at low zoom | Group markers, show count |
| **Heat Map** | Show concentration areas | Gradient overlay |
| **Flow Lines** | Show routes/movement | Animated bezier curves |
| **Chart Markers** | Show multi-dimensional data | Mini charts on markers |

---

## Part 4: Visual Design System

### Color Palette Strategy

```css
/* In globals.css - Use CSS custom properties for theming */
:root {
  /* Semantic colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  /* Map-specific colors */
  --producer-country: 220 90% 56%;      /* Blue */
  --transit-country: 45 93% 47%;        /* Amber */
  --consumer-country: 142 71% 45%;      /* Green */
  --trafficking-route: 0 84% 60%;       /* Red */

  /* Interactive states */
  --hover-overlay: 0 0% 0% / 0.05;
  --active-ring: 221.2 83.2% 53.3%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Adjust all colors for dark mode */
}
```

### Color Accessibility Guidelines

- **Text contrast**: Minimum 4.5:1 ratio (WCAG AA)
- **Large text**: Minimum 3:1 ratio
- **Interactive elements**: Minimum 3:1 against background
- Use patterns/symbols alongside colors for colorblind users
- Test with colorblind simulation tools

### Typography Scale

```tsx
// Consistent typography using Tailwind
const typography = {
  // Headings
  h1: 'text-3xl font-bold tracking-tight lg:text-4xl',
  h2: 'text-2xl font-semibold tracking-tight lg:text-3xl',
  h3: 'text-xl font-semibold lg:text-2xl',
  h4: 'text-lg font-medium',

  // Body
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',

  // UI elements
  label: 'text-sm font-medium',
  caption: 'text-xs text-muted-foreground',

  // Data display
  stat: 'text-2xl font-bold tabular-nums',
  statLabel: 'text-xs uppercase tracking-wide text-muted-foreground',
};
```

### Spacing System

```
┌─────────────────────────────────────────────────────────────┐
│  SPACING SCALE (8px base)                                   │
│                                                             │
│  0.5 = 2px   (micro adjustments)                           │
│  1   = 4px   (tight spacing)                               │
│  2   = 8px   (default small gap)                           │
│  3   = 12px  (medium gap)                                  │
│  4   = 16px  (comfortable padding)                         │
│  6   = 24px  (section spacing)                             │
│  8   = 32px  (large sections)                              │
│  12  = 48px  (major separations)                           │
│  16  = 64px  (page sections)                               │
│                                                             │
│  USE CONSISTENTLY: p-4, gap-4, space-y-4, m-4              │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 5: Micro-Interactions & Animation

### Animation Principles

```tsx
// Use CSS transitions for simple state changes
const transitions = {
  fast: 'transition-all duration-150 ease-out',    // Hovers, toggles
  normal: 'transition-all duration-200 ease-out',  // Most interactions
  slow: 'transition-all duration-300 ease-out',    // Panels, modals
  spring: 'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]', // Bouncy
};

// Respect user preferences
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Framer Motion Patterns

> **Note**: Install Framer Motion before using these patterns: `bun add framer-motion`

```tsx
// Panel slide animation
import { motion, AnimatePresence } from 'framer-motion';

const panelVariants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Usage
<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CountryPanel />
    </motion.div>
  )}
</AnimatePresence>
```

### Loading States

```tsx
// Skeleton loading pattern
const SkeletonCard = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-slate-200 rounded w-3/4" />
    <div className="h-4 bg-slate-200 rounded w-1/2" />
    <div className="h-20 bg-slate-200 rounded" />
  </div>
);

// Map loading indicator
const MapLoadingOverlay = () => (
  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading map...</p>
    </div>
  </div>
);
```

### Hover & Focus States

```tsx
// Comprehensive interactive states
<button className="
  /* Base styles */
  bg-primary text-primary-foreground
  px-4 py-2 rounded-md
  font-medium

  /* Transitions */
  transition-all duration-150

  /* Hover */
  hover:bg-primary/90
  hover:shadow-md

  /* Focus (keyboard) */
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2

  /* Active (pressed) */
  active:scale-[0.98]

  /* Disabled */
  disabled:opacity-50
  disabled:pointer-events-none
">
```

### When to Use Animations

| Scenario | Animation Type | Duration |
|----------|----------------|----------|
| Button hover | Scale/color | 150ms |
| Menu open | Slide + fade | 200ms |
| Panel transition | Slide | 300ms |
| Page transition | Fade | 200ms |
| Loading indicator | Continuous spin | - |
| Success feedback | Scale bounce | 300ms |

---

## Part 6: Accessibility (A11y) Checklist

### WCAG 2.1 Compliance Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  ACCESSIBILITY CHECKLIST                                    │
│                                                             │
│  ☐ Color contrast: 4.5:1 for text, 3:1 for large text     │
│  ☐ All images have alt text                                │
│  ☐ Form inputs have associated labels                      │
│  ☐ Focus states are visible                                │
│  ☐ Interactive elements are keyboard accessible            │
│  ☐ ARIA labels on icon-only buttons                        │
│  ☐ Skip links for keyboard navigation                      │
│  ☐ Reduced motion support                                  │
│  ☐ Screen reader announcements for dynamic content         │
│  ☐ Semantic HTML structure                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tailwind Accessibility Utilities

```tsx
// Screen reader only text
<button>
  <Icon />
  <span className="sr-only">Close panel</span>
</button>

// Focus visible (keyboard only)
<a className="
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary
  focus-visible:ring-offset-2
">

// Skip link
<a
  href="#main-content"
  className="
    sr-only
    focus:not-sr-only
    focus:absolute
    focus:top-4
    focus:left-4
    focus:z-50
    focus:px-4
    focus:py-2
    focus:bg-primary
    focus:text-primary-foreground
    focus:rounded
  "
>
  Skip to main content
</a>
```

### ARIA Patterns

```tsx
// Live region for dynamic updates
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {announcement}
</div>

// Expandable panel
<button
  aria-expanded={isOpen}
  aria-controls="panel-content"
>
  {isOpen ? 'Close' : 'Open'} Details
</button>
<div
  id="panel-content"
  aria-hidden={!isOpen}
>
  {/* Panel content */}
</div>

// Interactive map region
<div
  role="application"
  aria-label="Interactive map showing drug trafficking routes in Latin America"
  tabIndex={0}
>
  <svg>{/* Map content */}</svg>
</div>
```

### Testing Tools

- **Lighthouse** - Built into Chrome DevTools
- **axe DevTools** - Browser extension
- **WAVE** - Web accessibility evaluation
- **WebAIM Contrast Checker** - Color contrast validation

---

## Part 7: Component Patterns

### shadcn/ui Best Practices

```tsx
// Composition pattern
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Good: Compose existing components
const CountryPanel = ({ country }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost">View Details</Button>
    </SheetTrigger>
    <SheetContent className="w-full sm:max-w-lg">
      <CountryDetails country={country} />
    </SheetContent>
  </Sheet>
);

// Use the cn() utility for conditional classes
import { cn } from '@/lib/utils';

const Card = ({ className, isSelected, ...props }) => (
  <div
    className={cn(
      'rounded-lg border p-4',
      isSelected && 'border-primary bg-primary/5',
      className
    )}
    {...props}
  />
);
```

### Component Structure

```
src/components/{Location}/{ComponentName}/
├── {ComponentName}.tsx       # Main component
├── {ComponentName}.types.ts  # TypeScript interfaces
└── index.ts                  # Barrel export
```

```tsx
// ComponentName.tsx
'use client';

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import type { ComponentNameProps } from './ComponentName.types';

export const ComponentName: FC<ComponentNameProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'base-classes here',
        className
      )}
      {...props}
    >
      {/* Content */}
    </div>
  );
};
```

### Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Directly modifying shadcn source | Hard to update | Extend via className prop |
| Overusing custom CSS | Inconsistent styling | Use Tailwind utilities |
| Ignoring accessibility | Excludes users | Add ARIA, keyboard support |
| Giant components | Hard to maintain | Split into smaller pieces |
| Inline styles | No theme support | Use CSS variables/Tailwind |

---

## Part 8: Performance Guidelines

### Core Web Vitals Targets

```
┌─────────────────────────────────────────────────────────────┐
│  PERFORMANCE TARGETS                                        │
│                                                             │
│  LCP (Largest Contentful Paint): < 2.5s                    │
│  FID (First Input Delay): < 100ms                          │
│  CLS (Cumulative Layout Shift): < 0.1                      │
│  TTI (Time to Interactive): < 3.8s                         │
│                                                             │
│  For maps specifically:                                     │
│  - Initial map render: < 1s                                │
│  - Country hover response: < 50ms                          │
│  - Panel open animation: < 300ms                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Image Optimization

```tsx
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src={flagUrl}
  alt={`Flag of ${country.name}`}
  width={48}
  height={32}
  className="rounded"
  loading="lazy"        // Lazy load below-fold images
  placeholder="blur"    // Show blur while loading
/>

// For map icons/markers, use SVG sprites
<svg className="w-6 h-6">
  <use href="/sprites.svg#marker-icon" />
</svg>
```

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(
  () => import('@/components/Map/InteractiveMap'),
  {
    loading: () => <MapSkeleton />,
    ssr: false, // Maps often need client-side only
  }
);

// Lazy load panel content
const CountryDetails = dynamic(
  () => import('@/components/CountryPanel/CountryDetails'),
  { loading: () => <DetailsSkeleton /> }
);
```

### Performance Checklist

- [ ] Images optimized (WebP/AVIF, proper sizing)
- [ ] Heavy components lazy loaded
- [ ] Fonts preloaded or using system fonts
- [ ] CSS purged of unused styles
- [ ] JavaScript bundle analyzed and split
- [ ] Animations use `transform` and `opacity` only
- [ ] React.memo for expensive components
- [ ] useCallback/useMemo where appropriate

---

## Part 9: Quick Reference

### Tailwind Utility Cheatsheet

```tsx
// Layout
flex items-center justify-between gap-4
grid grid-cols-1 md:grid-cols-2 gap-6

// Spacing
p-4 px-6 py-3 m-2 mt-4 space-y-4

// Typography
text-sm font-medium text-muted-foreground
text-lg font-semibold tracking-tight

// Colors
bg-primary text-primary-foreground
bg-muted/50 border-border

// Borders & Shadows
rounded-lg border shadow-sm
ring-2 ring-offset-2 ring-primary

// Interactivity
cursor-pointer select-none
hover:bg-accent focus-visible:ring-2
disabled:opacity-50 disabled:pointer-events-none

// Transitions
transition-all duration-200 ease-out
animate-in fade-in slide-in-from-right

// Responsive
hidden md:block
w-full lg:w-[400px]
text-sm lg:text-base
```

### Component Decision Matrix

| Need | Component | Notes |
|------|-----------|-------|
| Side panel | `Sheet` | Mobile: bottom sheet, Desktop: side |
| Tooltips | `Tooltip` | For hover info, keeps state local |
| Notifications | `Toast` | For async feedback |
| Confirmation | `AlertDialog` | For destructive actions |
| Selection | `Select` or `RadioGroup` | Use native for mobile |
| Search | `Command` | Keyboard accessible, filterable |
| Data display | `Card` | Consistent container styling |

---

## Usage

When building or reviewing frontend code:

1. **Check against UX Laws** - Does the design respect Fitts's, Hick's, Miller's laws?
2. **Verify mobile-first** - Are base styles for mobile, enhanced for desktop?
3. **Test touch targets** - Are all interactive elements 44px+ minimum?
4. **Review accessibility** - Labels, focus states, ARIA attributes present?
5. **Optimize performance** - Images optimized? Heavy components lazy loaded?
6. **Apply consistent styling** - Using design tokens and spacing scale?
7. **Add micro-interactions** - Hover states, transitions, loading feedback?

---

## Resources

### Essential References
- [Laws of UX](https://lawsofux.com/) - Foundational UX principles
- [shadcn/ui](https://ui.shadcn.com/) - Component documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility reference
- [Map UI Patterns](https://mapuipatterns.com/) - Map-specific patterns

### Research Sources
- [Web App UI/UX Best Practices 2025](https://cygnis.co/blog/web-app-ui-ux-best-practices-2025/)
- [Mobile-First Design Best Practices](https://www.adicator.com/post/responsive-design-best-practices)
- [Map UI Design Best Practices](https://www.eleken.co/blog-posts/map-ui-design)
- [Framer Motion for UI](https://www.shoaibsid.dev/blog/motion-ui-with-framer-motion-in-2025-more-than-just-animations)
- [Tailwind Accessibility](https://accreditly.io/articles/make-the-web-accessible-with-tailwind-css)
- [Sidebar UX Best Practices](https://uxplanet.org/best-ux-practices-for-designing-a-sidebar-9174ee0ecaa2)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
