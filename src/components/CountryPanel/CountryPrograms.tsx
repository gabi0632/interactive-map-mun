'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UNODCProgram } from '@/types';

interface CountryProgramsProps {
  programs: UNODCProgram[];
}

/**
 * CountryPrograms Component
 * Displays active UNODC programs in the country
 */
export function CountryPrograms({ programs }: CountryProgramsProps) {
  // Don't render if no programs
  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        UNODC Programs
      </h3>
      <div className="flex flex-col gap-3">
        {programs.map((program) => (
          <Card
            key={program.name}
            className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-blue-900 dark:text-blue-100">
                  {program.name}
                </CardTitle>
                {program.startYear && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Since {program.startYear}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-700 dark:text-gray-300">
                {program.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
