import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHomebaseSyncUpdatePayload,
  getHomebaseSyncReviewCycleActions,
  type NormalizedHomebaseEmployee,
} from "./syncFromHomebaseHelpers.js";

function normalizedEmployee(
  archivedAt: string | null | undefined,
  phone?: string,
): NormalizedHomebaseEmployee {
  return {
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Doe",
    phone,
    homebaseData: {
      id: "123",
      job:
        archivedAt === undefined
          ? undefined
          : {
              id: 1,
              archived_at: archivedAt,
            },
      created_at: undefined,
      updated_at: undefined,
    },
  };
}

test("buildHomebaseSyncUpdatePayload sets isTerminated false when archived_at is null", () => {
  const payload = buildHomebaseSyncUpdatePayload(normalizedEmployee(null), {});
  assert.equal(payload.isTerminated, false);
});

test("buildHomebaseSyncUpdatePayload sets isTerminated false when archived_at is empty", () => {
  const payload = buildHomebaseSyncUpdatePayload(normalizedEmployee(""), {});
  assert.equal(payload.isTerminated, false);
});

test("buildHomebaseSyncUpdatePayload sets isTerminated false when job is missing", () => {
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee(undefined),
    {},
  );
  assert.equal(payload.isTerminated, false);
});

test("buildHomebaseSyncUpdatePayload sets isTerminated true when archived_at is set", () => {
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee("2026-01-15T00:00:00Z"),
    {},
  );
  assert.equal(payload.isTerminated, true);
});

test("buildHomebaseSyncUpdatePayload sets phone when Homebase sends a number", () => {
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee(null, "555-0199"),
    {},
  );
  assert.equal(payload.phone, "555-0199");
});

test("buildHomebaseSyncUpdatePayload clears phone when Homebase phone is missing", () => {
  const payload = buildHomebaseSyncUpdatePayload(normalizedEmployee(null), {
    phone: "555-0100",
  });
  assert.equal(payload.phone, "");
});

test("getHomebaseSyncReviewCycleActions completes cycles and skips start when terminated", () => {
  assert.deepEqual(getHomebaseSyncReviewCycleActions(true), {
    completeOpenCycles: true,
    startCycle: false,
  });
});

test("getHomebaseSyncReviewCycleActions starts a cycle and does not complete when active", () => {
  assert.deepEqual(getHomebaseSyncReviewCycleActions(false), {
    completeOpenCycles: false,
    startCycle: true,
  });
});
