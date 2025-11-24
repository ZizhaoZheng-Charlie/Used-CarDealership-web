import { Router } from "express";
import { vehicleRouter } from "./vehicleRouter.js";
import { testimonialRouter } from "./testimonialRouter.js";
import { staffRouter } from "./staffRouter.js";
import { popularItemRouter } from "./popularItemRouter.js";
import { backgroundImageRouter } from "./backgroundImageRouter.js";
import { financeRouter } from "./financeRouter.js";
import { contactRouter } from "./contactRouter.js";

const router = Router();

// Mount all routers
router.use("/vehicles", vehicleRouter);
router.use("/testimonials", testimonialRouter);
router.use("/staff", staffRouter);
router.use("/popular-items", popularItemRouter);
router.use("/background-images", backgroundImageRouter);
router.use("/finance", financeRouter);
router.use("/contact", contactRouter);

// Health check for API
router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

export { router };
