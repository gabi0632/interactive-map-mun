'use client';

import { useState } from 'react';
import { ChevronDown, Calendar, ExternalLink } from 'lucide-react';
import type { UNODCProgram } from '@/types';
import { cn } from '@/lib/utils';

interface CountryProgramsProps {
  programs: UNODCProgram[];
}

/**
 * Individual program card with expandable details
 */
function ProgramCard({ program }: { program: UNODCProgram }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        'group rounded-xl border transition-all duration-300',
        'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20',
        'border-blue-200/60 dark:border-blue-800/50',
        'hover:border-blue-300 dark:hover:border-blue-700',
        'hover:shadow-md hover:shadow-blue-500/10',
        isExpanded && 'border-blue-300 dark:border-blue-600'
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left"
      >
        {/* UNODC Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center border border-blue-600/20 dark:border-blue-400/30">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
            UN
          </span>
        </div>

        {/* Program name and year */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors truncate">
            {program.name}
          </h4>
          {program.startYear && (
            <div className="flex items-center gap-1 mt-0.5 text-xs text-blue-600/70 dark:text-blue-400/70">
              <Calendar className="w-3 h-3" />
              <span>Since {program.startYear}</span>
            </div>
          )}
        </div>

        {/* Expand indicator */}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-blue-400 dark:text-blue-500 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 pt-0">
          {/* Divider */}
          <div className="h-px bg-blue-200/50 dark:bg-blue-700/50 mb-3" />

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {program.description}
          </p>

          {/* Optional link placeholder */}
          <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer">
            <ExternalLink className="w-3 h-3" />
            <span>Learn more about this program</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CountryPrograms Component
 *
 * Displays UNODC programs as interactive, expandable cards.
 * Designed for student engagement with clear visual hierarchy.
 */
export function CountryPrograms({ programs }: CountryProgramsProps) {
  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Section header with UNODC branding */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">UN</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          UNODC Programs
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({programs.length})
        </span>
      </div>

      {/* Program cards */}
      <div className="flex flex-col gap-2">
        {programs.map((program) => (
          <ProgramCard key={program.name} program={program} />
        ))}
      </div>
    </div>
  );
}
