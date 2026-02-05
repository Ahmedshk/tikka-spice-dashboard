import { GoalModel, GoalDocument } from "../models/goal.model.js";
import { IGoal } from "../types/goal.types.js";

export class GoalRepository {
  async findByLocationId(locationId: string): Promise<GoalDocument | null> {
    return await GoalModel.findOne({ locationId });
  }

  async upsertByLocationId(
    locationId: string,
    data: Omit<IGoal, "_id" | "locationId" | "createdAt" | "updatedAt">
  ): Promise<GoalDocument> {
    return await GoalModel.findOneAndUpdate(
      { locationId },
      { ...data, locationId },
      { new: true, upsert: true, runValidators: true }
    );
  }
}
