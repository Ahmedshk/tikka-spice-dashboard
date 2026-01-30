import { Router } from 'express';
import authRoutes from './auth.routes.js';
import { healthCheck } from '../controllers/health.controller.js';

const router = Router();

// Health check (no auth required)
router.get('/health', healthCheck);

// Auth routes
router.use('/auth', authRoutes);

// Add more route modules here as they are created
// router.use('/users', userRoutes);
// router.use('/dashboard', dashboardRoutes);

export default router;
