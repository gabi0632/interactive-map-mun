'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CriminalOrganization } from '@/types';

interface CountryOrganizationsProps {
  organizations?: CriminalOrganization[];
}

/**
 * CountryOrganizations Component
 * Displays major criminal organizations operating in the country
 */
export function CountryOrganizations({ organizations }: CountryOrganizationsProps) {
  // Don't render if no organizations
  if (!organizations || organizations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Criminal Organizations
      </h3>
      <div className="flex flex-col gap-3">
        {organizations.map((org) => (
          <Card
            key={org.name}
            className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-red-700 dark:text-red-400">
                {org.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-700 dark:text-gray-300">
                {org.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
