import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/user.types.js';
import { logger } from '../utils/logger.util.js';

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const userRole = req.user.role as UserRole;

    if (!allowedRoles.includes(userRole)) {
      logger.warn(`Access denied for role ${userRole}`, {
        userId: req.user.userId,
        requiredRoles: allowedRoles,
      });

      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
      return;
    }

    next();
  };
};
