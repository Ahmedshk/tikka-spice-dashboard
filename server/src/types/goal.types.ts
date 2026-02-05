export interface IGoal {
  _id?: string;
  locationId: string;
  salesGoal: number;
  laborCostGoal: number;
  hoursGoal: number;
  spmhGoal: number;
  foodCostGoal: number;
  createdAt?: Date;
  updatedAt?: Date;
}
