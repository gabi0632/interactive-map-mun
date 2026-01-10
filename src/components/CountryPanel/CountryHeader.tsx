'use client';

import { Badge } from '@/components/ui/badge';
import type { Country, CountryRole } from '@/types';

interface CountryHeaderProps {
  country: Country;
}

/**
 * Get background color class for country role badge
 */
const getRoleBadgeColor = (role: CountryRole): string => {
  const colors: Record<CountryRole, string> = {
    producer: 'bg-red-500 text-white border-transparent',
    transit: 'bg-orange-500 text-white border-transparent',
    mixed: 'bg-yellow-500 text-white border-transparent',
    consumer: 'bg-blue-500 text-white border-transparent',
  };
  return colors[role];
};

/**
 * CountryHeader Component
 * Displays flag, name, capital, population, and role badge
 */
export function CountryHeader({ country }: CountryHeaderProps) {
  const formattedPopulation = country.population.toLocaleString('en-US');

  return (
    <div className="flex flex-col gap-3">
      {/* Flag */}
      <div className="text-5xl" aria-label={`${country.name} flag`}>
        {country.flag}
      </div>

      {/* Country Name */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {country.name}
      </h2>

      {/* Role Badge */}
      <Badge className={getRoleBadgeColor(country.role)}>
        {country.role.toUpperCase()}
      </Badge>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Capital</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {country.capital}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Population</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {formattedPopulation}
          </p>
        </div>
      </div>

      {/* Role Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {country.roleDescription}
      </p>
    </div>
  );
}
