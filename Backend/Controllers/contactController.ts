import { Request, Response, NextFunction } from "express";
import { ContactService } from "../Services/contactService.js";
import { contactFormSchema } from "../Validators/contactValidator.js";

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against schema
      const validationResult = contactFormSchema.safeParse(req.body);

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

      // If validation passes, proceed with creating the contact message
      const data = await this.contactService.create(validationResult.data);
      res.status(201).json({
        success: true,
        message: "Contact message sent successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.contactService.getAll();
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
      const data = await this.contactService.getById(Number(id));

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found",
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
