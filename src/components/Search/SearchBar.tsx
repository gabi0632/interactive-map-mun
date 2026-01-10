'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter countries based on query
  const searchCountries = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.toLowerCase().trim();

    return allCountries
      .filter((country) => {
        const nameMatch = country.name.toLowerCase().includes(normalizedQuery);
        const idMatch = country.id.toLowerCase().includes(normalizedQuery);
        const capitalMatch = country.capital?.toLowerCase().includes(normalizedQuery);
        return nameMatch || idMatch || capitalMatch;
      })
      .map((country) => ({
        id: country.id,
        name: country.name,
        flag: country.flag,
        role: country.role,
      }))
      .slice(0, 8); // Limit to 8 results
  }, []);

  // Update results when query changes
  useEffect(() => {
    const searchResults = searchCountries(query);
    setResults(searchResults);
    setSelectedIndex(0);
    setIsOpen(searchResults.length > 0);
  }, [query, searchCountries]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        event.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex].id);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (countryId: string) => {
    onSelectCountry(countryId);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
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
          <Search className="w-4 h-4 text-white/40" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search countries..."
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50">
          <div className="py-1">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result.id)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  'w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors',
                  index === selectedIndex
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                )}
              >
                <span className="text-xl">{result.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">
                    {result.name}
                  </div>
                  <div className={cn('text-[10px] uppercase tracking-wider', getRoleColor(result.role))}>
                    {result.role}
                  </div>
                </div>
                <span className="text-xs text-white/30 font-mono">{result.id}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 text-sm text-white/50 text-center">
            No countries found
          </div>
        </div>
      )}
    </div>
  );
};
