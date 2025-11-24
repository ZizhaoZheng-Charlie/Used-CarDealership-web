import { Request, Response, NextFunction } from "express";
import { FinanceService } from "../Services/financeService.js";
import { financeFormSchema } from "../Validators/financeValidator.js";

export class FinanceController {
  private financeService: FinanceService;

  constructor() {
    this.financeService = new FinanceService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against schema
      const validationResult = financeFormSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationResult.error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      // If validation passes, proceed with creating the finance application
      const data = await this.financeService.create(validationResult.data);
      res.status(201).json({
        success: true,
        message: "Finance application submitted successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.financeService.getAll();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this.financeService.getById(Number(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Finance application not found",
        });
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
