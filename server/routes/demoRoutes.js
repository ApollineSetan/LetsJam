import express from "express";
import DemoController from "../controllers/demoController.js";
import upload from "../middlewares/uploads.js";

const router = express.Router();

// Routes for handling HTTP requests related to 'demos'
router.get("/", DemoController.getAllDemos);
router.get("/:id", DemoController.getDemoById);
router.post("/", upload.fields([        //  Handles multipart/form-data upload
  { name: 'audio_url', maxCount: 1 },
  { name: 'image_url', maxCount: 1 }
]), DemoController.createDemo);
router.put("/:id", upload.single('image_url'), DemoController.updateDemo);
router.delete("/:id", DemoController.deleteDemo);

export default router;