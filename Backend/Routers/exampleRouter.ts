import { Router } from "express";
import { ExampleController } from "../Controllers/exampleController.js";

const router = Router();
const exampleController = new ExampleController();

// Define routes
router.get("/", exampleController.getAll.bind(exampleController));
router.get("/:id", exampleController.getById.bind(exampleController));
router.post("/", exampleController.create.bind(exampleController));
router.put("/:id", exampleController.update.bind(exampleController));
router.delete("/:id", exampleController.delete.bind(exampleController));

export { router as exampleRouter };
