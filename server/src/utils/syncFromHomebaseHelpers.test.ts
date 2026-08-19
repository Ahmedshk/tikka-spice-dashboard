import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHomebaseSyncCreatePayload,
  buildHomebaseSyncUpdatePayload,
  getHomebaseSyncReviewCycleActions,
  type NormalizedHomebaseEmployee,
} from "./syncFromHomebaseHelpers.js";
import type { HomebaseJob } from "../types/user.types.js";

function job(partial: Partial<HomebaseJob> & { id: number }): HomebaseJob {
  return {
    archived_at: null,
    location_uuid: null,
    ...partial,
  };
}

function normalizedEmployee(
  archivedAt: string | null | undefined,
  phone?: string,
  extras?: { jobId?: number; locationUuid?: string },
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
          : job({
              id: extras?.jobId ?? 1,
              archived_at: archivedAt,
              location_uuid: extras?.locationUuid ?? "loc-1",
            }),
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

test("buildHomebaseSyncUpdatePayload keeps active when another location job is archived", () => {
  const existingActive = job({
    id: 30343919,
    archived_at: null,
    location_uuid: "loc-2",
  });
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee("2026-06-13T18:57:37-06:00", undefined, {
      jobId: 29809228,
      locationUuid: "loc-1",
    }),
    { homebaseData: { job: existingActive, jobs: [existingActive] } },
  );
  assert.equal(payload.isTerminated, false);
  assert.equal(payload.homebaseData?.jobs?.length, 2);
  assert.equal(payload.homebaseData?.job?.id, 30343919);
  assert.equal(payload.homebaseData?.job?.archived_at, null);
});

test("buildHomebaseSyncUpdatePayload stays active when syncing an active job over an archived location job", () => {
  const existingArchived = job({
    id: 29809228,
    archived_at: "2026-06-13T18:57:37-06:00",
    location_uuid: "loc-1",
  });
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee(null, undefined, {
      jobId: 30343919,
      locationUuid: "loc-2",
    }),
    { homebaseData: { job: existingArchived, jobs: [existingArchived] } },
  );
  assert.equal(payload.isTerminated, false);
  assert.equal(payload.homebaseData?.job?.id, 30343919);
});

test("buildHomebaseSyncUpdatePayload terminates only when every stored job is archived", () => {
  const existingArchived = job({
    id: 29809228,
    archived_at: "2026-06-13T18:57:37-06:00",
    location_uuid: "loc-1",
  });
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee("2026-07-01T00:00:00Z", undefined, {
      jobId: 30343919,
      locationUuid: "loc-2",
    }),
    { homebaseData: { job: existingArchived, jobs: [existingArchived] } },
  );
  assert.equal(payload.isTerminated, true);
  assert.equal(payload.homebaseData?.jobs?.length, 2);
});

test("buildHomebaseSyncUpdatePayload upserts the same job id instead of duplicating", () => {
  const existing = job({
    id: 1,
    archived_at: null,
    location_uuid: "loc-1",
    wage_rate: 12,
  });
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee("2026-01-15T00:00:00Z", undefined, {
      jobId: 1,
      locationUuid: "loc-1",
    }),
    { homebaseData: { job: existing, jobs: [existing] } },
  );
  assert.equal(payload.homebaseData?.jobs?.length, 1);
  assert.equal(payload.homebaseData?.jobs?.[0]?.archived_at, "2026-01-15T00:00:00Z");
  assert.equal(payload.isTerminated, true);
});

test("buildHomebaseSyncUpdatePayload seeds jobs from legacy single job", () => {
  const legacy = job({
    id: 30343919,
    archived_at: null,
    location_uuid: "loc-2",
  });
  const payload = buildHomebaseSyncUpdatePayload(
    normalizedEmployee("2026-06-13T18:57:37-06:00", undefined, {
      jobId: 29809228,
      locationUuid: "loc-1",
    }),
    { homebaseData: { job: legacy } },
  );
  assert.equal(payload.homebaseData?.jobs?.length, 2);
  assert.equal(payload.isTerminated, false);
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

test("buildHomebaseSyncCreatePayload stores jobs and is not terminated when job is active", () => {
  const created = buildHomebaseSyncCreatePayload(normalizedEmployee(null), "hash");
  assert.equal(created.isTerminated, false);
  assert.equal(created.homebaseData?.jobs?.length, 1);
  assert.equal(created.homebaseData?.job?.id, 1);
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
