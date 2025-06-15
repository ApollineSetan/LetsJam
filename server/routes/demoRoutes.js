import express from "express";
import DemoController from "../controllers/DemoController.js";
// import upload from "../config/uploadMiddleware.js";

const router = express.Router();

router.get("/", DemoController.getAllDemos);
router.get("/:id", DemoController.getDemoById);
router.post("/", DemoController.createDemo);
// router.post("/", upload.single("file"), DemoController.createDemo);
router.put("/:id", DemoController.updateDemo);
router.delete("/:id", DemoController.deleteDemo);

export default router;