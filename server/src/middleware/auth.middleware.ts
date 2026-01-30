import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt.util.js';
import { logger } from '../utils/logger.util.js';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Try to get token from cookies first (HTTP-only cookie)
    let token = req.cookies?.accessToken;

    // Fallback to Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const decoded = verifyAccessToken(token) as TokenPayload;

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as any,
    };

    next();
  } catch (error) {
    logger.error('Authentication error', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
