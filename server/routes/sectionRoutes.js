import express from "express";
import SectionController from "../controllers/sectionController.js";

const router = express.Router();

// Routes for handling HTTP requests related to 'sections'
router.get("/", SectionController.getAllSections);
router.get("/:id", SectionController.getSectionById);
router.post("/", SectionController.createSection);
router.put("/:id", SectionController.updateSection);
router.delete("/:id", SectionController.deleteSection);

export default router;
