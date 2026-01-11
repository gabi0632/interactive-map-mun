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

  // South America Transit/Mixed
  VEN: [-67, 8],    // Venezuela
  ECU: [-79, -1],   // Ecuador
  BRA: [-47, -15],  // Brazil - central
  ARG: [-58, -34],  // Argentina - Buenos Aires area
  CHL: [-70.5, -33], // Chile - Santiago area
  PRY: [-57.5, -25], // Paraguay - Asuncion
  GUF: [-52, 5],    // French Guiana - Cayenne
  SUR: [-55, 5.8],  // Suriname - Paramaribo

  // Central America Transit
  PAN: [-79.5, 9],  // Panama
  CRI: [-84, 10],   // Costa Rica
  GTM: [-90.5, 14.5], // Guatemala
  HND: [-87, 14.5],  // Honduras - Tegucigalpa
  SLV: [-89, 13.7],  // El Salvador - San Salvador
  MEX: [-99, 19],   // Mexico - Mexico City

  // Caribbean
  DOM: [-70, 19],   // Dominican Republic
  PRI: [-66, 18.4], // Puerto Rico

  // North America Consumer Markets
  USA: [-95, 38],   // USA - central
  CAN: [-75, 45],   // Canada - Ottawa area

  // European Consumer Markets
  ESP: [-4, 40],    // Spain - Madrid
  FRA: [2, 47],     // France - Paris
  GBR: [-0.1, 51.5], // UK - London
  NLD: [5, 52.5],   // Netherlands - Amsterdam/Rotterdam
  BEL: [4.3, 50.8], // Belgium - Brussels/Antwerp
  DEU: [10, 51],    // Germany - central
  ITA: [12.5, 42],  // Italy - Rome
  PRT: [-9, 38.7],  // Portugal - Lisbon
  AUT: [16.3, 48.2], // Austria - Vienna

  // Africa
  AGO: [13.2, -8.8], // Angola - Luanda
  NGA: [7.5, 9],    // Nigeria - Abuja

  // Asia-Pacific
  CHN: [116.4, 39.9], // China - Beijing
  JPN: [139.7, 35.7], // Japan - Tokyo
  AUS: [151, -34],  // Australia - Sydney
  NZL: [174.8, -41], // New Zealand - Wellington
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

  // ============================================
  // ADDITIONAL ROUTES - Brazil Export Routes
  // ============================================

  // Brazil to Netherlands (major European hub)
  {
    id: 'sea-bra-nld',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'high',
    description: 'Brazil to Rotterdam - major cocaine entry point',
  },
  {
    id: 'air-bra-nld',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'northeast', 'air') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'air',
    volume: 'medium',
  },

  // Brazil to Belgium (Antwerp port)
  {
    id: 'sea-bra-bel',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'maritime',
    volume: 'high',
    description: 'Brazil to Antwerp - major European port',
  },

  // Brazil to Portugal
  {
    id: 'sea-bra-prt',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'PRT', coordinates: COUNTRY_HUBS.PRT },
    type: 'maritime',
    volume: 'medium',
    description: 'Brazil to Portugal - historic trade route',
  },

  // Brazil to Italy
  {
    id: 'sea-bra-ita',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'ITA', coordinates: COUNTRY_HUBS.ITA },
    type: 'maritime',
    volume: 'medium',
    description: 'Brazil to Italy - Ndrangheta connection',
  },

  // Brazil to West Africa (Angola, Nigeria)
  {
    id: 'sea-bra-ago',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'AGO', coordinates: COUNTRY_HUBS.AGO },
    type: 'maritime',
    volume: 'medium',
    description: 'Brazil to Angola - Africa transit route',
  },
  {
    id: 'sea-bra-nga',
    from: { countryId: 'BRA', coordinates: getRouteOrigin('BRA', 'east', 'maritime') },
    to: { countryId: 'NGA', coordinates: COUNTRY_HUBS.NGA },
    type: 'maritime',
    volume: 'medium',
    description: 'Brazil to Nigeria - West Africa hub',
  },

  // ============================================
  // Peru Export Routes
  // ============================================

  // Peru to Brazil
  {
    id: 'land-per-bra',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'east', 'land') },
    to: { countryId: 'BRA', coordinates: [-70, -10] },
    type: 'land',
    volume: 'high',
    description: 'Peru to Brazil via Amazon',
  },

  // Peru to Ecuador
  {
    id: 'land-per-ecu',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'north', 'land') },
    to: { countryId: 'ECU', coordinates: COUNTRY_HUBS.ECU },
    type: 'land',
    volume: 'medium',
  },

  // Peru to Colombia
  {
    id: 'land-per-col',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'north', 'land') },
    to: { countryId: 'COL', coordinates: [-74, -2] },
    type: 'land',
    volume: 'medium',
  },

  // Peru to Belgium/Netherlands
  {
    id: 'air-per-bel',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'northeast', 'air') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'air',
    volume: 'medium',
  },
  {
    id: 'air-per-nld',
    from: { countryId: 'PER', coordinates: getRouteOrigin('PER', 'northeast', 'air') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'air',
    volume: 'medium',
  },

  // ============================================
  // Bolivia Export Routes
  // ============================================

  // Bolivia to Argentina
  {
    id: 'land-bol-arg',
    from: { countryId: 'BOL', coordinates: getRouteOrigin('BOL', 'south', 'land') },
    to: { countryId: 'ARG', coordinates: [-65, -24] },
    type: 'land',
    volume: 'high',
    description: 'Bolivia to Argentina via northern border',
  },

  // Bolivia to Paraguay
  {
    id: 'land-bol-pry',
    from: { countryId: 'BOL', coordinates: getRouteOrigin('BOL', 'south', 'land') },
    to: { countryId: 'PRY', coordinates: COUNTRY_HUBS.PRY },
    type: 'land',
    volume: 'medium',
    description: 'Bolivia to Paraguay - Chaco route',
  },

  // Bolivia to Chile
  {
    id: 'land-bol-chl',
    from: { countryId: 'BOL', coordinates: getRouteOrigin('BOL', 'west', 'land') },
    to: { countryId: 'CHL', coordinates: [-70, -23] },
    type: 'land',
    volume: 'medium',
    description: 'Bolivia to Chile via northern border',
  },

  // ============================================
  // Colombia Additional Routes
  // ============================================

  // Colombia to Brazil
  {
    id: 'land-col-bra',
    from: { countryId: 'COL', coordinates: getRouteOrigin('COL', 'south', 'land') },
    to: { countryId: 'BRA', coordinates: [-70, -3] },
    type: 'land',
    volume: 'medium',
    description: 'Colombia to Brazil via Amazon',
  },

  // ============================================
  // Venezuela Additional Routes
  // ============================================

  // Venezuela to USA
  {
    id: 'sea-ven-usa',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'north', 'maritime') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'medium',
    description: 'Venezuela to Florida',
  },

  // Venezuela to Netherlands
  {
    id: 'air-ven-nld',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'northeast', 'air') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'air',
    volume: 'medium',
  },

  // Venezuela to Brazil
  {
    id: 'land-ven-bra',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'south', 'land') },
    to: { countryId: 'BRA', coordinates: [-62, 2] },
    type: 'land',
    volume: 'medium',
    description: 'Venezuela to Brazil via southern border',
  },

  // Venezuela to Canada
  {
    id: 'air-ven-can',
    from: { countryId: 'VEN', coordinates: getRouteOrigin('VEN', 'north', 'air') },
    to: { countryId: 'CAN', coordinates: COUNTRY_HUBS.CAN },
    type: 'air',
    volume: 'low',
  },

  // ============================================
  // Ecuador Export Routes to Europe
  // ============================================

  // Ecuador to Belgium
  {
    id: 'sea-ecu-bel',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'maritime',
    volume: 'high',
    description: 'Ecuador to Antwerp - major route',
  },

  // Ecuador to Netherlands
  {
    id: 'sea-ecu-nld',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'high',
    description: 'Ecuador to Rotterdam',
  },

  // Ecuador to Germany
  {
    id: 'sea-ecu-deu',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'DEU', coordinates: [10, 53.5] },
    type: 'maritime',
    volume: 'medium',
    description: 'Ecuador to Hamburg',
  },

  // Ecuador to Spain
  {
    id: 'sea-ecu-esp',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'medium',
  },

  // Ecuador to UK
  {
    id: 'sea-ecu-gbr',
    from: { countryId: 'ECU', coordinates: getRouteOrigin('ECU', 'west', 'maritime') },
    to: { countryId: 'GBR', coordinates: COUNTRY_HUBS.GBR },
    type: 'maritime',
    volume: 'medium',
  },

  // ============================================
  // Argentina Export Routes
  // ============================================

  // Argentina to Spain
  {
    id: 'sea-arg-esp',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'east', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'high',
    description: 'Argentina to Spain - primary route',
  },
  {
    id: 'air-arg-esp',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'medium',
  },

  // Argentina to Italy
  {
    id: 'sea-arg-ita',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'east', 'maritime') },
    to: { countryId: 'ITA', coordinates: COUNTRY_HUBS.ITA },
    type: 'maritime',
    volume: 'medium',
  },

  // Argentina to Netherlands
  {
    id: 'sea-arg-nld',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'east', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'medium',
  },

  // Argentina to Belgium
  {
    id: 'sea-arg-bel',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'east', 'maritime') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'maritime',
    volume: 'medium',
  },

  // Argentina to UK
  {
    id: 'air-arg-gbr',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'northeast', 'air') },
    to: { countryId: 'GBR', coordinates: COUNTRY_HUBS.GBR },
    type: 'air',
    volume: 'low',
  },

  // Argentina to France
  {
    id: 'air-arg-fra',
    from: { countryId: 'ARG', coordinates: getRouteOrigin('ARG', 'northeast', 'air') },
    to: { countryId: 'FRA', coordinates: COUNTRY_HUBS.FRA },
    type: 'air',
    volume: 'low',
  },

  // ============================================
  // Chile Export Routes
  // ============================================

  // Chile to USA
  {
    id: 'sea-chl-usa',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'USA', coordinates: [-118, 34] },
    type: 'maritime',
    volume: 'medium',
    description: 'Chile to US West Coast',
  },

  // Chile to Spain
  {
    id: 'air-chl-esp',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'medium',
  },

  // Chile to Netherlands
  {
    id: 'sea-chl-nld',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'medium',
  },

  // Chile to Australia
  {
    id: 'sea-chl-aus',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'AUS', coordinates: COUNTRY_HUBS.AUS },
    type: 'maritime',
    volume: 'low',
    description: 'Chile to Australia - Pacific route',
  },

  // Chile to New Zealand
  {
    id: 'sea-chl-nzl',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'NZL', coordinates: COUNTRY_HUBS.NZL },
    type: 'maritime',
    volume: 'low',
  },

  // Chile to China
  {
    id: 'sea-chl-chn',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'CHN', coordinates: [121, 31] },
    type: 'maritime',
    volume: 'low',
    description: 'Chile to China - trans-Pacific',
  },

  // Chile to Japan
  {
    id: 'sea-chl-jpn',
    from: { countryId: 'CHL', coordinates: getRouteOrigin('CHL', 'west', 'maritime') },
    to: { countryId: 'JPN', coordinates: COUNTRY_HUBS.JPN },
    type: 'maritime',
    volume: 'low',
  },

  // ============================================
  // Mexico Additional Routes
  // ============================================

  // Mexico to Canada
  {
    id: 'land-mex-can',
    from: { countryId: 'MEX', coordinates: getRouteOrigin('MEX', 'north', 'land') },
    to: { countryId: 'CAN', coordinates: COUNTRY_HUBS.CAN },
    type: 'land',
    volume: 'medium',
    description: 'Mexico to Canada via US corridor',
  },

  // ============================================
  // Central America Transit Routes
  // ============================================

  // Honduras routes
  {
    id: 'land-hnd-gtm',
    from: { countryId: 'HND', coordinates: getRouteOrigin('HND', 'west', 'land') },
    to: { countryId: 'GTM', coordinates: COUNTRY_HUBS.GTM },
    type: 'land',
    volume: 'high',
    description: 'Honduras to Guatemala corridor',
  },
  {
    id: 'land-hnd-mex',
    from: { countryId: 'HND', coordinates: getRouteOrigin('HND', 'northwest', 'land') },
    to: { countryId: 'MEX', coordinates: [-92, 17] },
    type: 'land',
    volume: 'medium',
  },
  {
    id: 'air-hnd-usa',
    from: { countryId: 'HND', coordinates: getRouteOrigin('HND', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-90, 30] },
    type: 'air',
    volume: 'medium',
  },

  // El Salvador routes
  {
    id: 'land-slv-gtm',
    from: { countryId: 'SLV', coordinates: getRouteOrigin('SLV', 'west', 'land') },
    to: { countryId: 'GTM', coordinates: COUNTRY_HUBS.GTM },
    type: 'land',
    volume: 'medium',
  },
  {
    id: 'land-slv-mex',
    from: { countryId: 'SLV', coordinates: getRouteOrigin('SLV', 'northwest', 'land') },
    to: { countryId: 'MEX', coordinates: [-92, 17] },
    type: 'land',
    volume: 'low',
  },
  {
    id: 'air-slv-usa',
    from: { countryId: 'SLV', coordinates: getRouteOrigin('SLV', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-90, 30] },
    type: 'air',
    volume: 'low',
  },

  // Guatemala to USA (air)
  {
    id: 'air-gtm-usa',
    from: { countryId: 'GTM', coordinates: getRouteOrigin('GTM', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-90, 30] },
    type: 'air',
    volume: 'medium',
  },

  // Costa Rica export routes
  {
    id: 'sea-cri-usa',
    from: { countryId: 'CRI', coordinates: getRouteOrigin('CRI', 'north', 'maritime') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'medium',
    description: 'Costa Rica to Florida',
  },
  {
    id: 'land-cri-mex',
    from: { countryId: 'CRI', coordinates: getRouteOrigin('CRI', 'north', 'land') },
    to: { countryId: 'MEX', coordinates: [-92, 17] },
    type: 'land',
    volume: 'medium',
  },
  {
    id: 'sea-cri-nld',
    from: { countryId: 'CRI', coordinates: getRouteOrigin('CRI', 'east', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'medium',
    description: 'Costa Rica to Netherlands',
  },
  {
    id: 'sea-cri-esp',
    from: { countryId: 'CRI', coordinates: getRouteOrigin('CRI', 'east', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'medium',
  },

  // Panama export routes
  {
    id: 'sea-pan-usa',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'north', 'maritime') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'high',
    description: 'Panama to USA via Caribbean',
  },
  {
    id: 'sea-pan-esp',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'east', 'maritime') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'maritime',
    volume: 'high',
    description: 'Panama to Spain',
  },
  {
    id: 'sea-pan-nld',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'east', 'maritime') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'maritime',
    volume: 'high',
    description: 'Panama to Rotterdam',
  },
  {
    id: 'sea-pan-bel',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'east', 'maritime') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'maritime',
    volume: 'high',
    description: 'Panama to Antwerp',
  },
  {
    id: 'sea-pan-ita',
    from: { countryId: 'PAN', coordinates: getRouteOrigin('PAN', 'east', 'maritime') },
    to: { countryId: 'ITA', coordinates: COUNTRY_HUBS.ITA },
    type: 'maritime',
    volume: 'medium',
  },

  // Dominican Republic export routes
  {
    id: 'sea-dom-usa',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'northwest', 'maritime') },
    to: { countryId: 'USA', coordinates: [-80, 26] },
    type: 'maritime',
    volume: 'high',
    description: 'Dominican Republic to Florida',
  },
  {
    id: 'air-dom-usa',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'north', 'air') },
    to: { countryId: 'USA', coordinates: [-74, 40] },
    type: 'air',
    volume: 'high',
    description: 'Dominican Republic to US East Coast',
  },
  {
    id: 'sea-dom-pri',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'east', 'maritime') },
    to: { countryId: 'PRI', coordinates: COUNTRY_HUBS.PRI },
    type: 'maritime',
    volume: 'medium',
    description: 'Dominican Republic to Puerto Rico',
  },
  {
    id: 'air-dom-esp',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'northeast', 'air') },
    to: { countryId: 'ESP', coordinates: COUNTRY_HUBS.ESP },
    type: 'air',
    volume: 'medium',
  },
  {
    id: 'air-dom-nld',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'northeast', 'air') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'air',
    volume: 'medium',
  },
  {
    id: 'air-dom-bel',
    from: { countryId: 'DOM', coordinates: getRouteOrigin('DOM', 'northeast', 'air') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'air',
    volume: 'low',
  },

  // ============================================
  // French Guiana Routes
  // ============================================

  // French Guiana to France (primary route)
  {
    id: 'air-guf-fra',
    from: { countryId: 'GUF', coordinates: getRouteOrigin('GUF', 'northeast', 'air') },
    to: { countryId: 'FRA', coordinates: COUNTRY_HUBS.FRA },
    type: 'air',
    volume: 'high',
    description: 'French Guiana to Paris - mule route',
  },

  // French Guiana to Netherlands
  {
    id: 'air-guf-nld',
    from: { countryId: 'GUF', coordinates: getRouteOrigin('GUF', 'northeast', 'air') },
    to: { countryId: 'NLD', coordinates: COUNTRY_HUBS.NLD },
    type: 'air',
    volume: 'medium',
  },

  // French Guiana to Belgium
  {
    id: 'air-guf-bel',
    from: { countryId: 'GUF', coordinates: getRouteOrigin('GUF', 'northeast', 'air') },
    to: { countryId: 'BEL', coordinates: COUNTRY_HUBS.BEL },
    type: 'air',
    volume: 'low',
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
