import { Router } from "express";
import { getGoals, upsertGoals } from "../controllers/goal.controller.js";
import { validate } from "../utils/zod.util.js";
import {
  getGoalsQuerySchema,
  upsertGoalsSchema,
} from "../validators/goal.validators.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/rbac.middleware.js";
import { UserRole } from "../types/user.types.js";

const router = Router();

router.use(authenticate);
router.use(
  requireRole([
    UserRole.OWNER,
    UserRole.DIRECTOR_OF_OPERATIONS,
    UserRole.DISTRICT_MANAGER,
  ])
);

router.get("/", validate(getGoalsQuerySchema), getGoals);
router.put("/", validate(upsertGoalsSchema), upsertGoals);

export default router;
