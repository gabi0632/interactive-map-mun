'use client';

import { Badge } from '@/components/ui/badge';
import {
  Leaf,
  Truck,
  Shuffle,
  ShoppingCart,
  Globe,
  MapPin,
  Users,
} from 'lucide-react';
import type { Country, CountryRole } from '@/types';

interface CountryHeaderProps {
  country: Country;
}

/**
 * Role configuration with colors, icons, and labels
 */
const ROLE_CONFIG: Record<
  CountryRole,
  {
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  producer: {
    color: '#4A7C59',
    bgColor: 'bg-[#4A7C59]/10',
    borderColor: 'border-[#4A7C59]/30',
    icon: <Leaf className="w-3.5 h-3.5" />,
    label: 'PRODUCER',
  },
  transit: {
    color: '#D4A84B',
    bgColor: 'bg-[#D4A84B]/10',
    borderColor: 'border-[#D4A84B]/30',
    icon: <Truck className="w-3.5 h-3.5" />,
    label: 'TRANSIT',
  },
  mixed: {
    color: '#C4A35A',
    bgColor: 'bg-[#C4A35A]/10',
    borderColor: 'border-[#C4A35A]/30',
    icon: <Shuffle className="w-3.5 h-3.5" />,
    label: 'MIXED',
  },
  consumer: {
    color: '#CD5C5C',
    bgColor: 'bg-[#CD5C5C]/10',
    borderColor: 'border-[#CD5C5C]/30',
    icon: <ShoppingCart className="w-3.5 h-3.5" />,
    label: 'CONSUMER',
  },
  other: {
    color: '#8B7355',
    bgColor: 'bg-[#8B7355]/10',
    borderColor: 'border-[#8B7355]/30',
    icon: <Globe className="w-3.5 h-3.5" />,
    label: 'OTHER',
  },
};

/**
 * CountryHeader Component
 *
 * Prominent display of country flag, name, and role with
 * enhanced visual hierarchy for student engagement.
 */
export function CountryHeader({ country }: CountryHeaderProps) {
  const formattedPopulation = country.population.toLocaleString('en-US');
  const roleConfig = ROLE_CONFIG[country.role];

  return (
    <div className="flex flex-col gap-4">
      {/* Flag and Name Section */}
      <div className="flex items-start gap-4">
        {/* Large flag with shadow */}
        <div
          className="text-6xl drop-shadow-md flex-shrink-0"
          aria-label={`${country.name} flag`}
        >
          {country.flag}
        </div>

        {/* Name and role */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {country.name}
          </h2>

          {/* Enhanced Role Badge */}
          <Badge
            className={`
              mt-2 inline-flex items-center gap-1.5 px-3 py-1
              ${roleConfig.bgColor} ${roleConfig.borderColor}
              border font-semibold text-xs tracking-wider
              transition-all duration-200 hover:scale-105
            `}
            style={{ color: roleConfig.color }}
          >
            {roleConfig.icon}
            {roleConfig.label}
          </Badge>
        </div>
      </div>

      {/* Basic Info - Compact Cards */}
      <div className="flex gap-3">
        {/* Capital */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-0.5">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-wide font-medium">
              Capital
            </span>
          </div>
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
            {country.capital}
          </p>
        </div>

        {/* Population */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-0.5">
            <Users className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-wide font-medium">
              Population
            </span>
          </div>
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {formattedPopulation}
          </p>
        </div>
      </div>

      {/* Role Description - Styled Quote */}
      <div
        className="relative pl-4 py-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
        style={{
          borderLeft: `3px solid ${roleConfig.color}`,
        }}
      >
        <p>{country.roleDescription}</p>
      </div>
    </div>
  );
}
