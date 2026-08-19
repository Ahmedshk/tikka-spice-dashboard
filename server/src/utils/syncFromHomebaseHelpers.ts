import type { IUser, HomebaseJob } from "../types/user.types.js";
import type {
  HomebaseEmployee,
  HomebaseEmployeeJob,
} from "../services/homebase.service.js";

export interface NormalizedHomebaseEmployee {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | undefined;
  homebaseData: {
    id: string;
    job: HomebaseJob | undefined;
    created_at: Date | undefined;
    updated_at: Date | undefined;
  };
}

interface UserDocumentLike {
  phone?: string;
  homebaseData?: {
    job?: HomebaseJob | null;
    jobs?: HomebaseJob[] | null;
  } | null;
}

/** Copy job fields from API response excluding pin. */
function jobWithoutPin(job: HomebaseEmployeeJob | null | undefined): HomebaseJob | undefined {
  if (!job) return undefined;
  return {
    id: job.id,
    level: job.level ?? null,
    default_role: job.default_role ?? null,
    pos_partner_id: job.pos_partner_id ?? null,
    payroll_id: job.payroll_id ?? null,
    wage_rate: job.wage_rate ?? null,
    wage_type: job.wage_type ?? null,
    roles: Array.isArray(job.roles) ? job.roles : [],
    archived_at: job.archived_at ?? null,
    location_uuid: job.location_uuid ?? null,
  };
}

function isHomebaseJobArchived(job: HomebaseJob | null | undefined): boolean {
  const archivedAt = job?.archived_at;
  return archivedAt != null && archivedAt !== "";
}

function jobsMatch(a: HomebaseJob, b: HomebaseJob): boolean {
  if (a.id === b.id) return true;
  const locA = a.location_uuid?.trim();
  const locB = b.location_uuid?.trim();
  return Boolean(locA && locB && locA === locB);
}

function existingJobsFromUser(existing: UserDocumentLike): HomebaseJob[] {
  const fromJobs = (existing.homebaseData?.jobs ?? []).filter(
    (j): j is HomebaseJob => j != null,
  );
  if (fromJobs.length > 0) return fromJobs;
  const legacy = existing.homebaseData?.job;
  return legacy != null ? [legacy] : [];
}

function mergeHomebaseJobs(
  existingJobs: HomebaseJob[],
  incoming: HomebaseJob | undefined,
): HomebaseJob[] {
  if (!incoming) return [...existingJobs];
  const jobs = [...existingJobs];
  const idx = jobs.findIndex((j) => jobsMatch(j, incoming));
  if (idx >= 0) {
    jobs[idx] = incoming;
    return jobs;
  }
  jobs.push(incoming);
  return jobs;
}

function pickDisplayHomebaseJob(
  jobs: HomebaseJob[],
  incoming: HomebaseJob | undefined,
): HomebaseJob | null {
  if (incoming && !isHomebaseJobArchived(incoming)) return incoming;
  const active = jobs.find((j) => !isHomebaseJobArchived(j));
  return active ?? incoming ?? jobs[0] ?? null;
}

function isTerminatedFromHomebaseJobs(jobs: HomebaseJob[]): boolean {
  if (jobs.length === 0) return false;
  return jobs.every(isHomebaseJobArchived);
}

function buildSyncedHomebaseData(
  normalized: NormalizedHomebaseEmployee,
  existingJobs: HomebaseJob[],
): NonNullable<IUser["homebaseData"]> {
  const jobs = mergeHomebaseJobs(existingJobs, normalized.homebaseData.job);
  return {
    id: normalized.homebaseData.id,
    job: pickDisplayHomebaseJob(jobs, normalized.homebaseData.job),
    jobs,
    created_at: normalized.homebaseData.created_at ?? null,
    updated_at: normalized.homebaseData.updated_at ?? null,
  };
}

function parseDate(s: string | null | undefined): Date | undefined {
  if (s == null || typeof s !== "string" || !s.trim()) return undefined;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : undefined;
}

/**
 * Normalize a Homebase employee into a plain record for user create/update.
 * Returns null if email is missing (employee should be skipped).
 */
export function normalizeHomebaseEmployee(
  emp: HomebaseEmployee,
): NormalizedHomebaseEmployee | null {
  const email = (emp.email ?? "").trim().toLowerCase();
  if (!email) return null;

  return {
    email,
    firstName: (emp.first_name ?? "").trim() || "Unknown",
    lastName: (emp.last_name ?? "").trim() || "Unknown",
    phone: emp.phone?.trim() || undefined,
    homebaseData: {
      id: String(emp.id),
      job: jobWithoutPin(emp.job),
      created_at: parseDate(emp.created_at),
      updated_at: parseDate(emp.updated_at),
    },
  };
}

/** Build Partial<IUser> for updateById from normalized Homebase employee and existing user. */
export function buildHomebaseSyncUpdatePayload(
  normalized: NormalizedHomebaseEmployee,
  existing: UserDocumentLike,
): Partial<IUser> {
  const homebaseData = buildSyncedHomebaseData(
    normalized,
    existingJobsFromUser(existing),
  );
  const payload: Partial<IUser> = {
    firstName: normalized.firstName,
    lastName: normalized.lastName,
    homebaseData,
  };
  payload.phone = normalized.phone ?? "";
  payload.isTerminated = isTerminatedFromHomebaseJobs(homebaseData.jobs ?? []);
  if (normalized.homebaseData.created_at != null) {
    payload.startDate = normalized.homebaseData.created_at;
  }
  return payload;
}

/** Build create payload for userRepository.create from normalized Homebase employee and hashed password. */
export function buildHomebaseSyncCreatePayload(
  normalized: NormalizedHomebaseEmployee,
  hashedPassword: string,
): Omit<IUser, "_id" | "createdAt" | "updatedAt"> {
  const homebaseData = buildSyncedHomebaseData(normalized, []);
  return {
    email: normalized.email,
    password: hashedPassword,
    firstName: normalized.firstName,
    lastName: normalized.lastName,
    role: null,
    roleId: null,
    isActive: true,
    isTerminated: isTerminatedFromHomebaseJobs(homebaseData.jobs ?? []),
    status: "pending",
    ...(normalized.phone && { phone: normalized.phone }),
    ...(normalized.homebaseData.created_at != null && { startDate: normalized.homebaseData.created_at }),
    homebaseData,
  };
}

export function getHomebaseSyncReviewCycleActions(isTerminated: boolean): {
  completeOpenCycles: boolean;
  startCycle: boolean;
} {
  if (isTerminated) {
    return { completeOpenCycles: true, startCycle: false };
  }
  return { completeOpenCycles: false, startCycle: true };
}
