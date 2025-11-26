import { Router } from "express";
import { VehicleController } from "../Controllers/vehicleController.js";

const router = Router();
const vehicleController = new VehicleController();

router.get("/", vehicleController.getAll);
router.get("/:id", vehicleController.getById);
router.post("/", vehicleController.create);
router.put("/:id", vehicleController.update);
router.delete("/:id", vehicleController.delete);

export { router as vehicleRouter };



