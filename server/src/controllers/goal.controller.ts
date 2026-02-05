import { Request, Response, NextFunction } from "express";
import { GoalService } from "../services/goal.service.js";

const goalService = new GoalService();

export const getGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locationId =
      typeof req.query.locationId === "string" ? req.query.locationId : "";
    const goals = await goalService.getByLocationId(locationId);
    res.status(200).json({
      success: true,
      data: { goals },
    });
  } catch (error) {
    next(error);
  }
};

export const upsertGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      locationId,
      salesGoal,
      laborCostGoal,
      hoursGoal,
      spmhGoal,
      foodCostGoal,
    } = req.body;
    const goals = await goalService.upsert(locationId, {
      salesGoal,
      laborCostGoal,
      hoursGoal,
      spmhGoal,
      foodCostGoal,
    });
    res.status(200).json({
      success: true,
      message: "Goals saved successfully",
      data: { goals },
    });
  } catch (error) {
    next(error);
  }
};
