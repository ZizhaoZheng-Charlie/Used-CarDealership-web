import { Router } from "express";
import { BackgroundImageController } from "../Controllers/backgroundImageController.js";

const router = Router();
const backgroundImageController = new BackgroundImageController();

router.get("/", backgroundImageController.getAll);
router.get("/:id", backgroundImageController.getById);
router.post("/", backgroundImageController.create);
router.put("/:id", backgroundImageController.update);
router.delete("/:id", backgroundImageController.delete);

export { router as backgroundImageRouter };

