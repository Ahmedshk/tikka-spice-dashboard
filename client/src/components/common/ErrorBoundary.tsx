import { Component, ReactNode, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-dashboard-background flex items-center justify-center p-4">
          <div className="bg-card-background rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-text-secondary mb-4">Something went wrong</h1>
            <p className="text-text-primary mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            {this.state.error && (
              <details className="mb-6">
                <summary className="cursor-pointer text-sm text-text-primary mb-2">
                  Error Details
                </summary>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40 text-text-primary">
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => globalThis.location.reload()}
                className="flex-1 bg-button-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Refresh Page
              </button>
              <Link
                to="/dashboard/command-center"
                className="flex-1 bg-button-secondary text-text-primary px-4 py-2 rounded-md text-center hover:bg-gray-200 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
