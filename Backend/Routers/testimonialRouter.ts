import { Router } from "express";
import { TestimonialController } from "../Controllers/testimonialController.js";

const router = Router();
const testimonialController = new TestimonialController();

router.get("/", testimonialController.getAll);
router.get("/:id", testimonialController.getById);
router.post("/", testimonialController.create);
router.put("/:id", testimonialController.update);
router.delete("/:id", testimonialController.delete);

export { router as testimonialRouter };

