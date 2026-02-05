import mongoose, { Schema, Document, Types } from "mongoose";
import { IGoal } from "../types/goal.types.js";

export interface GoalDocument
  extends Omit<IGoal, "_id" | "createdAt" | "updatedAt">,
    Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<GoalDocument>(
  {
    locationId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    salesGoal: { type: Number, required: true, default: 0 },
    laborCostGoal: { type: Number, required: true, default: 0 },
    hoursGoal: { type: Number, required: true, default: 0 },
    spmhGoal: { type: Number, required: true, default: 0 },
    foodCostGoal: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const GoalModel = mongoose.model<GoalDocument>("Goal", goalSchema);
