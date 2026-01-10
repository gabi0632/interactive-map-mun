'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorFallbackProps {
  /** Error object containing error details */
  error: Error;

  /** Callback to attempt recovery/reset from the error */
  resetErrorBoundary?: () => void;
}

/**
 * ErrorFallback Component
 *
 * User-friendly error display component used by ErrorBoundary.
 * Shows error information with a retry button to attempt recovery.
 */
export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            An error occurred while loading this component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error message */}
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800 font-mono break-words">
              {error.message || 'Unknown error'}
            </p>
          </div>

          {/* Retry button */}
          {resetErrorBoundary && (
            <Button
              onClick={resetErrorBoundary}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}

          {/* Help text */}
          <p className="text-xs text-gray-500 text-center">
            If the problem persists, please refresh the page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
