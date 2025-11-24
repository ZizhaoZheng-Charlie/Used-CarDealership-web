import { Request, Response, NextFunction } from "express";
import { StaffService } from "../Services/staffService.js";

export class StaffController {
  private staffService: StaffService;

  constructor() {
    this.staffService = new StaffService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.staffService.getAll();
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
      const data = this.staffService.getById(parseInt(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found",
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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.staffService.create(req.body);
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = this.staffService.update(parseInt(id), req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found",
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

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = this.staffService.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Staff member deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

