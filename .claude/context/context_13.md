# Context #13

**Created**: 2026-01-13
**Task**: Fix mismatch between country data shown in search results vs map click - both should use the same component

## Progress
- [x] Investigate search component and how it displays country data
- [x] Investigate map click handler and country panel component
- [x] Identify the discrepancy between the two
- [x] Fix search to use the same component as map click
- [x] Commit and push fix

## Sub-agent Updates
(Updates from sub-agents will be logged here)

## Decisions Made

1. **Root cause identified**: The SearchBar component had a problematic `useEffect` that was calling `setState` synchronously during effects, which could cause timing issues and cascading renders when opening the country panel.

2. **Fixes applied**:
   - Refactored SearchBar to use derived state (`isOpen` computed from `isFocused`, `results`, and `query`) instead of managing it via useEffect
   - Changed the order in `handleSelect` to close dropdown BEFORE triggering the country selection callback, ensuring the panel opens cleanly
   - Added missing country centers (Uruguay, Netherlands, Belgium, French Guiana) to ensure consistent zoom behavior
   - Updated `handleSearchSelect` in page.tsx to defer map re-render using `requestAnimationFrame`, ensuring panel opens first

## Notes
- User reported visual mismatch between search results and map click for Brazil
- Both code paths use the same CountryPanel component and same data source (getCountryById)
- The issue was likely caused by timing/rendering issues, not different components or data
- SearchBar now has cleaner state management without the lint error about setState in useEffect

## Files Changed
- `src/app/page.tsx` - Reordered state updates in handleSearchSelect
- `src/components/Search/SearchBar.tsx` - Refactored state management
- `src/data/countryCenters.ts` - Added missing country centers

## Status: COMPLETED
