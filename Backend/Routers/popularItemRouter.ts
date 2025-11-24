import { Router } from "express";
import { PopularItemController } from "../Controllers/popularItemController.js";

const router = Router();
const popularItemController = new PopularItemController();

router.get("/", popularItemController.getAll);
router.get("/:category", popularItemController.getByCategory);
router.post("/:category", popularItemController.create);
router.put("/:category/:name", popularItemController.update);
router.delete("/:category/:name", popularItemController.delete);

export { router as popularItemRouter };

