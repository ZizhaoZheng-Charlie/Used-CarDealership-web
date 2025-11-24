import { Request, Response, NextFunction } from "express";
import { ExampleService } from "../Services/exampleService.js";

export class ExampleController {
  private exampleService: ExampleService;

  constructor() {
    this.exampleService = new ExampleService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.exampleService.getAll();
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
      const data = await this.exampleService.getById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
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
      const data = await this.exampleService.create(req.body);
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
      const data = await this.exampleService.update(id, req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
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
      const deleted = await this.exampleService.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Resource deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
