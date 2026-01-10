'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CountryStats as CountryStatsType } from '@/types';

interface CountryStatsProps {
  stats: CountryStatsType;
}

interface StatItem {
  label: string;
  value: number;
  unit: string;
}

/**
 * CountryStats Component
 * Displays drug trafficking statistics in a grid layout
 */
export function CountryStats({ stats }: CountryStatsProps) {
  // Build array of stats that have values
  const statItems: StatItem[] = [];

  if (stats.cocaCultivation !== undefined) {
    statItems.push({
      label: 'Coca Cultivation',
      value: stats.cocaCultivation,
      unit: 'hectares',
    });
  }

  if (stats.cocaineProduction !== undefined) {
    statItems.push({
      label: 'Cocaine Production',
      value: stats.cocaineProduction,
      unit: 'metric tons',
    });
  }

  if (stats.seizures !== undefined) {
    statItems.push({
      label: 'Drug Seizures',
      value: stats.seizures,
      unit: 'kg/year',
    });
  }

  if (stats.eradicationEfforts !== undefined) {
    statItems.push({
      label: 'Eradication Efforts',
      value: stats.eradicationEfforts,
      unit: 'hectares',
    });
  }

  // If no stats available, don't render the section
  if (statItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Statistics
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item) => (
          <Card key={item.label} className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
                {item.value.toLocaleString('en-US')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.unit}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
