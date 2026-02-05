import { GoalRepository } from "../repositories/goal.repository.js";
import { IGoal } from "../types/goal.types.js";

const defaultGoals: Omit<
  IGoal,
  "_id" | "locationId" | "createdAt" | "updatedAt"
> = {
  salesGoal: 0,
  laborCostGoal: 0,
  hoursGoal: 0,
  spmhGoal: 0,
  foodCostGoal: 0,
};

export class GoalService {
  private readonly goalRepository: GoalRepository;

  constructor() {
    this.goalRepository = new GoalRepository();
  }

  async getByLocationId(locationId: string): Promise<IGoal> {
    const doc = await this.goalRepository.findByLocationId(locationId);
    if (!doc) {
      return {
        _id: undefined,
        locationId,
        ...defaultGoals,
      } as IGoal;
    }
    return this.toGoal(doc);
  }

  async upsert(
    locationId: string,
    data: Omit<IGoal, "_id" | "locationId" | "createdAt" | "updatedAt">
  ): Promise<IGoal> {
    const doc = await this.goalRepository.upsertByLocationId(locationId, data);
    return this.toGoal(doc);
  }

  private toGoal(doc: {
    _id: unknown;
    locationId: string;
    salesGoal: number;
    laborCostGoal: number;
    hoursGoal: number;
    spmhGoal: number;
    foodCostGoal: number;
    createdAt: Date;
    updatedAt: Date;
  }): IGoal {
    return {
      _id: String(doc._id),
      locationId: doc.locationId,
      salesGoal: doc.salesGoal,
      laborCostGoal: doc.laborCostGoal,
      hoursGoal: doc.hoursGoal,
      spmhGoal: doc.spmhGoal,
      foodCostGoal: doc.foodCostGoal,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
