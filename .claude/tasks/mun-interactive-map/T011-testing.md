# Task T011: Unit & Integration Testing

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T011 |
| **Phase** | 3 - Polish |
| **Priority** | P1 (High) |
| **Agent** | `test-runner` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | Yes (after T010b) |

## Description
Write unit tests for components and integration tests for user flows, including visual enhancement components.

## Prerequisites
- T007 completed (main page integration)
- T010b completed (map visual enhancements)
- All components exist

## Acceptance Criteria
- [ ] Vitest configured and running
- [ ] CountryPanel tests pass
- [ ] MapLegend tests pass (including route types)
- [ ] Integration test for click flow
- [ ] MapHeader tests pass (UNODC branding)
- [ ] CountryLabels tests pass
- [ ] TraffickingRoutes tests pass
- [ ] SimulationCountriesList tests pass
- [ ] Coverage > 60%

## Implementation Steps

### Step 1: Install Testing Dependencies
```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

### Step 2: Configure Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Step 3: Create Test Setup
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
```

### Step 4: Write Component Tests
```tsx
// src/components/CountryPanel/CountryPanel.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CountryPanel } from './CountryPanel';
import { Country } from '@/types';

const mockCountry: Country = {
  id: 'COL',
  name: 'Colombia',
  capital: 'Bogotá',
  population: 51874024,
  flag: '🇨🇴',
  role: 'producer',
  roleDescription: 'Test description',
  stats: {},
  unodcPrograms: [],
  policyStance: 'Test policy',
  sources: []
};

describe('CountryPanel', () => {
  it('renders country name when open', () => {
    render(
      <CountryPanel
        country={mockCountry}
        isOpen={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Colombia')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <CountryPanel
        country={mockCountry}
        isOpen={true}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('returns null when no country provided', () => {
    const { container } = render(
      <CountryPanel country={null} isOpen={true} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });
});
```

### Step 5: Write MapLegend Tests
```tsx
// src/components/Map/MapLegend.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapLegend } from './MapLegend';

describe('MapLegend', () => {
  it('renders all role labels', () => {
    render(<MapLegend />);
    expect(screen.getByText('Producer')).toBeInTheDocument();
    expect(screen.getByText('Transit')).toBeInTheDocument();
    expect(screen.getByText('Mixed')).toBeInTheDocument();
    expect(screen.getByText('Consumer')).toBeInTheDocument();
  });

  it('renders route type indicators', () => {
    render(<MapLegend />);
    expect(screen.getByText('Land Routes')).toBeInTheDocument();
    expect(screen.getByText('Maritime Routes')).toBeInTheDocument();
    expect(screen.getByText('Air Routes')).toBeInTheDocument();
  });
});
```

### Step 6: Write MapHeader Tests (T010b)
```tsx
// src/components/Map/MapHeader.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapHeader } from './MapHeader';

describe('MapHeader', () => {
  it('renders title text', () => {
    render(<MapHeader />);
    expect(screen.getByText(/Simulation Countries/i)).toBeInTheDocument();
    expect(screen.getByText(/Drug Trafficking Routes/i)).toBeInTheDocument();
  });

  it('renders UNODC branding', () => {
    render(<MapHeader />);
    expect(screen.getByText('UNODC')).toBeInTheDocument();
  });
});
```

### Step 7: Write CountryLabels Tests (T010b)
```tsx
// src/components/Map/CountryLabels.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountryLabels } from './CountryLabels';

describe('CountryLabels', () => {
  it('renders country name labels', () => {
    render(<CountryLabels />);
    // Check for key simulation countries
    expect(screen.getByText('MEXICO')).toBeInTheDocument();
    expect(screen.getByText('COLOMBIA')).toBeInTheDocument();
    expect(screen.getByText('BRAZIL')).toBeInTheDocument();
  });
});
```

### Step 8: Write TraffickingRoutes Tests (T010b)
```tsx
// src/components/Map/TraffickingRoutes.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TraffickingRoutes } from './TraffickingRoutes';

describe('TraffickingRoutes', () => {
  it('renders without crashing', () => {
    const { container } = render(<TraffickingRoutes />);
    expect(container).toBeTruthy();
  });

  it('renders route paths', () => {
    const { container } = render(<TraffickingRoutes />);
    // Routes should render as SVG paths or lines
    const paths = container.querySelectorAll('path, line');
    expect(paths.length).toBeGreaterThan(0);
  });
});
```

### Step 9: Write SimulationCountriesList Tests (T010b)
```tsx
// src/components/Map/SimulationCountriesList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SimulationCountriesList } from './SimulationCountriesList';

describe('SimulationCountriesList', () => {
  it('renders section title', () => {
    render(<SimulationCountriesList />);
    expect(screen.getByText(/Simulation Countries/i)).toBeInTheDocument();
  });

  it('renders country flags and names', () => {
    render(<SimulationCountriesList />);
    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('renders all simulation countries', () => {
    render(<SimulationCountriesList />);
    // Should have at least 15 simulation countries
    const countryElements = screen.getAllByText(/🇨🇴|🇲🇽|🇧🇷|🇵🇪|🇧🇴|🇻🇪|🇪🇨|🇬🇹|🇭🇳|🇸🇻|🇳🇮|🇨🇷|🇵🇦|🇺🇸|🇨🇦/);
    expect(countryElements.length).toBeGreaterThanOrEqual(10);
  });
});
```

### Step 10: Add Test Script
```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Output Artifacts
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/components/CountryPanel/CountryPanel.test.tsx`
- `src/components/Map/MapLegend.test.tsx`
- `src/components/Map/MapHeader.test.tsx`
- `src/components/Map/CountryLabels.test.tsx`
- `src/components/Map/TraffickingRoutes.test.tsx`
- `src/components/Map/SimulationCountriesList.test.tsx`
- `package.json` (updated scripts)

## Verification
```bash
bun test
# All tests should pass
```

## Prerequisites
- T010b (Map Visual Enhancements) must be completed before running tests

## Parallel Tasks
Can run after T010b is complete, parallel with:
- T008, T009, T010

## Blocks
- T012 (Deployment - tests should pass before deploy)
