import { Request, Response, NextFunction } from "express";
import { TestimonialService } from "../Services/testimonialService.js";

export class TestimonialController {
  private testimonialService: TestimonialService;

  constructor() {
    this.testimonialService = new TestimonialService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.testimonialService.getAll();
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
      const data = this.testimonialService.getById(parseInt(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found",
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
      const data = this.testimonialService.create(req.body);
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
      const data = this.testimonialService.update(parseInt(id), req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found",
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
      const deleted = this.testimonialService.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Testimonial deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}



