import { Request, Response, NextFunction } from "express";
import { BackgroundImageService } from "../Services/backgroundImageService.js";

export class BackgroundImageController {
  private backgroundImageService: BackgroundImageService;

  constructor() {
    this.backgroundImageService = new BackgroundImageService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.backgroundImageService.getAll();
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
      const data = this.backgroundImageService.getById(parseInt(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Background image not found",
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
      const { imageUrl, sortOrder } = req.body;
      const data = this.backgroundImageService.create(imageUrl, sortOrder);
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
      const data = this.backgroundImageService.update(parseInt(id), req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Background image not found",
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
      const deleted = this.backgroundImageService.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Background image not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Background image deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

