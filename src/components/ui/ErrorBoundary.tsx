'use client';

import React, { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;

  /** Optional custom fallback component */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;

  /** The error object if one was caught */
  error: Error | null;
}

/**
 * ErrorBoundary Component
 *
 * React Error Boundary that catches JavaScript errors anywhere in the child
 * component tree and displays a fallback UI instead of crashing the entire app.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error details to console (and optionally to error reporting service)
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you could log to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  /**
   * Reset error boundary state to allow retry
   */
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided, otherwise use default ErrorFallback
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetErrorBoundary);
      }

      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}
