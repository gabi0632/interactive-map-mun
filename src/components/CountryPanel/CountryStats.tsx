'use client';

import { useEffect, useState } from 'react';
import { Leaf, Factory, Scale, Trash2, Package, TrendingUp, Users, Info } from 'lucide-react';
import type { CountryStats as CountryStatsType, DrugSeizures, TransitVolume, ConsumptionEstimate } from '@/types';
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
  max: number;
}

interface DrugBreakdownItem {
  drug: string;
  value: number;
  color: string;
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
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-gray-200 dark:text-gray-700"
      />
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
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString('en-US');
}

/**
 * Format kg to tons when appropriate
 */
function formatWeight(kg: number): { value: string; unit: string } {
  if (kg >= 1000) {
    return { value: (kg / 1000).toFixed(1), unit: 'metric tons' };
  }
  return { value: formatNumber(kg), unit: 'kg' };
}

/**
 * Drug colors for consistent visualization
 */
const drugColors: Record<string, string> = {
  cocaine: '#E53E3E',     // Red
  cannabis: '#38A169',    // Green
  heroin: '#805AD5',      // Purple
  methamphetamine: '#3182CE', // Blue
  fentanyl: '#ED8936',    // Orange
  cocaBase: '#DD6B20',    // Dark orange
  otherSynthetics: '#718096', // Gray
};

/**
 * Drug display names
 */
const drugNames: Record<string, string> = {
  cocaine: 'Cocaine',
  cannabis: 'Cannabis',
  heroin: 'Heroin',
  methamphetamine: 'Meth',
  fentanyl: 'Fentanyl',
  cocaBase: 'Coca Base',
  otherSynthetics: 'Other',
};

/**
 * Drug Seizures Breakdown Component
 */
function DrugSeizuresBreakdown({ seizures }: { seizures: DrugSeizures }) {
  const items: DrugBreakdownItem[] = [];

  // Build the breakdown items from available data
  const drugKeys = ['cocaine', 'cannabis', 'heroin', 'methamphetamine', 'fentanyl', 'cocaBase', 'otherSynthetics'] as const;

  for (const drug of drugKeys) {
    const value = seizures[drug];
    if (value !== undefined && value > 0) {
      items.push({
        drug: drugNames[drug] || drug,
        value,
        color: drugColors[drug] || '#718096',
      });
    }
  }

  // Sort by value descending
  items.sort((a, b) => b.value - a.value);

  if (items.length === 0) return null;

  const totalSeizures = items.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...items.map(i => i.value));

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Drug Seizures
        </h4>
        {seizures.year && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {seizures.year}
          </span>
        )}
      </div>

      {/* Total seizures header */}
      <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">
          {formatWeight(totalSeizures).value}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formatWeight(totalSeizures).unit} total seized
        </div>
      </div>

      {/* Drug breakdown bars */}
      <div className="space-y-2">
        {items.map((item) => {
          const { value: displayValue, unit } = formatWeight(item.value);
          const percentage = (item.value / maxValue) * 100;

          return (
            <div key={item.drug} className="group">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {item.drug}
                </span>
                <span className="font-mono text-gray-600 dark:text-gray-400">
                  {displayValue} {unit}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Note if available */}
      {seizures.note && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">{seizures.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Transit Volume Component
 */
function TransitVolumeSection({ transit }: { transit: TransitVolume }) {
  const items: { drug: string; value: number; color: string }[] = [];

  if (transit.cocaine) items.push({ drug: 'Cocaine', value: transit.cocaine, color: drugColors.cocaine });
  if (transit.cannabis) items.push({ drug: 'Cannabis', value: transit.cannabis, color: drugColors.cannabis });
  if (transit.methamphetamine) items.push({ drug: 'Meth', value: transit.methamphetamine, color: drugColors.methamphetamine });
  if (transit.fentanyl) items.push({ drug: 'Fentanyl', value: transit.fentanyl, color: drugColors.fentanyl });
  if (transit.heroin) items.push({ drug: 'Heroin', value: transit.heroin, color: drugColors.heroin });

  if (items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Estimated Transit Volume
        </h4>
        {transit.year && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {transit.year}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.drug}
            className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-2 border border-amber-100 dark:border-amber-800/50"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              {item.drug}
            </div>
            <div className="text-lg font-bold font-mono" style={{ color: item.color }}>
              ~{item.value}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">MT/year</div>
          </div>
        ))}
      </div>

      {transit.note && (
        <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">{transit.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Consumption Estimate Component
 */
function ConsumptionSection({ consumption }: { consumption: ConsumptionEstimate }) {
  const items: { drug: string; value: number; color: string }[] = [];

  if (consumption.cocaine) items.push({ drug: 'Cocaine', value: consumption.cocaine, color: drugColors.cocaine });
  if (consumption.cannabis) items.push({ drug: 'Cannabis', value: consumption.cannabis, color: drugColors.cannabis });
  if (consumption.fentanyl) items.push({ drug: 'Fentanyl', value: consumption.fentanyl, color: drugColors.fentanyl });
  if (consumption.methamphetamine) items.push({ drug: 'Meth', value: consumption.methamphetamine, color: drugColors.methamphetamine });
  if (consumption.heroin) items.push({ drug: 'Heroin', value: consumption.heroin, color: drugColors.heroin });

  if (items.length === 0) return null;

  const isUsers = consumption.metric === 'users';

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-red-600 dark:text-red-400" />
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {isUsers ? 'Estimated Users' : 'Consumption'}
        </h4>
        {consumption.year && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {consumption.year}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.drug}
            className="bg-white/60 dark:bg-gray-800/40 rounded-lg p-2 border border-red-100 dark:border-red-800/50"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              {item.drug}
            </div>
            <div className="text-lg font-bold font-mono" style={{ color: item.color }}>
              {formatNumber(item.value)}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {isUsers ? 'users' : 'MT/year'}
            </div>
          </div>
        ))}
      </div>

      {consumption.note && (
        <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">{consumption.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * CountryStats Component
 *
 * Displays drug trafficking statistics with visual gauges and icons.
 * Supports detailed breakdowns by drug type for seizures, transit, and consumption.
 */
export function CountryStats({ stats }: CountryStatsProps) {
  const statItems: StatItem[] = [];

  const maxValues = {
    cocaCultivation: 260000,
    cocaineProduction: 2700,
    seizures: 750000,
    eradicationEfforts: 25000,
  };

  if (stats.cocaCultivation !== undefined) {
    statItems.push({
      label: 'Coca Cultivation',
      value: stats.cocaCultivation,
      unit: 'hectares',
      icon: <Leaf className="w-5 h-5" />,
      color: '#4A7C59',
      max: maxValues.cocaCultivation,
    });
  }

  if (stats.cocaineProduction !== undefined) {
    statItems.push({
      label: 'Cocaine Production',
      value: stats.cocaineProduction,
      unit: 'metric tons',
      icon: <Factory className="w-5 h-5" />,
      color: '#C4A35A',
      max: maxValues.cocaineProduction,
    });
  }

  if (stats.eradicationEfforts !== undefined) {
    statItems.push({
      label: 'Eradication',
      value: stats.eradicationEfforts,
      unit: 'hectares',
      icon: <Trash2 className="w-5 h-5" />,
      color: '#CD5C5C',
      max: maxValues.eradicationEfforts,
    });
  }

  // Check if we have any data to show
  const hasProducerStats = statItems.length > 0;
  const hasDrugSeizures = stats.drugSeizures !== undefined;
  const hasTransitVolume = stats.transitVolume !== undefined;
  const hasConsumption = stats.consumption !== undefined;
  const hasLegacySeizures = stats.seizures !== undefined && !hasDrugSeizures;

  // Add legacy seizures to stat items if no detailed breakdown
  if (hasLegacySeizures) {
    statItems.push({
      label: 'Drug Seizures',
      value: stats.seizures!,
      unit: 'kg/year',
      icon: <Scale className="w-5 h-5" />,
      color: '#1E5F8A',
      max: maxValues.seizures,
    });
  }

  if (!hasProducerStats && !hasDrugSeizures && !hasTransitVolume && !hasConsumption && !hasLegacySeizures) {
    return null;
  }

  const heroStat = statItems[0];
  const otherStats = statItems.slice(1);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Statistics
      </h3>

      {/* Producer stats (coca cultivation, production, eradication) */}
      {heroStat && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <StatGauge
                value={heroStat.value}
                max={heroStat.max}
                color={heroStat.color}
                size={90}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: heroStat.color }}
              >
                {heroStat.icon}
              </div>
            </div>

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
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {Math.round((heroStat.value / heroStat.max) * 100)}% of regional peak
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other producer stats */}
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

      {/* Detailed drug seizures breakdown */}
      {hasDrugSeizures && (
        <DrugSeizuresBreakdown seizures={stats.drugSeizures!} />
      )}

      {/* Transit volume for transit countries */}
      {hasTransitVolume && (
        <TransitVolumeSection transit={stats.transitVolume!} />
      )}

      {/* Consumption for consumer countries */}
      {hasConsumption && (
        <ConsumptionSection consumption={stats.consumption!} />
      )}
    </div>
  );
}
