import express from "express";
import sectionController from "../controllers/sectionController.js";
import { createSectionValidator, updateSectionValidator } from "../validators/sectionValidators.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/", sectionController.getAllSections);
router.get("/:id", sectionController.getSectionById);
router.post(
  "/",
  createSectionValidator,
  validateRequest,
  sectionController.createSection
);
router.put(
  "/:id",
  updateSectionValidator,    // Apply field validation
  validateRequest,          // Check validation result
  sectionController.updateSection
);
router.delete("/:id", sectionController.deleteSection);

export default router;
