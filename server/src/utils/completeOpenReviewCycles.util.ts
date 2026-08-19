import { ReviewCycleModel } from "../models/reviewCycle.model.js";
import type { ReviewCycleStatus } from "../types/reviewCycle.types.js";

/** Cycle statuses that should stay as-is when an employee is terminated. */
export const REVIEW_CYCLE_TERMINAL_ON_TERMINATE: ReviewCycleStatus[] = [
  "cycle_complete",
  "checkin_60_complete",
  "checkin_60_done",
];

export function completeOpenReviewCyclesFilter(employeeId: string): {
  employeeId: string;
  status: { $nin: ReviewCycleStatus[] };
} {
  return {
    employeeId,
    status: { $nin: REVIEW_CYCLE_TERMINAL_ON_TERMINATE },
  };
}

export function completeOpenReviewCyclesUpdate(): {
  $set: { status: "cycle_complete" };
} {
  return { $set: { status: "cycle_complete" } };
}

/** Close open review cycles for a terminated employee (manual or Homebase sync). */
export async function completeOpenReviewCyclesForEmployee(
  employeeId: string,
): Promise<void> {
  await ReviewCycleModel.updateMany(
    completeOpenReviewCyclesFilter(employeeId),
    completeOpenReviewCyclesUpdate(),
  );
}
