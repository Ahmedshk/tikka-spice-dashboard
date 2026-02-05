import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { CommandCenter } from './pages/dashboard/CommandCenter';
import { SalesLaborDetails } from './pages/dashboard/SalesLaborDetails';
import { SalesTrendReports } from './pages/dashboard/SalesTrendReports';
import { InventoryFoodCost } from './pages/dashboard/InventoryFoodCost';
import { TeamHR } from './pages/dashboard/TeamHR';
import { CalendarEvents } from './pages/dashboard/CalendarEvents';
import { UserManagement } from './pages/dashboard/UserManagement';
import { GoalSetting } from './pages/dashboard/GoalSetting';
import { LocationManagement } from './pages/dashboard/LocationManagement';
import { ErrorPage } from './pages/ErrorPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { RootRedirect } from './components/auth/RootRedirect';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { ReactNode } from 'react';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/command-center',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <CommandCenter />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/sales-labor-detail',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <SalesLaborDetails />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/sales-trend-reports',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <SalesTrendReports />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/inventory-food-cost',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <InventoryFoodCost />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/team-hr',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <TeamHR />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/calendar-events',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <CalendarEvents />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/user-management',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/goal-setting',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <GoalSetting />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/location-management',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <LocationManagement />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/dashboard/command-center" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <RootRedirect />,
    errorElement: <ErrorPage />,
  },
]);
