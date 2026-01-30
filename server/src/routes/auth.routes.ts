import { Router } from 'express';
import { login, logout, refresh } from '../controllers/auth.controller.js';
import { validate } from '../utils/zod.util.js';
import { loginSchema } from '../validators/auth.validators.js';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);

export default router;
