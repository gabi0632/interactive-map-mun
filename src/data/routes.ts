/**
 * Drug Trafficking Routes Data
 *
 * Routes are designed to originate from country hub points with slight
 * directional offsets for visual clarity.
 */

export type RouteType = 'land' | 'maritime' | 'air';

export interface TraffickingRoute {
  id: string;
  from: {
    countryId: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  to: {
    countryId: string;
    coordinates: [number, number];
  };
  type: RouteType;
  volume: 'high' | 'medium' | 'low';
  description?: string;
}

// Route colors matching CSS variables
export const ROUTE_COLORS: Record<RouteType, string> = {
  land: '#2D5016',      // Dark green
  maritime: '#1E5F8A',  // Navy blue
  air: '#8B2323',       // Dark red
};

// Route type labels for legend
export const ROUTE_LABELS: Record<RouteType, string> = {
  land: 'Land Routes',
  maritime: 'Maritime Routes',
  air: 'Air Routes',
};

/**
 * Country hub coordinates - central points for route origins
 * All routes from a country should originate near these hubs
 */
const COUNTRY_HUBS: Record<string, [number, number]> = {
  // South America Producers
  COL: [-74, 4],    // Colombia - Bogota area
  PER: [-76, -10],  // Peru - Lima area
  BOL: [-65, -17],  // Bolivia - La Paz area

  // Transit Countries
  VEN: [-67, 8],    // Venezuela
  ECU: [-79, -1],   // Ecuador
  BRA: [-47, -15],  // Brazil - central
  PAN: [-79.5, 9],  // Panama
  CRI: [-84, 10],   // Costa Rica
  GTM: [-90.5, 14.5], // Guatemala
  MEX: [-99, 19],   // Mexico - Mexico City
  DOM: [-70, 19],   // Dominican Republic

  // Consumer Markets
  USA: [-95, 38],   // USA - central
  ESP: [-4, 40],    // Spain - Madrid
  FRA: [2, 47],     // France - Paris
  GBR: [-0.1, 51.5], // UK - London
};

/**
 * Get route origin with directional offset from hub
 * This ensures routes going to the same region start from similar points
 */
function getRouteOrigin(
  countryId: string,
  direction: 'north' | 'east' | 'south' | 'west' | 'northeast' | 'northwest' | 'center',
  type: RouteType
): [number, number] {
  const hub = COUNTRY_HUBS[countryId] || [0, 0];

  // Small offset based on direction and route type
  const typeOffset = type === 'land' ? 0 : type === 'maritime' ? 0.5 : 1;
  const offset = 1.5;

  switch (direction) {
    case 'north':
      return [hub[0], hub[1] + offset + typeOffset];
    case 'south':
      return [hub[0], hub[1] - offset - typeOffset];
    case 'east':
      return [hub[0] + offset + typeOffset, hub[1]];
    case 'west':
      return [hub[0] - offset - typeOffset, hub[1]];
    case 'northeast':
      return [hub[0] + offset, hub[1] + offset + typeOffset];
    case 'northwest':
      return [hub[0] - offset, hub[1] + offset + typeOffset];
    case 'center':
    default:
      return hub;
  }
}

/**
 * Trafficking routes - consolidated with hub-based origins
 */
export const TRAFFICKING_ROUTES: TraffickingRoute[] = [
  // ============================================
  // LAND ROUTES (Green) - Overland trafficking
  // ============================================

  // Colombia corridor - all start from Colombia hub
  {
    id: 'land-col-pan',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'northwest', 'land') },
    to: { countryId: 'PAN', coordinates: COUNTRY_HUBS.PAN },
    type: 'land',
    volume: 'high',
    description: 'Colombia to Panama via Darien Gap',
  },
  {
    id: 'land-col-ven',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'east', 'land') },
    to: { countryId: 'VEN', coordinates: COUNTRY_HUBS.VEN },
    type: 'land',
    volume: 'high',
  },
  {
    id: 'land-col-ecu',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'south', 'land') },
    to: { countryId: 'ECU', coordinates: COUNTRY_HUBS.ECU },
    type: 'land',
    volume: 'medium',
  },

  // Central America corridor
  {
    id: 'land-pan-cri',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'northwest', 'land') },
    to: { countryId: 'CRI', coordinates: COUNTRY_HUBS.CRI },
    type: 'land',
    volume: 'high',
  },
  {
    id: 'land-gtm-mex',
    from: { countryId: 'GTM', coordinates: getRouteOrigin('GTM', 'north', 'land') },
    to: { countryId: 'MEX', coordinates: [-92, 17] },
    type: 'land',
    volume: 'high',
  },
  {
    id: 'land-mex-usa',
    from: { countryId: 'MEX', coordinates: getRouteOrigin('MEX', 'north', 'land') },
    to: { countryId: 'USA', coordinates: [-100, 32] },
    type: 'land',
    volume: 'high',
    description: 'Mexico-US border crossing',
  },

  // Bolivia/Peru corridor
  {
    id: 'land-per-bol',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'east', 'land') },
    to: { countryId: 'BOL', coordinates: COUNTRY_HUBS.BOL },
    type: 'land',
    volume: 'medium',
  },
  {
    id: 'land-bol-bra',
    from: { countryId: 'BOL', coordinates: getRouteOrigin('BOL', 'east', 'land') },
    to: { countryId: 'BRA', coordinates: [-55, -12] },
    type: 'land',
    volume: 'medium',
  },

  // ============================================
  // MARITIME ROUTES (Blue) - Sea trafficking
  // ============================================

  // Caribbean corridor - Colombia hub going north
  {
    id: 'sea-col-dom',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'north', 'maritime') },
    to: { countryId: 'DOM', coordinates: COUNTRY_HUBS.DOM },
    type: 'maritime',
    volume: 'high',
    description: 'Colombia to Caribbean',
  },
  {
    id: 'sea-col-usa-florida',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'north', 'maritime') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'high',
    description: 'Direct route to Florida',
  },

  // Pacific corridor - Colombia/Ecuador west coast
  {
    id: 'sea-col-mex-pacific',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'west', 'maritime') },
    to: { countryId: 'MEX', coordinates: [-105, 20] },
    type: 'maritime',
    volume: 'high',
    description: 'Pacific route',
  },
  {
    id: 'sea-ecu-mex',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'MEX', coordinates: [-106, 22] },
    type: 'maritime',
    volume: 'medium',
  },

  // Venezuela routes
  {
    id: 'sea-ven-dom',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'north', 'maritime') },
    to: { countryId: 'DOM', coordinates: [-69, 18] },
    type: 'maritime',
    volume: 'medium',
  },

  // Trans-Atlantic to Europe
  {
    id: 'sea-bra-esp',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'high',
    description: 'Brazil to Europe via Atlantic',
  },
  {
    id: 'sea-ven-esp',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'northeast', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'medium',
  },

  // ============================================
  // AIR ROUTES (Red) - Air trafficking
  // ============================================

  // Colombia to Europe - all from same hub area
  {
    id: 'air-col-esp',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'high',
    description: 'Colombia to Spain',
  },
  {
    id: 'air-col-fra',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'northeast', 'air') },
    to: { countryId: 'FRA', coordinates: COUNTRY_HUBS.FRA },
    type: 'air',
    volume: 'medium',
  },
  {
    id: 'air-col-usa',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'air',
    volume: 'high',
  },

  // Brazil to Europe
  {
    id: 'air-bra-esp',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'high',
  },
  {
    id: 'air-bra-gbr',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'northeast', 'air') },
    to: { countryId: 'GBR', coordinates: COUNTRY_HUBS.GBR },
    type: 'air',
    volume: 'medium',
    description: 'Brazil to UK',
  },

  // Peru to Europe
  {
    id: 'air-per-esp',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'medium',
  },

  // Mexico to USA
  {
    id: 'air-mex-usa',
    from: { countryId: 'MEX', coordinates: getRouteOrigin('MEX', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-96, 33] },
    type: 'air',
    volume: 'medium',
  },
];

/**
 * Get routes filtered by type
 */
export function getRoutesByType(types: RouteType[]): TraffickingRoute[] {
  return TRAFFICKING_ROUTES.filter((route) => types.includes(route.type));
}

/**
 * Get routes for a specific country (as origin or destination)
 */
export function getRoutesForCountry(countryId: string): TraffickingRoute[] {
  return TRAFFICKING_ROUTES.filter(
    (route) =>
      route.from.countryId === countryId || route.to.countryId === countryId
  );
}
