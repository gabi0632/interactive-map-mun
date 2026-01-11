'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSourceCountryOptions, ROUTE_COUNTRY_NAMES } from '@/data/routes';

interface CountryFilterProps {
  selectedCountries: string[];
  onSelectionChange: (countries: string[]) => void;
  maxSelection?: number;
}

/**
 * Country flag emoji lookup (ISO alpha-3 to flag emoji)
 */
const getCountryFlag = (code: string): string => {
  const flagMap: Record<string, string> = {
    COL: '\u{1F1E8}\u{1F1F4}', // Colombia
    BRA: '\u{1F1E7}\u{1F1F7}', // Brazil
    VEN: '\u{1F1FB}\u{1F1EA}', // Venezuela
    PER: '\u{1F1F5}\u{1F1EA}', // Peru
    ECU: '\u{1F1EA}\u{1F1E8}', // Ecuador
    BOL: '\u{1F1E7}\u{1F1F4}', // Bolivia
    ARG: '\u{1F1E6}\u{1F1F7}', // Argentina
    CHL: '\u{1F1E8}\u{1F1F1}', // Chile
    MEX: '\u{1F1F2}\u{1F1FD}', // Mexico
    PAN: '\u{1F1F5}\u{1F1E6}', // Panama
    CRI: '\u{1F1E8}\u{1F1F7}', // Costa Rica
    GTM: '\u{1F1EC}\u{1F1F9}', // Guatemala
    HND: '\u{1F1ED}\u{1F1F3}', // Honduras
    SLV: '\u{1F1F8}\u{1F1FB}', // El Salvador
    DOM: '\u{1F1E9}\u{1F1F4}', // Dominican Republic
    GUF: '\u{1F1EC}\u{1F1EB}', // French Guiana
  };
  return flagMap[code] || '\u{1F3F3}'; // Default white flag
};

/**
 * CountryFilter Component
 *
 * A filter UI for selecting source countries to display routes for.
 * Shows selected countries as chips with remove buttons, and a dropdown to add more.
 */
export const CountryFilter: React.FC<CountryFilterProps> = ({
  selectedCountries,
  onSelectionChange,
  maxSelection = 4,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get available options (not already selected)
  const allOptions = getSourceCountryOptions();
  const availableOptions = allOptions.filter(
    (opt) => !selectedCountries.includes(opt.code)
  );

  const canAddMore = selectedCountries.length < maxSelection;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemove = (code: string) => {
    onSelectionChange(selectedCountries.filter((c) => c !== code));
  };

  const handleAdd = (code: string) => {
    if (canAddMore) {
      onSelectionChange([...selectedCountries, code]);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Selected countries as chips */}
      {selectedCountries.map((code) => (
        <div
          key={code}
          className="flex items-center gap-1 bg-slate-800/90 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-slate-600/50"
        >
          <span className="text-xs sm:text-sm">{getCountryFlag(code)}</span>
          <span className="font-medium hidden sm:inline">
            {ROUTE_COUNTRY_NAMES[code]}
          </span>
          <span className="font-medium sm:hidden">
            {code}
          </span>
          <button
            onClick={() => handleRemove(code)}
            className="ml-0.5 p-0.5 hover:bg-slate-600/50 rounded transition-colors"
            aria-label={`Remove ${ROUTE_COUNTRY_NAMES[code]}`}
          >
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
      ))}

      {/* Add button with dropdown */}
      {canAddMore && availableOptions.length > 0 && (
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all',
              'bg-blue-600/90 hover:bg-blue-500/90 text-white border border-blue-500/50'
            )}
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Add</span>
            <ChevronDown
              className={cn(
                'w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 mt-1 bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-xl z-50 min-w-[160px] max-h-[240px] overflow-y-auto"
            >
              <div className="p-1">
                {availableOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => handleAdd(opt.code)}
                    className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs text-white/90 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{getCountryFlag(opt.code)}</span>
                      <span>{opt.name}</span>
                    </div>
                    <span className="text-[10px] text-white/50">
                      ({opt.routeCount})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Max selection indicator */}
      {!canAddMore && (
        <span className="text-[9px] sm:text-[10px] text-white/40 ml-1">
          Max {maxSelection}
        </span>
      )}
    </div>
  );
};
