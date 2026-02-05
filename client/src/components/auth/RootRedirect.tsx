import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

/**
 * Redirects from "/" to dashboard if logged in, otherwise to login.
 * Only rendered after authCheckDone so we don't redirect before session is restored.
 */
export const RootRedirect = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return <Navigate to={isAuthenticated ? '/dashboard/command-center' : '/login'} replace />;
};
