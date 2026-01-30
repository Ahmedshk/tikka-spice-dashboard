import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserRole } from '../types';

export const useRole = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) {
      return false;
    }

    return allowedRoles.includes(user.role);
  };

  const isOwner = (): boolean => {
    return hasRole([UserRole.OWNER]);
  };

  const isManager = (): boolean => {
    return hasRole([
      UserRole.OWNER,
      UserRole.DIRECTOR_OF_OPERATIONS,
      UserRole.DISTRICT_MANAGER,
      UserRole.GENERAL_MANAGER,
    ]);
  };

  return {
    userRole: user?.role || null,
    hasRole,
    isOwner,
    isManager,
  };
};
