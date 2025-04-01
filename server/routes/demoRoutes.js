// routes/demoRoutes.js
import express from 'express';
import { getAllDemos, addDemo } from '../controllers/demoController.js';

const router = express.Router();

router.get('/', getAllDemos);
router.post('/', addDemo);

export default router;
