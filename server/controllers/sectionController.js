// controllers/sectionController.js
import Section from '../models/Section.js';

export const getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSection = async (req, res) => {
  try {
    const { name } = req.body;
    const newSection = await Section.create({ name });
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
