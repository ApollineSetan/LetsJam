import express from "express";
import * as SectionController from "../controllers/sectionController.js";

const router = express.Router();

router.get("/", SectionController.getAllSections);
router.get("/:id", SectionController.getSectionById);
router.post("/", SectionController.createSection);
router.put("/:id", SectionController.updateSection);
router.delete("/:id", SectionController.deleteSection);

export default router;
