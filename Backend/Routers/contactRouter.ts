import { Router } from "express";
import { ContactController } from "../Controllers/contactController.js";

const router = Router();
const contactController = new ContactController();

// Define routes
router.post("/", contactController.create.bind(contactController));
router.get("/", contactController.getAll.bind(contactController));
router.get("/:id", contactController.getById.bind(contactController));

export { router as contactRouter };

