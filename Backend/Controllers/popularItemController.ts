import { Request, Response, NextFunction } from "express";
import { PopularItemService } from "../Services/popularItemService.js";

export class PopularItemController {
  private popularItemService: PopularItemService;

  constructor() {
    this.popularItemService = new PopularItemService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.popularItemService.getAll();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.params;
      if (
        category !== "body_style" &&
        category !== "make" &&
        category !== "model"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be 'body_style', 'make', or 'model'",
        });
      }

      const data = this.popularItemService.getByCategory(category);
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
      const { category } = req.params;
      if (
        category !== "body_style" &&
        category !== "make" &&
        category !== "model"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be 'body_style', 'make', or 'model'",
        });
      }

      const data = this.popularItemService.create(category, req.body);
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
      const { category, name } = req.params;
      if (
        category !== "body_style" &&
        category !== "make" &&
        category !== "model"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be 'body_style', 'make', or 'model'",
        });
      }

      const { count } = req.body;
      const data = this.popularItemService.update(category, name, count);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Popular item not found",
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
      const { category, name } = req.params;
      if (
        category !== "body_style" &&
        category !== "make" &&
        category !== "model"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be 'body_style', 'make', or 'model'",
        });
      }

      const deleted = this.popularItemService.delete(category, name);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Popular item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Popular item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}


