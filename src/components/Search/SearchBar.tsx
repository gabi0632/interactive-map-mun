'use client';

/**
 * SearchBar Component
 *
 * SECURITY NOTE: This component assumes all country data is statically typed
 * and comes from trusted sources. If data source changes to user-generated
 * or external API, implement proper sanitization.
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { allCountries } from '@/data/countries';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSelectCountry: (countryId: string) => void;
  className?: string;
}

interface SearchResult {
  id: string;
  name: string;
  flag: string;
  role: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCountry,
  className,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive results from query using useMemo
  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();

    return allCountries
      .filter((country) => {
        const nameMatch = country.name.toLowerCase().includes(normalizedQuery);
        const idMatch = country.id.toLowerCase().includes(normalizedQuery);
        const capitalMatch = country.capital
          ? country.capital.toLowerCase().includes(normalizedQuery)
          : false;
        return nameMatch || idMatch || capitalMatch;
      })
      .map((country) => ({
        id: country.id,
        name: country.name,
        flag: country.flag,
        role: country.role,
      }))
      .slice(0, 8); // Limit to 8 results
  }, [query]);

  // Compute whether dropdown should be shown (derived state, no useEffect needed)
  const isOpen = isFocused && results.length > 0 && query.trim().length > 0;

  // Reset selectedIndex when results change - using useMemo to compute safely
  const safeSelectedIndex = useMemo(() => {
    if (selectedIndex >= results.length) {
      return 0;
    }
    return selectedIndex;
  }, [selectedIndex, results.length]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        if (!isOpen || results.length === 0) return;
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        if (!isOpen || results.length === 0) return;
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        if (!isOpen || results.length === 0) return;
        event.preventDefault();
        if (results[safeSelectedIndex]) {
          handleSelect(results[safeSelectedIndex].id);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setQuery('');
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (countryId: string) => {
    // Close dropdown and clear query before triggering the callback
    // This ensures the panel opens cleanly without interference
    setQuery('');
    setIsFocused(false);
    inputRef.current?.blur();
    // Trigger country selection callback - opens the same CountryPanel as map click
    onSelectCountry(countryId);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'producer':
        return 'text-red-400';
      case 'transit':
        return 'text-amber-400';
      case 'mixed':
        return 'text-purple-400';
      case 'consumer':
        return 'text-blue-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="w-4 h-4 text-white/40" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Don't blur immediately - allow click on dropdown items
            // The click outside handler will close the dropdown
          }}
          placeholder="Search countries..."
          aria-label="Search countries"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
          className={cn(
            'w-full pl-9 pr-9 py-2.5 rounded-xl',
            'bg-slate-900/95 backdrop-blur-md',
            'border border-white/10 focus:border-white/30',
            'text-sm text-white placeholder:text-white/40',
            'outline-none transition-all',
            'shadow-lg'
          )}
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
        >
          <div className="py-1">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result.id)}
                onMouseEnter={() => setSelectedIndex(index)}
                role="option"
                aria-selected={index === safeSelectedIndex}
                className={cn(
                  'w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors',
                  index === safeSelectedIndex
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                )}
              >
                <span className="text-xl" aria-hidden="true">{result.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">
                    {result.name}
                  </div>
                  <div className={cn('text-[10px] uppercase tracking-wider', getRoleColor(result.role))}>
                    {result.role}
                  </div>
                </div>
                <span className="text-xs text-white/30 font-mono" aria-hidden="true">{result.id}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query && results.length === 0 && (
        <div
          id="search-results"
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
        >
          <div className="px-4 py-3 text-sm text-white/50 text-center">
            No countries found
          </div>
        </div>
      )}
    </div>
  );
};
