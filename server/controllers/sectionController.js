const sectionService = require("../services/sectionService");

const getSections = async (req, res) => {
  try {
    const sections = await sectionService.getSections();
    res.json(sections);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createSection = async (req, res) => {
  const { name } = req.body;
  try {
    const newSection = await sectionService.createSection(name);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteSection = async (req, res) => {
  const { id } = req.params;
  try {
    await sectionService.deleteSection(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getSections, createSection, deleteSection };
