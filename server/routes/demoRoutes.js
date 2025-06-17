import express from "express";
import DemoController from "../controllers/demoController.js";
import multer from "multer";
import upload from "../config/uploadMiddleware.js";

const router = express.Router();
const upload = multer();

router.get("/", DemoController.getAllDemos);
router.get("/:id", DemoController.getDemoById);
router.post("/", DemoController.createDemo);
router.post("/", upload.single("image_url"), DemoController.createDemo);
router.put("/:id", upload.single('image_url'), DemoController.updateDemo);
router.delete("/:id", DemoController.deleteDemo);

export default router;