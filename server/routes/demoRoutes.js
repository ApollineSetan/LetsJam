import express from "express";
import DemoController from "../controllers/demoController.js";
import upload from "../middlewares/uploads.js"; // Uses multer middleware to manage audio and image files before validation and controller
import { createDemoValidator, updateDemoValidator } from "../validators/demoValidators.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/", DemoController.getAllDemos);
router.get("/:id", DemoController.getDemoById);
router.post(
  "/",
  upload.fields([
    { name: "audio_url", maxCount: 1 },
    { name: "image_url", maxCount: 1 },  // Handle multipart/form-data for audio and image files
  ]),
  createDemoValidator,    // Apply field validation
  validateRequest,        // Check validation result
  DemoController.createDemo
);
router.put(
  "/:id", 
  upload.single("image_url"),
  updateDemoValidator,
  validateRequest,
  DemoController.updateDemo);
router.delete("/:id", DemoController.deleteDemo);

export default router;
