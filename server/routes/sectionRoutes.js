// routes/sectionRoutes.js
import express from 'express';
import { getAllSections, addSection } from '../controllers/sectionController.js';

const router = express.Router();

router.get('/', getAllSections);
router.post('/', addSection);

export default router;
