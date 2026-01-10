'use client';

import { ExternalLink } from 'lucide-react';

interface SourcesProps {
  sources: string[];
}

/**
 * Sources Component
 * Displays reference links for country data
 */
export function Sources({ sources }: SourcesProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Sources
      </h3>
      <div className="flex flex-col gap-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            <ExternalLink className="size-4 shrink-0" />
            <span className="break-all">{source}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
