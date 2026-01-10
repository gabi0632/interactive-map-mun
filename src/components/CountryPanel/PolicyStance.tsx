'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PolicyStanceProps {
  policyStance: string;
}

/**
 * PolicyStance Component
 * Displays the country's policy stance on drug trafficking
 */
export function PolicyStance({ policyStance }: PolicyStanceProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Policy Stance
      </h3>
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {policyStance}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
