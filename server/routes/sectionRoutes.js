const express = require("express");
const sectionController = require("../controllers/sectionController");

const router = express.Router();

router.get("/", sectionController.getSections);
router.post("/", sectionController.createSection);
router.delete("/:id", sectionController.deleteSection);

module.exports = router;
