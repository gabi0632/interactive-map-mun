'use client';

import { useEffect, useState } from 'react';
import { Leaf, Factory, Scale, Trash2 } from 'lucide-react';
import type { CountryStats as CountryStatsType } from '@/types';
import { cn } from '@/lib/utils';

interface CountryStatsProps {
  stats: CountryStatsType;
}

interface StatItem {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  max: number; // Max value for gauge calculation
}

/**
 * Animated radial gauge for displaying statistics
 */
function StatGauge({
  value,
  max,
  color,
  size = 80,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate the gauge fill on mount
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((animatedValue / max) * 100, 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-gray-200 dark:text-gray-700"
      />
      {/* Animated progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-1000 ease-out"
        style={{
          filter: `drop-shadow(0 0 4px ${color}40)`,
        }}
      />
    </svg>
  );
}

/**
 * Format large numbers for display
 */
function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString('en-US');
}

/**
 * CountryStats Component
 *
 * Displays drug trafficking statistics with visual gauges and icons.
 * Designed for quick comprehension and visual impact.
 */
export function CountryStats({ stats }: CountryStatsProps) {
  const statItems: StatItem[] = [];

  // Define max values for gauge calculations (regional context)
  const maxValues = {
    cocaCultivation: 250000, // hectares (Colombia ~2023 levels)
    cocaineProduction: 2000, // metric tons
    seizures: 500000, // kg/year
    eradicationEfforts: 200000, // hectares
  };

  if (stats.cocaCultivation !== undefined) {
    statItems.push({
      label: 'Coca Cultivation',
      value: stats.cocaCultivation,
      unit: 'hectares',
      icon: <Leaf className="w-5 h-5" />,
      color: '#4A7C59', // Producer green
      max: maxValues.cocaCultivation,
    });
  }

  if (stats.cocaineProduction !== undefined) {
    statItems.push({
      label: 'Cocaine Production',
      value: stats.cocaineProduction,
      unit: 'metric tons',
      icon: <Factory className="w-5 h-5" />,
      color: '#C4A35A', // Mixed amber
      max: maxValues.cocaineProduction,
    });
  }

  if (stats.seizures !== undefined) {
    statItems.push({
      label: 'Drug Seizures',
      value: stats.seizures,
      unit: 'kg/year',
      icon: <Scale className="w-5 h-5" />,
      color: '#1E5F8A', // Maritime blue
      max: maxValues.seizures,
    });
  }

  if (stats.eradicationEfforts !== undefined) {
    statItems.push({
      label: 'Eradication',
      value: stats.eradicationEfforts,
      unit: 'hectares',
      icon: <Trash2 className="w-5 h-5" />,
      color: '#CD5C5C', // Consumer red
      max: maxValues.eradicationEfforts,
    });
  }

  if (statItems.length === 0) {
    return null;
  }

  // Determine if we should show the hero stat (first stat gets special treatment)
  const heroStat = statItems[0];
  const otherStats = statItems.slice(1);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Statistics
      </h3>

      {/* Hero stat with large gauge */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          {/* Large animated gauge */}
          <div className="relative flex-shrink-0">
            <StatGauge
              value={heroStat.value}
              max={heroStat.max}
              color={heroStat.color}
              size={90}
            />
            {/* Icon in center */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: heroStat.color }}
            >
              {heroStat.icon}
            </div>
          </div>

          {/* Value and label */}
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
              {heroStat.label}
            </div>
            <div
              className="text-3xl font-bold font-mono"
              style={{ color: heroStat.color }}
            >
              {formatNumber(heroStat.value)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {heroStat.unit}
            </div>
            {/* Percentage indicator */}
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              {Math.round((heroStat.value / heroStat.max) * 100)}% of regional peak
            </div>
          </div>
        </div>
      </div>

      {/* Other stats in a compact grid */}
      {otherStats.length > 0 && (
        <div className={cn(
          'grid gap-3',
          otherStats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
        )}>
          {otherStats.map((item) => (
            <div
              key={item.label}
              className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 group hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Mini gauge */}
                <div className="relative flex-shrink-0">
                  <StatGauge
                    value={item.value}
                    max={item.max}
                    color={item.color}
                    size={48}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: item.color }}
                  >
                    <div className="scale-75">{item.icon}</div>
                  </div>
                </div>

                {/* Value */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium truncate">
                    {item.label}
                  </div>
                  <div
                    className="text-lg font-bold font-mono"
                    style={{ color: item.color }}
                  >
                    {formatNumber(item.value)}
                  </div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500">
                    {item.unit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
