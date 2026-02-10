export type UserStatus = 'Active' | 'Suspended';

export type UserRole =
  | 'Owner'
  | 'Director of Operations'
  | 'District Manager'
  | 'General Manager'
  | 'Team Member'
  | 'Shift Supervisor';

export interface UserRow {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
