import { UserRole } from './index';
import { FC, SVGProps } from 'react';

export interface NavigationChild {
  label: string;
  path: string;
  allowedRoles: UserRole[];
}

export interface NavigationItem {
  label: string;
  path?: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  allowedRoles: UserRole[];
  children?: NavigationChild[];
  hasSeparator?: boolean;
}

export type NavigationConfig = NavigationItem[];
