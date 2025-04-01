// controllers/demoController.js
import Demo from '../models/Demo.js';

export const getAllDemos = async (req, res) => {
  try {
    const demos = await Demo.findAll();
    res.json(demos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDemo = async (req, res) => {
  try {
    const { title, description, image, duration, section_id } = req.body;
    const newDemo = await Demo.create({
      title,
      description,
      image,
      duration,
      createdAt: new Date(),
      section_id
    });
    res.status(201).json(newDemo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
