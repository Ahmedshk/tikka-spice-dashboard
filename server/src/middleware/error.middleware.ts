import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.util.js';
import { AppError } from '../utils/errors.util.js';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If it's an AppError, use its statusCode, otherwise default to 500
  const appError = err instanceof AppError ? err : new AppError(err.message || 'Internal server error', 500);
  const statusCode = appError.statusCode || 500;
  const message = appError.message || 'Internal server error';

  logger.error('Error occurred', {
    message,
    statusCode,
    path: req.path,
    method: req.method,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
