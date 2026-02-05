import { z } from "zod";

const goalValueSchema = z.number().min(0, "Goal must be 0 or greater");

export const getGoalsQuerySchema = z.object({
  query: z.object({
    locationId: z.string().min(1, "Location ID is required"),
  }),
});

export const upsertGoalsSchema = z.object({
  body: z.object({
    locationId: z.string().min(1, "Location ID is required"),
    salesGoal: goalValueSchema,
    laborCostGoal: goalValueSchema,
    hoursGoal: goalValueSchema,
    spmhGoal: goalValueSchema,
    foodCostGoal: goalValueSchema,
  }),
});
