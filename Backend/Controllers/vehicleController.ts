import { Request, Response, NextFunction } from "express";
import { VehicleService } from "../Services/vehicleService.js";

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.vehicleService.getAll();
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
      const data = this.vehicleService.getById(parseInt(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
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
      const data = this.vehicleService.create(req.body);
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
      const data = this.vehicleService.update(parseInt(id), req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
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
      const deleted = this.vehicleService.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}


