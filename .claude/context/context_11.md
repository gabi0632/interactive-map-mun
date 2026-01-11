# Context #11

**Created**: 2026-01-11
**Task**: Fix mobile route visibility on zoom
**Branch**: fix/MUN-mobile-filter-zoom
**Continues from**: Context #10 (completed)

## Problem

After zooming on mobile, drug trafficking routes were disappearing. The `isRouteVisible` function in `TrafficRoutes.tsx` was hiding low/medium volume routes at higher zoom levels:
- zoom > 1.5: hide low volume routes
- zoom > 2.5: hide medium+low volume routes (only show high)

This was confusing on mobile where users zoom in more easily.

## Solution

Modified `isRouteVisible` function to always return `true`, keeping all routes visible regardless of zoom level. Users can still filter routes by country selection.

## Files Changed

| File | Action |
|------|--------|
| `src/components/Map/TrafficRoutes.tsx` | Modified - routes always visible at all zoom levels |

## Testing

- [x] Mobile: Routes stay visible when zooming
- [x] Mobile: Country filter dropdown works correctly
- [x] Desktop: Routes stay visible when zooming
- [x] Desktop: Country filter dropdown works correctly
- [x] No console errors

## Code Review

- Fixed High issue: Removed dead `isRouteVisible` function
- Updated comments to reflect current behavior
- PR ready for merge

## Status: COMPLETED
