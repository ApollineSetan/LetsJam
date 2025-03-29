const express = require("express");
const demoController = require("../controllers/demoController");

const router = express.Router();

router.get("/", demoController.getDemos);
router.post("/", demoController.createDemo);
router.delete("/:id", demoController.deleteDemo);

module.exports = router;
