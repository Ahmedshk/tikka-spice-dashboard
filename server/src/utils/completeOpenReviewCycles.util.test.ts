import test from "node:test";
import assert from "node:assert/strict";
import {
  completeOpenReviewCyclesFilter,
  completeOpenReviewCyclesUpdate,
  REVIEW_CYCLE_TERMINAL_ON_TERMINATE,
} from "./completeOpenReviewCycles.util.js";

test("completeOpenReviewCyclesFilter skips already-finished terminate statuses", () => {
  assert.deepEqual(completeOpenReviewCyclesFilter("user-1"), {
    employeeId: "user-1",
    status: { $nin: REVIEW_CYCLE_TERMINAL_ON_TERMINATE },
  });
  assert.deepEqual(REVIEW_CYCLE_TERMINAL_ON_TERMINATE, [
    "cycle_complete",
    "checkin_60_complete",
    "checkin_60_done",
  ]);
});

test("completeOpenReviewCyclesUpdate marks remaining cycles complete", () => {
  assert.deepEqual(completeOpenReviewCyclesUpdate(), {
    $set: { status: "cycle_complete" },
  });
});
