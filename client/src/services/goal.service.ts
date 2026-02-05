import api from "./api.service";
import { API_ENDPOINTS } from "../utils/constants";
import { ApiResponse } from "../types";
import type { Goal } from "../types";

const BASE = API_ENDPOINTS.GOALS;

export const goalService = {
  async getByLocationId(locationId: string): Promise<Goal> {
    const res = await api.get<ApiResponse<{ goals: Goal }>>(BASE, {
      params: { locationId },
    });
    if (!res.data.success || res.data.data?.goals == null) {
      throw new Error(res.data.message ?? "Failed to fetch goals");
    }
    return res.data.data.goals;
  },

  async upsert(payload: {
    locationId: string;
    salesGoal: number;
    laborCostGoal: number;
    hoursGoal: number;
    spmhGoal: number;
    foodCostGoal: number;
  }): Promise<Goal> {
    const res = await api.put<ApiResponse<{ goals: Goal }>>(BASE, payload);
    if (!res.data.success || !res.data.data?.goals) {
      throw new Error(res.data.message ?? "Failed to save goals");
    }
    return res.data.data.goals;
  },
};
