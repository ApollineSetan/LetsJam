import express from "express";
import * as DemoController from "../controllers/demoController.js";

const router = express.Router();

router.get("/", DemoController.getAllDemos);
router.get("/:id", DemoController.getDemoById);
router.post("/", DemoController.createDemo);
router.put("/:id", DemoController.updateDemo);
router.delete("/:id", DemoController.deleteDemo);

export default router;
