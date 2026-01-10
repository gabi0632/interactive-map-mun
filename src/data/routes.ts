/**
 * Drug Trafficking Routes Data
 *
 * Defines trafficking routes between countries for visualization on the map.
 * Routes are categorized by type (land, maritime, air) and volume.
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
 * Trafficking routes based on UNODC data and reference image
 * Major cocaine trafficking corridors from Latin America
 */
export const TRAFFICKING_ROUTES: TraffickingRoute[] = [
  // ============================================
  // LAND ROUTES (Green) - Overland trafficking
  // ============================================

  // Colombia to Central America corridor
  {
    id: 'land-col-pan',
    from: { countryId: 'COL', coordinates: [-77, 7] },
    to: { countryId: 'PAN', coordinates: [-80, 9] },
    type: 'land',
    volume: 'high',
    description: 'Colombia to Panama via Darien Gap',
  },
  {
    id: 'land-pan-cri',
    from: { countryId: 'PAN', coordinates: [-80, 9] },
    to: { countryId: 'CRI', coordinates: [-84, 10] },
    type: 'land',
    volume: 'high',
  },
  {
    id: 'land-gtm-mex',
    from: { countryId: 'GTM', coordinates: [-90, 15] },
    to: { countryId: 'MEX', coordinates: [-92, 17] },
    type: 'land',
    volume: 'high',
    description: 'Guatemala to Mexico border crossing',
  },
  {
    id: 'land-mex-usa',
    from: { countryId: 'MEX', coordinates: [-103, 25] },
    to: { countryId: 'USA', coordinates: [-106, 32] },
    type: 'land',
    volume: 'high',
    description: 'Mexico-US border crossing',
  },

  // Bolivia/Peru corridor
  {
    id: 'land-bol-bra',
    from: { countryId: 'BOL', coordinates: [-63, -17] },
    to: { countryId: 'BRA', coordinates: [-58, -15] },
    type: 'land',
    volume: 'medium',
  },
  {
    id: 'land-per-bol',
    from: { countryId: 'PER', coordinates: [-70, -15] },
    to: { countryId: 'BOL', coordinates: [-68, -16] },
    type: 'land',
    volume: 'medium',
  },

  // Colombia internal routes
  {
    id: 'land-col-ven',
    from: { countryId: 'COL', coordinates: [-72, 8] },
    to: { countryId: 'VEN', coordinates: [-68, 9] },
    type: 'land',
    volume: 'high',
  },
  {
    id: 'land-col-ecu',
    from: { countryId: 'COL', coordinates: [-77, 1] },
    to: { countryId: 'ECU', coordinates: [-79, 0] },
    type: 'land',
    volume: 'medium',
  },

  // ============================================
  // MARITIME ROUTES (Blue) - Sea trafficking
  // ============================================

  // Caribbean corridor
  {
    id: 'sea-col-dom',
    from: { countryId: 'COL', coordinates: [-75, 11] },
    to: { countryId: 'DOM', coordinates: [-70, 19] },
    type: 'maritime',
    volume: 'high',
    description: 'Colombia to Caribbean islands',
  },
  {
    id: 'sea-ven-dom',
    from: { countryId: 'VEN', coordinates: [-67, 11] },
    to: { countryId: 'DOM', coordinates: [-69, 18] },
    type: 'maritime',
    volume: 'medium',
  },

  // Pacific corridor to Mexico
  {
    id: 'sea-col-mex-pacific',
    from: { countryId: 'COL', coordinates: [-78, 4] },
    to: { countryId: 'MEX', coordinates: [-105, 20] },
    type: 'maritime',
    volume: 'high',
    description: 'Pacific route Colombia to Mexico',
  },
  {
    id: 'sea-ecu-mex',
    from: { countryId: 'ECU', coordinates: [-81, -1] },
    to: { countryId: 'MEX', coordinates: [-106, 22] },
    type: 'maritime',
    volume: 'medium',
  },

  // To USA directly
  {
    id: 'sea-col-usa-florida',
    from: { countryId: 'COL', coordinates: [-76, 10] },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'high',
    description: 'Direct route to Florida',
  },

  // Trans-Atlantic to Europe
  {
    id: 'sea-bra-eur',
    from: { countryId: 'BRA', coordinates: [-35, -8] },
    to: { countryId: 'ESP', coordinates: [-8, 38] },
    type: 'maritime',
    volume: 'high',
    description: 'Brazil to Europe via Atlantic',
  },
  {
    id: 'sea-ven-eur',
    from: { countryId: 'VEN', coordinates: [-65, 11] },
    to: { countryId: 'ESP', coordinates: [-6, 37] },
    type: 'maritime',
    volume: 'medium',
  },

  // ============================================
  // AIR ROUTES (Red) - Air trafficking
  // ============================================

  // Direct to Europe
  {
    id: 'air-col-esp',
    from: { countryId: 'COL', coordinates: [-74, 5] },
    to: { countryId: 'ESP', coordinates: [-4, 40] },
    type: 'air',
    volume: 'high',
    description: 'Direct flights Colombia to Spain',
  },
  {
    id: 'air-bra-esp',
    from: { countryId: 'BRA', coordinates: [-47, -16] },
    to: { countryId: 'ESP', coordinates: [-3, 40] },
    type: 'air',
    volume: 'high',
  },
  {
    id: 'air-col-fra',
    from: { countryId: 'COL', coordinates: [-74, 5] },
    to: { countryId: 'FRA', coordinates: [2, 48] },
    type: 'air',
    volume: 'medium',
  },
  {
    id: 'air-per-esp',
    from: { countryId: 'PER', coordinates: [-77, -12] },
    to: { countryId: 'ESP', coordinates: [-4, 40] },
    type: 'air',
    volume: 'medium',
  },

  // To USA
  {
    id: 'air-col-usa',
    from: { countryId: 'COL', coordinates: [-74, 5] },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'air',
    volume: 'high',
  },
  {
    id: 'air-mex-usa',
    from: { countryId: 'MEX', coordinates: [-99, 19] },
    to: { countryId: 'USA', coordinates: [-96, 33] },
    type: 'air',
    volume: 'medium',
  },

  // Africa hub (transit to Europe)
  {
    id: 'air-bra-gbr',
    from: { countryId: 'BRA', coordinates: [-43, -23] },
    to: { countryId: 'GBR', coordinates: [0, 51] },
    type: 'air',
    volume: 'medium',
    description: 'Brazil to UK',
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
