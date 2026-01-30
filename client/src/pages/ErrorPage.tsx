import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = 'An unexpected error occurred';
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-dashboard-background flex items-center justify-center p-4">
      <div className="bg-card-background rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-text-secondary mb-4">
          {errorStatus ? `Error ${errorStatus}` : 'Something went wrong'}
        </h1>
        <p className="text-text-primary mb-6">
          {errorMessage}
        </p>
        {error instanceof Error && error.stack && (
          <details className="mb-6">
            <summary className="cursor-pointer text-sm text-text-primary mb-2">
              Error Details
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40 text-text-primary">
              {error.stack}
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
};
