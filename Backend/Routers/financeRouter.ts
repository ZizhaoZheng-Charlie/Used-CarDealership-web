import { Router } from "express";
import { FinanceController } from "../Controllers/financeController.js";

const router = Router();
const financeController = new FinanceController();

// Define routes
router.post("/", financeController.create.bind(financeController));
router.get("/", financeController.getAll.bind(financeController));
router.get("/:id", financeController.getById.bind(financeController));

export { router as financeRouter };

