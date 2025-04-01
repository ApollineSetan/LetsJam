import * as SectionService from "../services/sectionService.js";

export const getAllSections = async (req, res) => {
  try {
    const sections = await SectionService.getAllSections();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const section = await SectionService.getSectionById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSection = async (req, res) => {
  try {
    const id = await SectionService.createSection(req.body.name);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const updated = await SectionService.updateSection(req.params.id, req.body.name);
    if (!updated) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.json({ message: "Section mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const deleted = await SectionService.deleteSection(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.json({ message: "Section supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
