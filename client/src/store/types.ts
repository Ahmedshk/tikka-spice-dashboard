import { User, AuthState } from '../types';

export interface RootState {
  auth: AuthState;
  user: {
    profile: User | null;
    isLoading: boolean;
  };
}
